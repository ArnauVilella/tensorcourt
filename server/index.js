const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3002;
const db = new sqlite3.Database('./database.db');

app.use(cors());
app.use(express.json());

// --- Database Initialization ---
db.serialize(() => {
  // Drop the old table if it exists to ensure the new schema is applied
  db.run(`DROP TABLE IF EXISTS matches`);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      plan TEXT DEFAULT 'Free'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      club_id INTEGER,
      court_name TEXT,
      start_time TEXT,
      end_time TEXT,
      is_booked BOOLEAN DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      schedule_id INTEGER,
      booking_time TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (schedule_id) REFERENCES schedules (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      opponent TEXT,
      result TEXT,
      score TEXT,
      sets TEXT,
      date TEXT,
      duration INTEGER,
      club TEXT,
      surface TEXT,
      setsWon INTEGER,
      setsLost INTEGER,
      gamesWon INTEGER,
      gamesLost INTEGER,
      aces INTEGER,
      doubleFaults INTEGER,
      firstServePercentage REAL,
      firstServeWinPercentage REAL,
      secondServeWinPercentage REAL,
      breakPointsSavedPercentage REAL,
      breakPointsConvertedPercentage REAL,
      averageServeSpeed INTEGER,
      maxServeSpeed INTEGER,
      forehandWinners INTEGER,
      forehandErrors INTEGER,
      backhandWinners INTEGER,
      backhandErrors INTEGER,
      volleyWinners INTEGER,
      volleyErrors INTEGER,
      overheadWinners INTEGER,
      overheadErrors INTEGER,
      returnGamesWon INTEGER,
      returnGamesLost INTEGER,
      opponentAces INTEGER,
      opponentDoubleFaults INTEGER,
      opponentWinners INTEGER,
      opponentUnforcedErrors INTEGER,
      winners INTEGER,
      unforcedErrors INTEGER,
      breakPointsWon INTEGER,
      breakPointsTotal INTEGER,
      breakGamesWon INTEGER,
      breakGamesTotal INTEGER,
      opponentBreakPointsWon INTEGER,
      opponentBreakPointsTotal INTEGER,
      opponentBreakGamesWon INTEGER,
      opponentBreakGamesTotal INTEGER,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  // Create admin user and generate fake matches
  const saltRounds = 10;
  const adminPassword = '1234';
  bcrypt.hash(adminPassword, saltRounds, (err, hash) => {
    if (err) {
      return console.error('Error hashing password:', err);
    }
    db.run('INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)', ['admin', hash], function(err) {
      if (err) {
        return console.error('Error creating admin user:', err.message);
      }
      // Use the ID of the 'admin' user, whether newly inserted or existing
      db.get('SELECT id FROM users WHERE username = ?', ['admin'], (err, userRow) => {
        if (userRow) {
          db.get('SELECT COUNT(*) as count FROM matches WHERE userId = ?', [userRow.id], (err, matchRow) => {
            if (matchRow && matchRow.count === 0) {
              console.log('Admin user found, generating fake matches...');
              generateFakeMatches(userRow.id);
              generateFakeSchedules();
              generateAdminBooking();
            }
          });
        }
      });
    });
  });
});

function calculateBreakGames(setsData) {
    let breakGamesWon = 0;
    let breakGamesTotal = 0;
    let opponentBreakGamesWon = 0;
    let opponentBreakGamesTotal = 0;

    for (const set of setsData) {
        let lastGameWinner = 0;
        for (const game of set.games) {
            const [p1, p2] = game.split('-').map(Number);
            if (lastGameWinner === 2 && p1 > p2) {
                breakGamesWon++;
            }
            if (lastGameWinner === 1 && p2 > p1) {
                opponentBreakGamesWon++;
            }
            if (lastGameWinner === 2) {
                breakGamesTotal++;
            }
            if (lastGameWinner === 1) {
                opponentBreakGamesTotal++;
            }
            lastGameWinner = p1 > p2 ? 1 : 2;
        }
    }

    return { breakGamesWon, breakGamesTotal, opponentBreakGamesWon, opponentBreakGamesTotal };
}

function generateFakeMatches(userId) {
    const opponents = ['John Doe', 'Jane Smith', 'Peter Jones', 'Mary Williams', 'David Brown', 'Susan Davis', 'Michael Miller', 'Karen Wilson', 'Robert Moore', 'Patricia Taylor'];
    const clubs = ['City Tennis Center', 'Valley Sports Club', 'Riverside Tennis Academy', 'Metro Tennis Complex'];
    const surfaces = ['Hard', 'Clay', 'Grass'];
    const results = ['Win', 'Loss'];

    const generateSetTimeline = (player1Games, player2Games) => {
        const timeline = [];
        let p1 = 0;
        let p2 = 0;
        const gameWinners = [];
        for (let i = 0; i < player1Games; i++) gameWinners.push(1);
        for (let i = 0; i < player2Games; i++) gameWinners.push(2);

        // Shuffle the game winners
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
    };
    
    const stmt = db.prepare(`INSERT INTO matches (
        userId, opponent, result, score, sets, date, duration, club, surface,
        setsWon, setsLost, gamesWon, gamesLost, aces, doubleFaults,
        firstServePercentage, firstServeWinPercentage, secondServeWinPercentage,
        breakPointsSavedPercentage, breakPointsConvertedPercentage, averageServeSpeed, maxServeSpeed,
        forehandWinners, forehandErrors, backhandWinners, backhandErrors,
        volleyWinners, volleyErrors, overheadWinners, overheadErrors, returnGamesWon, returnGamesLost,
        opponentAces, opponentDoubleFaults, opponentWinners, opponentUnforcedErrors, winners, unforcedErrors,
        breakPointsWon, breakPointsTotal, breakGamesWon, breakGamesTotal, opponentBreakPointsWon, opponentBreakPointsTotal, opponentBreakGamesWon, opponentBreakGamesTotal
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    for (let i = 0; i < 30; i++) {
        const result = results[Math.floor(Math.random() * results.length)];
        const isWin = result === 'Win';
        const score = isWin ? '6-3, 6-4' : '4-6, 6-2, 3-6';
        
        const setScores = score.split(',').map(s => s.trim());
        const setsData = setScores.map((setScore, index) => {
            const [p1Games, p2Games] = setScore.split('-').map(Number);
            return {
                set: index + 1,
                player1: p1Games,
                player2: p2Games,
                games: generateSetTimeline(p1Games, p2Games)
            };
        });
        const sets = JSON.stringify(setsData);

        const games = score.split(',').map(s => s.trim().split('-').map(Number));
        const gamesWon = games.reduce((acc, set) => acc + set[0], 0);
        const gamesLost = games.reduce((acc, set) => acc + set[1], 0);

        const clutchFactor = Math.random();

        const returnGamesWon = Math.floor((gamesWon + gamesLost) * (Math.random() * 0.05 + 0.3));
        const returnGamesLost = (gamesWon + gamesLost) - returnGamesWon;

        const startDate = new Date('2025-01-01').getTime();
        const endDate = new Date('2025-08-03').getTime();
        const randomDate = new Date(startDate + Math.random() * (endDate - startDate));

        const forehandWinners = Math.floor(Math.random() * 15) + 5;
        const backhandWinners = Math.floor(Math.random() * 10) + 3;
        const volleyWinners = Math.floor(Math.random() * 8) + 2;
        const overheadWinners = Math.floor(Math.random() * 5) + 1;
        const opponentWinners = Math.floor(Math.random() * 20) + 5;
        const forehandErrors = Math.floor(Math.random() * 10) + 5;
        const backhandErrors = Math.floor(Math.random() * 12) + 5;
        const volleyErrors = Math.floor(Math.random() * 5) + 1;
        const overheadErrors = Math.floor(Math.random() * 3);

        const { breakGamesWon, breakGamesTotal, opponentBreakGamesWon, opponentBreakGamesTotal } = calculateBreakGames(setsData);

        const matchData = [
            userId,
            opponents[Math.floor(Math.random() * opponents.length)],
            result,
            score,
            sets,
            randomDate.toISOString().split('T')[0],
            Math.floor(Math.random() * 60) + 90, // duration
            clubs[Math.floor(Math.random() * clubs.length)],
            surfaces[Math.floor(Math.random() * surfaces.length)],
            isWin ? 2 : 1, // setsWon
            isWin ? (games.length === 2 ? 0 : 1) : 2, // setsLost
            gamesWon,
            gamesLost,
            Math.floor(Math.random() * 10), // aces
            Math.floor(Math.random() * 5) + 3, // doubleFaults
            Math.random() * (0.8 - 0.5) + 0.5, // firstServePercentage
            Math.random() * (0.8 - 0.6) + 0.6, // firstServeWinPercentage
            Math.random() * (0.6 - 0.4) + 0.4, // secondServeWinPercentage
            clutchFactor * (0.4 - 0.35) + 0.35, // breakPointsSavedPercentage
            clutchFactor * (0.4 - 0.35) + 0.35, // breakPointsConvertedPercentage
            Math.floor(Math.random() * (130 - 100) + 100), // averageServeSpeed
            Math.floor(Math.random() * (135 - 125) + 125), // maxServeSpeed
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
            Math.floor(Math.random() * 8), // opponentAces
            Math.floor(Math.random() * 6), // opponentDoubleFaults
            opponentWinners, // opponentWinners
            Math.floor(Math.random() * 20) + 5, // opponentUnforcedErrors
            forehandWinners + backhandWinners + volleyWinners + overheadWinners, // winners
            forehandErrors + backhandErrors + volleyErrors + overheadErrors, // unforcedErrors
            Math.floor(Math.random() * 5) + breakGamesWon, // breakPointsWon
            Math.floor(Math.random() * 5) + breakGamesWon + 2, // breakPointsTotal
            breakGamesWon,
            breakGamesTotal,
            Math.floor(Math.random() * 5) + opponentBreakGamesWon, // opponentBreakPointsWon
            Math.floor(Math.random() * 5) + opponentBreakGamesWon + 2, // opponentBreakPointsTotal
            opponentBreakGamesWon,
            opponentBreakGamesTotal,
        ];
        stmt.run(matchData);
    }
    stmt.finalize();
    console.log('30 new detailed fake matches created for admin user');
}

function generateFakeSchedules() {
  db.get('SELECT COUNT(*) as count FROM schedules', (err, row) => {
    if (row && row.count === 0) {
      console.log('Generating fake schedules for the next 7 days...');
      const stmt = db.prepare(`INSERT INTO schedules (club_id, court_name, start_time, end_time, is_booked) VALUES (?, ?, ?, ?, ?)`);
      
      // Get today's date in UTC to match frontend
      const today = new Date();
      const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
      
      for (let day = 0; day < 30; day++) {
        for (let clubId = 1; clubId <= 4; clubId++) {
          for (let court = 1; court <= 10; court++) {
            for (let hour = 8; hour < 22; hour++) {
              // Create start time in UTC for the specific day and hour
              const startTime = new Date(todayUTC);
              startTime.setUTCDate(todayUTC.getUTCDate() + day);
              startTime.setUTCHours(hour, 0, 0, 0);
              
              const endTime = new Date(startTime);
              endTime.setUTCHours(hour + 1, 0, 0, 0);
              
              stmt.run([
                clubId,
                `Court ${court}`,
                startTime.toISOString(),
                endTime.toISOString(),
                Math.random() > 0.5, // is_booked
              ]);
            }
          }
        }
      }
      stmt.finalize();
      console.log('Fake schedules created with UTC consistency.');
    }
  });
}

function generateAdminBooking() {
  db.get('SELECT id FROM users WHERE username = ?', ['admin'], (err, userRow) => {
    if (userRow) {
      const clubId = 1; // City Tennis Center
      const courtName = 'Court 1';
      const startTime = new Date('2025-08-21T10:00:00Z');
      const endTime = new Date('2025-08-21T11:00:00Z');

      const scheduleStmt = db.prepare(`INSERT INTO schedules (club_id, court_name, start_time, end_time, is_booked) VALUES (?, ?, ?, ?, ?)`);
      scheduleStmt.run([clubId, courtName, startTime.toISOString(), endTime.toISOString(), 1], function(err) {
        if (err) {
          return console.error('Error creating schedule for admin booking:', err.message);
        }
        const scheduleId = this.lastID;
        const bookingStmt = db.prepare(`INSERT INTO bookings (user_id, schedule_id, booking_time) VALUES (?, ?, ?)`);
        bookingStmt.run([userRow.id, scheduleId, new Date().toISOString()], (err) => {
          if (err) {
            return console.error('Error creating admin booking:', err.message);
          }
          console.log('Admin booking created for August 21st 2025.');
        });
        bookingStmt.finalize();
      });
      scheduleStmt.finalize();
    }
  });
}


// --- API Endpoints ---

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.status(201).json({ message: 'User created successfully', userId: this.lastID });
    });
  });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.json({ message: 'Login successful', username: user.username, plan: user.plan });
        });
    });
});

app.get('/api/matches', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'User not found' });
        }
        db.all('SELECT * FROM matches WHERE userId = ? ORDER BY date DESC, id DESC', [user.id], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching matches' });
            }
            res.json(rows);
        });
    });
});

app.get('/api/matches/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM matches WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching match' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Match not found' });
        }
        res.json(row);
    });
});

app.post('/api/matches', (req, res) => {
    const {
        username, opponent, result, score, duration, club, surface, aces, doubleFaults,
        firstServePercentage, breakPointsSaved, serveSpeed, forehandWinners, forehandErrors,
        backhandWinners, backhandErrors, volleyWinners, volleyErrors, overheadWinners, overheadErrors,
        opponentAces, opponentDoubleFaults, opponentWinners, opponentUnforcedErrors,
        breakPointsWon, breakPointsTotal, opponentBreakPointsWon, opponentBreakPointsTotal
    } = req.body;

    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const generateSetTimeline = (player1Games, player2Games) => {
            const timeline = [];
            let p1 = 0;
            let p2 = 0;
            const gameWinners = [];
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
        };

        const setScores = score.split(',').map(s => s.trim());
        const setsData = setScores.map((setScore, index) => {
            const [p1Games, p2Games] = setScore.split('-').map(Number);
            return {
                set: index + 1,
                player1: p1Games,
                player2: p2Games,
                games: generateSetTimeline(p1Games, p2Games)
            };
        });
        const sets = JSON.stringify(setsData);

        const games = score.split(',').map(s => s.trim().split('-').map(Number));
        const gamesWon = games.reduce((acc, set) => acc + set[0], 0);
        const gamesLost = games.reduce((acc, set) => acc + set[1], 0);
        const isWin = result === 'Win';
        const setsWon = games.filter(set => set[0] > set[1]).length;
        const setsLost = games.filter(set => set[1] > set[0]).length;

        const clutchFactor = Math.random();
        const returnGamesWon = Math.floor((gamesWon + gamesLost) * (Math.random() * 0.05 + 0.3));
        const returnGamesLost = (gamesWon + gamesLost) - returnGamesWon;

        const { breakGamesWon, breakGamesTotal, opponentBreakGamesWon, opponentBreakGamesTotal } = calculateBreakGames(setsData);

        const stmt = db.prepare(`INSERT INTO matches (
            userId, opponent, result, score, sets, date, duration, club, surface,
            setsWon, setsLost, gamesWon, gamesLost, aces, doubleFaults,
            firstServePercentage, firstServeWinPercentage, secondServeWinPercentage,
            breakPointsSavedPercentage, breakPointsConvertedPercentage, averageServeSpeed, maxServeSpeed,
            forehandWinners, forehandErrors, backhandWinners, backhandErrors,
            volleyWinners, volleyErrors, overheadWinners, overheadErrors, returnGamesWon, returnGamesLost,
            opponentAces, opponentDoubleFaults, opponentWinners, opponentUnforcedErrors, winners, unforcedErrors,
            breakPointsWon, breakPointsTotal, breakGamesWon, breakGamesTotal, opponentBreakPointsWon, opponentBreakPointsTotal, opponentBreakGamesWon, opponentBreakGamesTotal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

        const matchData = [
            user.id,
            opponent,
            result,
            score,
            sets,
            new Date().toISOString().split('T')[0],
            duration,
            club,
            surface,
            setsWon,
            setsLost,
            gamesWon,
            gamesLost,
            aces,
            doubleFaults,
            firstServePercentage,
            Math.random() * (0.8 - 0.6) + 0.6, // firstServeWinPercentage
            Math.random() * (0.6 - 0.4) + 0.4, // secondServeWinPercentage
            breakPointsSaved,
            clutchFactor * (0.4 - 0.35) + 0.35, // breakPointsConvertedPercentage
            serveSpeed,
            serveSpeed + Math.floor(Math.random() * 10) + 5, // maxServeSpeed
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
            opponentAces,
            opponentDoubleFaults,
            opponentWinners,
            opponentUnforcedErrors,
            forehandWinners + backhandWinners + volleyWinners + overheadWinners, // winners
            forehandErrors + backhandErrors + volleyErrors + overheadErrors, // unforcedErrors
            breakPointsWon,
            breakPointsTotal,
            breakGamesWon,
            breakGamesTotal,
            opponentBreakPointsWon,
            opponentBreakPointsTotal,
            opponentBreakGamesWon,
            opponentBreakGamesTotal,
        ];

        stmt.run(matchData, function(err) {
            if (err) {
                console.error("Failed to add match:", err);
                return res.status(500).json({ error: 'Failed to add match' });
            }
            res.status(201).json({ message: 'Match added successfully', matchId: this.lastID });
        });
        stmt.finalize();
    });
});

