/**
 * Mock API Layer for GitHub Pages Deployment
 *
 * Replaces the Express + SQLite server with a client-side implementation
 * backed by localStorage. All /api/* fetch calls are intercepted and
 * handled locally so the app works as a fully static site.
 */

// ────────────────────────── helpers ──────────────────────────

const LS_USERS = 'mock_users';
const LS_MATCHES = 'mock_matches';
const LS_SCHEDULES = 'mock_schedules';
const LS_BOOKINGS = 'mock_bookings';
const LS_INITIALIZED = 'mock_initialized';

function load<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

function nextId<T extends { id: number }>(items: T[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ────────────────────────── data generation (mirrors server) ─────

function generateSetTimeline(player1Games: number, player2Games: number): string[] {
  const timeline: string[] = [];
  let p1 = 0;
  let p2 = 0;
  const gameWinners: number[] = [];
  for (let i = 0; i < player1Games; i++) gameWinners.push(1);
  for (let i = 0; i < player2Games; i++) gameWinners.push(2);
  for (let i = gameWinners.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameWinners[i], gameWinners[j]] = [gameWinners[j], gameWinners[i]];
  }
  for (const winner of gameWinners) {
    if (winner === 1) p1++;
    else p2++;
    timeline.push(`${p1}-${p2}`);
  }
  return timeline;
}

interface SetData {
  set: number;
  player1: number;
  player2: number;
  games: string[];
}

function calculateBreakGames(setsData: SetData[]) {
  let breakGamesWon = 0;
  let breakGamesTotal = 0;
  let opponentBreakGamesWon = 0;
  let opponentBreakGamesTotal = 0;
  for (const s of setsData) {
    let lastGameWinner = 0;
    for (const game of s.games) {
      const [p1, p2] = game.split('-').map(Number);
      if (lastGameWinner === 2 && p1 > p2) breakGamesWon++;
      if (lastGameWinner === 1 && p2 > p1) opponentBreakGamesWon++;
      if (lastGameWinner === 2) breakGamesTotal++;
      if (lastGameWinner === 1) opponentBreakGamesTotal++;
      lastGameWinner = p1 > p2 ? 1 : 2;
    }
  }
  return { breakGamesWon, breakGamesTotal, opponentBreakGamesWon, opponentBreakGamesTotal };
}

function generateFakeMatches(userId: number) {
  const opponents = ['John Doe', 'Jane Smith', 'Peter Jones', 'Mary Williams', 'David Brown', 'Susan Davis', 'Michael Miller', 'Karen Wilson', 'Robert Moore', 'Patricia Taylor'];
  const clubs = ['City Tennis Center', 'Valley Sports Club', 'Riverside Tennis Academy', 'Metro Tennis Complex'];
  const surfaces = ['Hard', 'Clay', 'Grass'];
  const results = ['Win', 'Loss'];
  const matches: any[] = load(LS_MATCHES);

  for (let i = 0; i < 30; i++) {
    const result = results[Math.floor(Math.random() * results.length)];
    const isWin = result === 'Win';
    const score = isWin ? '6-3, 6-4' : '4-6, 6-2, 3-6';
    const setScores = score.split(',').map((s) => s.trim());
    const setsData: SetData[] = setScores.map((setScore, index) => {
      const [p1Games, p2Games] = setScore.split('-').map(Number);
      return { set: index + 1, player1: p1Games, player2: p2Games, games: generateSetTimeline(p1Games, p2Games) };
    });
    const sets = JSON.stringify(setsData);
    const games = score.split(',').map((s) => s.trim().split('-').map(Number));
    const gamesWon = games.reduce((acc, s) => acc + s[0], 0);
    const gamesLost = games.reduce((acc, s) => acc + s[1], 0);
    const clutchFactor = Math.random();
    const returnGamesWon = Math.floor((gamesWon + gamesLost) * (Math.random() * 0.05 + 0.3));
    const returnGamesLost = gamesWon + gamesLost - returnGamesWon;

    const startDate = new Date('2025-01-01').getTime();
    const endDate = new Date('2025-08-03').getTime();
    const randomDate = new Date(startDate + Math.random() * (endDate - startDate));

    const forehandWinners = Math.floor(Math.random() * 15) + 5;
    const backhandWinners = Math.floor(Math.random() * 10) + 3;
    const volleyWinners = Math.floor(Math.random() * 8) + 2;
    const overheadWinners = Math.floor(Math.random() * 5) + 1;
    const forehandErrors = Math.floor(Math.random() * 10) + 5;
    const backhandErrors = Math.floor(Math.random() * 12) + 5;
    const volleyErrors = Math.floor(Math.random() * 5) + 1;
    const overheadErrors = Math.floor(Math.random() * 3);
    const opponentWinnersVal = Math.floor(Math.random() * 20) + 5;
    const { breakGamesWon, breakGamesTotal, opponentBreakGamesWon, opponentBreakGamesTotal } = calculateBreakGames(setsData);

    matches.push({
      id: nextId(matches),
      userId,
      opponent: opponents[Math.floor(Math.random() * opponents.length)],
      result,
      score,
      sets,
      date: randomDate.toISOString().split('T')[0],
      duration: Math.floor(Math.random() * 60) + 90,
      club: clubs[Math.floor(Math.random() * clubs.length)],
      surface: surfaces[Math.floor(Math.random() * surfaces.length)],
      setsWon: isWin ? 2 : 1,
      setsLost: isWin ? (games.length === 2 ? 0 : 1) : 2,
      gamesWon,
      gamesLost,
      aces: Math.floor(Math.random() * 10),
      doubleFaults: Math.floor(Math.random() * 5) + 3,
      firstServePercentage: Math.random() * (0.8 - 0.5) + 0.5,
      firstServeWinPercentage: Math.random() * (0.8 - 0.6) + 0.6,
      secondServeWinPercentage: Math.random() * (0.6 - 0.4) + 0.4,
      breakPointsSavedPercentage: clutchFactor * (0.4 - 0.35) + 0.35,
      breakPointsConvertedPercentage: clutchFactor * (0.4 - 0.35) + 0.35,
      averageServeSpeed: Math.floor(Math.random() * (130 - 100) + 100),
      maxServeSpeed: Math.floor(Math.random() * (135 - 125) + 125),
      forehandWinners,
      forehandErrors,
      backhandWinners,
      backhandErrors,
      volleyWinners,
      volleyErrors,
      overheadWinners,
      overheadErrors,
      returnGamesWon,
      returnGamesLost,
      opponentAces: Math.floor(Math.random() * 8),
      opponentDoubleFaults: Math.floor(Math.random() * 6),
      opponentWinners: opponentWinnersVal,
      opponentUnforcedErrors: Math.floor(Math.random() * 20) + 5,
      winners: forehandWinners + backhandWinners + volleyWinners + overheadWinners,
      unforcedErrors: forehandErrors + backhandErrors + volleyErrors + overheadErrors,
      breakPointsWon: Math.floor(Math.random() * 5) + breakGamesWon,
      breakPointsTotal: Math.floor(Math.random() * 5) + breakGamesWon + 2,
      breakGamesWon,
      breakGamesTotal,
      opponentBreakPointsWon: Math.floor(Math.random() * 5) + opponentBreakGamesWon,
      opponentBreakPointsTotal: Math.floor(Math.random() * 5) + opponentBreakGamesWon + 2,
      opponentBreakGamesWon,
      opponentBreakGamesTotal,
    });
  }
  save(LS_MATCHES, matches);
}

function generateFakeSchedules() {
  const schedules: any[] = [];
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  let id = 1;
  for (let day = 0; day < 30; day++) {
    for (let clubId = 1; clubId <= 4; clubId++) {
      for (let court = 1; court <= 10; court++) {
        for (let hour = 8; hour < 22; hour++) {
          const startTime = new Date(todayUTC);
          startTime.setUTCDate(todayUTC.getUTCDate() + day);
          startTime.setUTCHours(hour, 0, 0, 0);
          const endTime = new Date(startTime);
          endTime.setUTCHours(hour + 1, 0, 0, 0);
          schedules.push({
            id: id++,
            club_id: clubId,
            court_name: `Court ${court}`,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            is_booked: Math.random() > 0.5 ? 1 : 0,
          });
        }
      }
    }
  }
  save(LS_SCHEDULES, schedules);
  return schedules;
}

function generateAdminBooking(userId: number) {
  const schedules: any[] = load(LS_SCHEDULES);
  const bookings: any[] = load(LS_BOOKINGS);
  const startTime = new Date('2025-08-21T10:00:00Z');
  const endTime = new Date('2025-08-21T11:00:00Z');
  const schedule = {
    id: nextId(schedules),
    club_id: 1,
    court_name: 'Court 1',
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    is_booked: 1,
  };
  schedules.push(schedule);
  save(LS_SCHEDULES, schedules);

  bookings.push({
    id: nextId(bookings),
    user_id: userId,
    schedule_id: schedule.id,
    booking_time: new Date().toISOString(),
  });
  save(LS_BOOKINGS, bookings);
}

function initializeMockData() {
  if (localStorage.getItem(LS_INITIALIZED)) return;

  // Create admin user (password: 1234 – stored as plaintext since client-side)
  const users = [{ id: 1, username: 'admin', password: '1234', plan: 'Free' }];
  save(LS_USERS, users);

  generateFakeMatches(1);
  generateFakeSchedules();
  generateAdminBooking(1);

  localStorage.setItem(LS_INITIALIZED, 'true');
}

// ────────────────────────── route handlers ───────────────────

function handleRegister(body: any): Response {
  const { username, password } = body;
  if (!username || !password) return jsonResponse({ error: 'Username and password are required' }, 400);
  const users: any[] = load(LS_USERS);
  if (users.find((u) => u.username === username)) return jsonResponse({ error: 'Username already exists' }, 409);
  const newUser = { id: nextId(users), username, password, plan: 'Free' };
  users.push(newUser);
  save(LS_USERS, users);
  return jsonResponse({ message: 'User created successfully', userId: newUser.id }, 201);
}

function handleLogin(body: any): Response {
  const { username, password } = body;
  if (!username || !password) return jsonResponse({ error: 'Username and password are required' }, 400);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) return jsonResponse({ error: 'Invalid credentials' }, 401);
  return jsonResponse({ message: 'Login successful', username: user.username, plan: user.plan });
}