app.put('/api/user/plan', (req, res) => {
    const { username, plan } = req.body;
    if (!username || !plan) {
        return res.status(400).json({ error: 'Username and plan are required' });
    }

    db.run('UPDATE users SET plan = ? WHERE username = ?', [plan, username], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error updating plan' });
        }
        res.json({ message: 'Plan updated successfully' });
    });
});

app.get('/api/full-stats', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'User not found' });
        }

        db.all('SELECT * FROM matches WHERE userId = ? ORDER BY date DESC', [user.id], (err, matches) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching matches' });
            }

            if (matches.length === 0) {
                return res.json({ message: 'No matches found' });
            }

            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

            const overallStats = {
                totalMatches: matches.length,
                wins: matches.filter(m => m.result === 'Win').length,
                losses: matches.filter(m => m.result === 'Loss').length,
                winPercentage: (matches.filter(m => m.result === 'Win').length / matches.length) * 100,
                setsWon: matches.reduce((acc, m) => acc + m.setsWon, 0),
                setsLost: matches.reduce((acc, m) => acc + m.setsLost, 0),
                gamesWon: matches.reduce((acc, m) => acc + m.gamesWon, 0),
                gamesLost: matches.reduce((acc, m) => acc + m.gamesLost, 0),
                averageMatchDuration: matches.reduce((acc, m) => acc + m.duration, 0) / matches.length,
                currentStreak: (() => {
                  if (matches.length === 0 || matches[0].result !== 'Win') {
                    return 0;
                  }
                  let streak = 0;
                  for (let i = 0; i < matches.length; i++) {
                    if (matches[i].result === 'Win') {
                      streak++;
                    } else {
                      break;
                    }
                  }
                  return streak;
                })()
            };

            const serveStats = {
                firstServePercentage: matches.reduce((acc, m) => acc + m.firstServePercentage, 0) / matches.length * 100,
                firstServeWinPercentage: matches.reduce((acc, m) => acc + m.firstServeWinPercentage, 0) / matches.length * 100,
                secondServeWinPercentage: matches.reduce((acc, m) => acc + m.secondServeWinPercentage, 0) / matches.length * 100,
                acesPerMatch: matches.reduce((acc, m) => acc + m.aces, 0) / matches.length,
                doubleFaultsPerMatch: matches.reduce((acc, m) => acc + m.doubleFaults, 0) / matches.length,
                averageServeSpeed: matches.reduce((acc, m) => acc + m.averageServeSpeed, 0) / matches.length,
                maxServeSpeed: Math.max(...matches.map(m => m.maxServeSpeed)),
                breakPointsSaved: matches.reduce((acc, m) => acc + m.breakPointsSavedPercentage, 0) / matches.length * 100,
            };

            const returnStats = {
                breakPointsConverted: matches.reduce((acc, m) => acc + m.breakPointsConvertedPercentage, 0) / matches.length * 100,
                returnGamesWon: matches.reduce((acc, m) => acc + m.returnGamesWon, 0),
                returnGamesLost: matches.reduce((acc, m) => acc + m.returnGamesLost, 0),
            };

            const shotAnalysis = {
                forehandWinners: matches.reduce((acc, m) => acc + m.forehandWinners, 0),
                forehandErrors: matches.reduce((acc, m) => acc + m.forehandErrors, 0),
                backhandWinners: matches.reduce((acc, m) => acc + m.backhandWinners, 0),
                backhandErrors: matches.reduce((acc, m) => acc + m.backhandErrors, 0),
                volleyWinners: matches.reduce((acc, m) => acc + m.volleyWinners, 0),
                volleyErrors: matches.reduce((acc, m) => acc + m.volleyErrors, 0),
                overheadWinners: matches.reduce((acc, m) => acc + m.overheadWinners, 0),
                overheadErrors: matches.reduce((acc, m) => acc + m.overheadErrors, 0),
            };

            const surfaceStats = matches.reduce((acc, m) => {
                const surface = m.surface;
                if (!acc[surface]) {
                    acc[surface] = { matches: 0, wins: 0, losses: 0 };
                }
                acc[surface].matches++;
                if (m.result === 'Win') {
                    acc[surface].wins++;
                } else {
                    acc[surface].losses++;
                }
                return acc;
            }, {});

            const performanceData = (() => {
                if (matches.length === 0) {
                    return [];
                }

                const recentMatches = matches.filter(m => new Date(m.date) >= sixMonthsAgo);

                // Group matches by month-year
                const monthlyStats = {};
                recentMatches.forEach(match => {
                    const matchDate = new Date(match.date);
                    const monthKey = `${matchDate.getFullYear()}-${String(matchDate.getMonth() + 1).padStart(2, '0')}`;
                    if (!monthlyStats[monthKey]) {
                        monthlyStats[monthKey] = { wins: 0, losses: 0, totalMatches: 0 };
                    }
                    monthlyStats[monthKey].totalMatches++;
                    if (match.result === 'Win') {
                        monthlyStats[monthKey].wins++;
                    } else {
                        monthlyStats[monthKey].losses++;
                    }
                });

                // Create a complete timeline of months between the first and last match
                const sortedMatches = recentMatches.sort((a, b) => new Date(a.date) - new Date(b.date));
                const firstMatchDate = new Date(sortedMatches[0].date);
                const lastMatchDate = new Date(sortedMatches[sortedMatches.length - 1].date);
                
                const timeline = [];
                let currentDate = new Date(firstMatchDate.getFullYear(), firstMatchDate.getMonth(), 1);
                while (currentDate <= lastMatchDate) {
                    const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
                    const monthLabel = currentDate.toLocaleString('default', { month: 'short', year: 'numeric' });
                    const stats = monthlyStats[monthKey] || { wins: 0, losses: 0, totalMatches: 0 };
                    timeline.push({
                        month: monthLabel,
                        winRate: stats.totalMatches > 0 ? Math.round((stats.wins / stats.totalMatches) * 100) : 0,
                        wins: stats.wins,
                        losses: stats.losses,
                        totalMatches: stats.totalMatches
                    });
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }

                return timeline;
            })();

            res.json({
                overallStats,
                serveStats,
                returnStats,
                shotAnalysis,
                surfaceStats,
                recentForm: matches.slice(0, 5).map(m => ({ match: `vs ${m.opponent}`, result: m.result, score: m.score, date: m.date })),
                performanceData
            });
        });
    });
});

app.get('/api/profile-stats', (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'User not found' });
        }

        db.all('SELECT * FROM matches WHERE userId = ?', [user.id], (err, matches) => {
            if (err) {
                return res.status(500).json({ error: 'Error fetching matches' });
            }

            if (matches.length === 0) {
                return res.json({
                    totalMatches: 0,
                    wins: 0,
                    losses: 0,
                    winRate: 0,
                    averageServeSpeed: 0,
                    averageVolleySpeed: 0, // This is not in the database, so I'll hardcode it for now.
                    acesPerMatch: 0,
                    doubleFaultsPerMatch: 0,
                    breakPointsSaved: 0,
                    firstServePercentage: 0,
                    longestRally: 0,
                    averageMatchDuration: "0h 0m",
                });
            }

            const totalMatches = matches.length;
            const wins = matches.filter(m => m.result === 'Win').length;
            const losses = totalMatches - wins;
            const winRate = Math.round((wins / totalMatches) * 100);
            const averageServeSpeed = Math.round(matches.reduce((acc, m) => acc + m.averageServeSpeed, 0) / totalMatches);
            const acesPerMatch = (matches.reduce((acc, m) => acc + m.aces, 0) / totalMatches).toFixed(1);
            const doubleFaultsPerMatch = (matches.reduce((acc, m) => acc + m.doubleFaults, 0) / totalMatches).toFixed(1);
            const breakPointsSaved = Math.round(matches.reduce((acc, m) => acc + m.breakPointsSavedPercentage, 0) / totalMatches * 100);
            const firstServePercentage = Math.round(matches.reduce((acc, m) => acc + m.firstServePercentage, 0) / totalMatches * 100);
            const longestRally = Math.max(...matches.map(m => m.forehandWinners + m.backhandWinners + m.volleyWinners + m.overheadWinners));
            const totalDuration = matches.reduce((acc, m) => acc + m.duration, 0);
            const averageMatchDurationMinutes = Math.round(totalDuration / totalMatches);
            const hours = Math.floor(averageMatchDurationMinutes / 60);
            const minutes = averageMatchDurationMinutes % 60;
            const averageMatchDuration = `${hours}h ${minutes}m`;

            const favoriteClubs = Object.values(matches.reduce((acc, m) => {
                if (!acc[m.club]) {
                    acc[m.club] = { name: m.club, matches: 0, wins: 0 };
                }
                acc[m.club].matches++;
                if (m.result === 'Win') {
                    acc[m.club].wins++;
                }
                return acc;
            }, {})).map(club => ({
                ...club,
                winRate: Math.round((club.wins / club.matches) * 100),
            })).sort((a, b) => b.matches - a.matches).slice(0, 3);


            res.json({
                totalMatches,
                wins,
                losses,
                winRate,
                averageServeSpeed,
                averageVolleySpeed: 89, // Hardcoded as it's not in the DB
                acesPerMatch,
                doubleFaultsPerMatch,
                breakPointsSaved,
                firstServePercentage,
                longestRally,
                averageMatchDuration,
                favoriteClubs,
            });
        });
    });
});