function handleGetMatches(username: string): Response {
  if (!username) return jsonResponse({ error: 'Unauthorized' }, 401);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);
  const matches: any[] = load(LS_MATCHES);
  const userMatches = matches.filter((m) => m.userId === user.id).sort((a, b) => {
    const d = new Date(b.date).getTime() - new Date(a.date).getTime();
    return d !== 0 ? d : b.id - a.id;
  });
  return jsonResponse(userMatches);
}

function handleGetMatchById(id: number): Response {
  const matches: any[] = load(LS_MATCHES);
  const match = matches.find((m) => m.id === id);
  if (!match) return jsonResponse({ error: 'Match not found' }, 404);
  return jsonResponse(match);
}

function handlePostMatch(body: any): Response {
  const { username } = body;
  if (!username) return jsonResponse({ error: 'Unauthorized' }, 401);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);

  const {
    opponent, result, score, duration, club, surface, aces, doubleFaults,
    firstServePercentage, breakPointsSaved, serveSpeed, forehandWinners, forehandErrors,
    backhandWinners, backhandErrors, volleyWinners, volleyErrors, overheadWinners, overheadErrors,
    opponentAces, opponentDoubleFaults, opponentWinners, opponentUnforcedErrors,
    breakPointsWon, breakPointsTotal, opponentBreakPointsWon, opponentBreakPointsTotal,
  } = body;

  const setScores = score.split(',').map((s: string) => s.trim());
  const setsData: SetData[] = setScores.map((setScore: string, index: number) => {
    const [p1Games, p2Games] = setScore.split('-').map(Number);
    return { set: index + 1, player1: p1Games, player2: p2Games, games: generateSetTimeline(p1Games, p2Games) };
  });
  const sets = JSON.stringify(setsData);
  const games = score.split(',').map((s: string) => s.trim().split('-').map(Number));
  const gamesWon = games.reduce((acc: number, s: number[]) => acc + s[0], 0);
  const gamesLost = games.reduce((acc: number, s: number[]) => acc + s[1], 0);
  const setsWon = games.filter((s: number[]) => s[0] > s[1]).length;
  const setsLost = games.filter((s: number[]) => s[1] > s[0]).length;
  const clutchFactor = Math.random();
  const returnGamesWon = Math.floor((gamesWon + gamesLost) * (Math.random() * 0.05 + 0.3));
  const returnGamesLost = gamesWon + gamesLost - returnGamesWon;
  const { breakGamesWon, breakGamesTotal, opponentBreakGamesWon, opponentBreakGamesTotal } = calculateBreakGames(setsData);

  const matches: any[] = load(LS_MATCHES);
  const newMatch = {
    id: nextId(matches),
    userId: user.id,
    opponent, result, score, sets,
    date: new Date().toISOString().split('T')[0],
    duration, club, surface, setsWon, setsLost, gamesWon, gamesLost,
    aces, doubleFaults, firstServePercentage,
    firstServeWinPercentage: Math.random() * (0.8 - 0.6) + 0.6,
    secondServeWinPercentage: Math.random() * (0.6 - 0.4) + 0.4,
    breakPointsSavedPercentage: breakPointsSaved,
    breakPointsConvertedPercentage: clutchFactor * (0.4 - 0.35) + 0.35,
    averageServeSpeed: serveSpeed,
    maxServeSpeed: serveSpeed + Math.floor(Math.random() * 10) + 5,
    forehandWinners, forehandErrors, backhandWinners, backhandErrors,
    volleyWinners, volleyErrors, overheadWinners, overheadErrors,
    returnGamesWon, returnGamesLost,
    opponentAces, opponentDoubleFaults, opponentWinners, opponentUnforcedErrors,
    winners: forehandWinners + backhandWinners + volleyWinners + overheadWinners,
    unforcedErrors: forehandErrors + backhandErrors + volleyErrors + overheadErrors,
    breakPointsWon, breakPointsTotal, breakGamesWon, breakGamesTotal,
    opponentBreakPointsWon, opponentBreakPointsTotal, opponentBreakGamesWon, opponentBreakGamesTotal,
  };
  matches.push(newMatch);
  save(LS_MATCHES, matches);
  return jsonResponse({ message: 'Match added successfully', matchId: newMatch.id }, 201);
}