app.get('/api/schedules/:clubId', (req, res) => {
  const { clubId } = req.params;
  db.all('SELECT * FROM schedules WHERE club_id = ?', [clubId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching schedules' });
    }
    res.json(rows);
  });
});

app.post('/api/bookings', (req, res) => {
  const { username, schedule_id } = req.body; // Accept username instead of user_id
  
  if (!username || !schedule_id) {
    return res.status(400).json({ error: 'Username and schedule_id are required' });
  }

  // First get the user_id from username
  db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Now create the booking with the correct user_id
    db.run('UPDATE schedules SET is_booked = 1 WHERE id = ?', [schedule_id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error updating schedule' });
      }
      
      db.run('INSERT INTO bookings (user_id, schedule_id, booking_time) VALUES (?, ?, ?)', 
        [user.id, schedule_id, new Date().toISOString()], function(err) {
        if (err) {
          console.error('Error creating booking:', err);
          return res.status(500).json({ error: 'Error creating booking' });
        }
        console.log('Booking created successfully:', {
          bookingId: this.lastID,
          userId: user.id,
          scheduleId: schedule_id
        });
        res.status(201).json({ message: 'Booking created successfully', bookingId: this.lastID });
      });
    });
  });
});

app.get('/api/bookings', (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.get('SELECT id FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: 'User not found' });
    }
    db.all(`
      SELECT b.id, s.club_id, s.court_name, s.start_time, s.end_time
      FROM bookings b
      JOIN schedules s ON b.schedule_id = s.id
      WHERE b.user_id = ?
    `, [user.id], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching bookings' });
      }
      res.json(rows);
    });
  });
});

// Insert this after the existing booking routes

app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  
  // First, get the booking to find the associated schedule_id
  db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, booking) => {
    if (err) {
      console.error('Error fetching booking:', err);
      return res.status(500).json({ error: 'Error fetching booking' });
    }
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Delete the booking
    db.run('DELETE FROM bookings WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Error deleting booking:', err);
        return res.status(500).json({ error: 'Error deleting booking' });
      }
      
      // Update the schedule to mark it as not booked
      db.run('UPDATE schedules SET is_booked = 0 WHERE id = ?', [booking.schedule_id], function(err) {
        if (err) {
          console.error('Error updating schedule:', err);
          return res.status(500).json({ error: 'Error updating schedule' });
        }
        
        console.log('Booking cancelled successfully:', {
          bookingId: id,
          scheduleId: booking.schedule_id
        });
        
        res.json({ message: 'Booking cancelled successfully' });
      });
    });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