function handleUpdatePlan(body: any): Response {
  const { username, plan } = body;
  if (!username || !plan) return jsonResponse({ error: 'Username and plan are required' }, 400);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);
  user.plan = plan;
  save(LS_USERS, users);
  return jsonResponse({ message: 'Plan updated successfully' });
}

function handleFullStats(username: string): Response {
  if (!username) return jsonResponse({ error: 'Unauthorized' }, 401);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);

  const allMatches: any[] = load(LS_MATCHES);
  const matches = allMatches.filter((m) => m.userId === user.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (matches.length === 0) return jsonResponse({ message: 'No matches found' });

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const overallStats = {
    totalMatches: matches.length,
    wins: matches.filter((m) => m.result === 'Win').length,
    losses: matches.filter((m) => m.result === 'Loss').length,
    winPercentage: (matches.filter((m) => m.result === 'Win').length / matches.length) * 100,
    setsWon: matches.reduce((a, m) => a + m.setsWon, 0),
    setsLost: matches.reduce((a, m) => a + m.setsLost, 0),
    gamesWon: matches.reduce((a, m) => a + m.gamesWon, 0),
    gamesLost: matches.reduce((a, m) => a + m.gamesLost, 0),
    averageMatchDuration: matches.reduce((a, m) => a + m.duration, 0) / matches.length,
    currentStreak: (() => {
      if (matches.length === 0 || matches[0].result !== 'Win') return 0;
      let streak = 0;
      for (const m of matches) {
        if (m.result === 'Win') streak++;
        else break;
      }
      return streak;
    })(),
  };

  const serveStats = {
    firstServePercentage: (matches.reduce((a, m) => a + m.firstServePercentage, 0) / matches.length) * 100,
    firstServeWinPercentage: (matches.reduce((a, m) => a + m.firstServeWinPercentage, 0) / matches.length) * 100,
    secondServeWinPercentage: (matches.reduce((a, m) => a + m.secondServeWinPercentage, 0) / matches.length) * 100,
    acesPerMatch: matches.reduce((a, m) => a + m.aces, 0) / matches.length,
    doubleFaultsPerMatch: matches.reduce((a, m) => a + m.doubleFaults, 0) / matches.length,
    averageServeSpeed: matches.reduce((a, m) => a + m.averageServeSpeed, 0) / matches.length,
    maxServeSpeed: Math.max(...matches.map((m) => m.maxServeSpeed)),
    breakPointsSaved: (matches.reduce((a, m) => a + m.breakPointsSavedPercentage, 0) / matches.length) * 100,
  };

  const returnStats = {
    breakPointsConverted: (matches.reduce((a, m) => a + m.breakPointsConvertedPercentage, 0) / matches.length) * 100,
    returnGamesWon: matches.reduce((a, m) => a + m.returnGamesWon, 0),
    returnGamesLost: matches.reduce((a, m) => a + m.returnGamesLost, 0),
  };

  const shotAnalysis = {
    forehandWinners: matches.reduce((a, m) => a + m.forehandWinners, 0),
    forehandErrors: matches.reduce((a, m) => a + m.forehandErrors, 0),
    backhandWinners: matches.reduce((a, m) => a + m.backhandWinners, 0),
    backhandErrors: matches.reduce((a, m) => a + m.backhandErrors, 0),
    volleyWinners: matches.reduce((a, m) => a + m.volleyWinners, 0),
    volleyErrors: matches.reduce((a, m) => a + m.volleyErrors, 0),
    overheadWinners: matches.reduce((a, m) => a + m.overheadWinners, 0),
    overheadErrors: matches.reduce((a, m) => a + m.overheadErrors, 0),
  };

  const surfaceStats = matches.reduce((acc: any, m) => {
    if (!acc[m.surface]) acc[m.surface] = { matches: 0, wins: 0, losses: 0 };
    acc[m.surface].matches++;
    if (m.result === 'Win') acc[m.surface].wins++;
    else acc[m.surface].losses++;
    return acc;
  }, {});

  const performanceData = (() => {
    const recentMatches = matches.filter((m) => new Date(m.date) >= sixMonthsAgo);
    if (recentMatches.length === 0) return [];
    const monthlyStats: any = {};
    recentMatches.forEach((match) => {
      const d = new Date(match.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyStats[key]) monthlyStats[key] = { wins: 0, losses: 0, totalMatches: 0 };
      monthlyStats[key].totalMatches++;
      if (match.result === 'Win') monthlyStats[key].wins++;
      else monthlyStats[key].losses++;
    });
    const sorted = recentMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const first = new Date(sorted[0].date);
    const last = new Date(sorted[sorted.length - 1].date);
    const timeline: any[] = [];
    const cur = new Date(first.getFullYear(), first.getMonth(), 1);
    while (cur <= last) {
      const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`;
      const label = cur.toLocaleString('default', { month: 'short', year: 'numeric' });
      const stats = monthlyStats[key] || { wins: 0, losses: 0, totalMatches: 0 };
      timeline.push({
        month: label,
        winRate: stats.totalMatches > 0 ? Math.round((stats.wins / stats.totalMatches) * 100) : 0,
        wins: stats.wins,
        losses: stats.losses,
        totalMatches: stats.totalMatches,
      });
      cur.setMonth(cur.getMonth() + 1);
    }
    return timeline;
  })();

  return jsonResponse({
    overallStats,
    serveStats,
    returnStats,
    shotAnalysis,
    surfaceStats,
    recentForm: matches.slice(0, 5).map((m) => ({ match: `vs ${m.opponent}`, result: m.result, score: m.score, date: m.date })),
    performanceData,
  });
}

function handleProfileStats(username: string): Response {
  if (!username) return jsonResponse({ error: 'Unauthorized' }, 401);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);

  const allMatches: any[] = load(LS_MATCHES);
  const matches = allMatches.filter((m) => m.userId === user.id);

  if (matches.length === 0) {
    return jsonResponse({
      totalMatches: 0, wins: 0, losses: 0, winRate: 0,
      averageServeSpeed: 0, averageVolleySpeed: 0, acesPerMatch: 0,
      doubleFaultsPerMatch: 0, breakPointsSaved: 0, firstServePercentage: 0,
      longestRally: 0, averageMatchDuration: '0h 0m',
    });
  }

  const totalMatches = matches.length;
  const wins = matches.filter((m) => m.result === 'Win').length;
  const losses = totalMatches - wins;
  const winRate = Math.round((wins / totalMatches) * 100);
  const averageServeSpeed = Math.round(matches.reduce((a, m) => a + m.averageServeSpeed, 0) / totalMatches);
  const acesPerMatch = (matches.reduce((a, m) => a + m.aces, 0) / totalMatches).toFixed(1);
  const doubleFaultsPerMatch = (matches.reduce((a, m) => a + m.doubleFaults, 0) / totalMatches).toFixed(1);
  const breakPointsSaved = Math.round((matches.reduce((a, m) => a + m.breakPointsSavedPercentage, 0) / totalMatches) * 100);
  const firstServePercentage = Math.round((matches.reduce((a, m) => a + m.firstServePercentage, 0) / totalMatches) * 100);
  const longestRally = Math.max(...matches.map((m) => m.forehandWinners + m.backhandWinners + m.volleyWinners + m.overheadWinners));
  const totalDuration = matches.reduce((a, m) => a + m.duration, 0);
  const avgDur = Math.round(totalDuration / totalMatches);
  const hours = Math.floor(avgDur / 60);
  const minutes = avgDur % 60;

  const favoriteClubs = Object.values(
    matches.reduce((acc: any, m) => {
      if (!acc[m.club]) acc[m.club] = { name: m.club, matches: 0, wins: 0 };
      acc[m.club].matches++;
      if (m.result === 'Win') acc[m.club].wins++;
      return acc;
    }, {}),
  )
    .map((c: any) => ({ ...c, winRate: Math.round((c.wins / c.matches) * 100) }))
    .sort((a: any, b: any) => b.matches - a.matches)
    .slice(0, 3);

  return jsonResponse({
    totalMatches, wins, losses, winRate, averageServeSpeed,
    averageVolleySpeed: 89, acesPerMatch, doubleFaultsPerMatch,
    breakPointsSaved, firstServePercentage, longestRally,
    averageMatchDuration: `${hours}h ${minutes}m`, favoriteClubs,
  });
}

function handleGetSchedules(clubId: number): Response {
  const schedules: any[] = load(LS_SCHEDULES);
  return jsonResponse(schedules.filter((s) => s.club_id === clubId));
}

function handlePostBooking(body: any): Response {
  const { username, schedule_id } = body;
  if (!username || !schedule_id) return jsonResponse({ error: 'Username and schedule_id are required' }, 400);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);

  const schedules: any[] = load(LS_SCHEDULES);
  const schedule = schedules.find((s) => s.id === schedule_id);
  if (schedule) {
    schedule.is_booked = 1;
    save(LS_SCHEDULES, schedules);
  }

  const bookings: any[] = load(LS_BOOKINGS);
  const newBooking = { id: nextId(bookings), user_id: user.id, schedule_id, booking_time: new Date().toISOString() };
  bookings.push(newBooking);
  save(LS_BOOKINGS, bookings);
  return jsonResponse({ message: 'Booking created successfully', bookingId: newBooking.id }, 201);
}

function handleGetBookings(username: string): Response {
  if (!username) return jsonResponse({ error: 'Unauthorized' }, 401);
  const users: any[] = load(LS_USERS);
  const user = users.find((u) => u.username === username);
  if (!user) return jsonResponse({ error: 'User not found' }, 404);

  const bookings: any[] = load(LS_BOOKINGS);
  const schedules: any[] = load(LS_SCHEDULES);
  const userBookings = bookings
    .filter((b) => b.user_id === user.id)
    .map((b) => {
      const s = schedules.find((sc) => sc.id === b.schedule_id);
      return s ? { id: b.id, club_id: s.club_id, court_name: s.court_name, start_time: s.start_time, end_time: s.end_time } : null;
    })
    .filter(Boolean);
  return jsonResponse(userBookings);
}

function handleDeleteBooking(id: number): Response {
  const bookings: any[] = load(LS_BOOKINGS);
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) return jsonResponse({ error: 'Booking not found' }, 404);
  const booking = bookings[idx];
  bookings.splice(idx, 1);
  save(LS_BOOKINGS, bookings);

  const schedules: any[] = load(LS_SCHEDULES);
  const schedule = schedules.find((s) => s.id === booking.schedule_id);
  if (schedule) {
    schedule.is_booked = 0;
    save(LS_SCHEDULES, schedules);
  }
  return jsonResponse({ message: 'Booking cancelled successfully' });
}

// ────────────────────────── fetch interceptor ────────────────

const originalFetch = window.fetch.bind(window);

async function mockFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : (input as Request).url;
  const method = (init?.method || 'GET').toUpperCase();

  // Only intercept /api calls
  if (!url.includes('/api')) return originalFetch(input, init);

  const parsedUrl = new URL(url, window.location.origin);
  const pathname = parsedUrl.pathname;
  const body = init?.body ? JSON.parse(init.body as string) : {};

  // POST /api/register
  if (pathname === '/api/register' && method === 'POST') return handleRegister(body);
  // POST /api/login
  if (pathname === '/api/login' && method === 'POST') return handleLogin(body);
  // GET /api/matches?username=...
  if (pathname === '/api/matches' && method === 'GET') return handleGetMatches(parsedUrl.searchParams.get('username') || '');
  // GET /api/matches/:id
  const matchIdMatch = pathname.match(/^\/api\/matches\/(\d+)$/);
  if (matchIdMatch && method === 'GET') return handleGetMatchById(Number(matchIdMatch[1]));
  // POST /api/matches
  if (pathname === '/api/matches' && method === 'POST') return handlePostMatch(body);
  // PUT /api/user/plan
  if (pathname === '/api/user/plan' && method === 'PUT') return handleUpdatePlan(body);
  // GET /api/full-stats?username=...
  if (pathname === '/api/full-stats' && method === 'GET') return handleFullStats(parsedUrl.searchParams.get('username') || '');
  // GET /api/profile-stats?username=...
  if (pathname === '/api/profile-stats' && method === 'GET') return handleProfileStats(parsedUrl.searchParams.get('username') || '');
  // GET /api/schedules/:clubId
  const schedMatch = pathname.match(/^\/api\/schedules\/(\d+)$/);
  if (schedMatch && method === 'GET') return handleGetSchedules(Number(schedMatch[1]));
  // POST /api/bookings
  if (pathname === '/api/bookings' && method === 'POST') return handlePostBooking(body);
  // GET /api/bookings?username=...
  if (pathname === '/api/bookings' && method === 'GET') return handleGetBookings(parsedUrl.searchParams.get('username') || '');
  // DELETE /api/bookings/:id
  const bookingDelMatch = pathname.match(/^\/api\/bookings\/(\d+)$/);
  if (bookingDelMatch && method === 'DELETE') return handleDeleteBooking(Number(bookingDelMatch[1]));

  // Fallback – pass through
  return originalFetch(input, init);
}

// ────────────────────────── public API ───────────────────────

export function installMockApi() {
  initializeMockData();
  window.fetch = mockFetch as typeof window.fetch;
  console.log('[MockAPI] Client-side mock API installed – no server needed.');
}
