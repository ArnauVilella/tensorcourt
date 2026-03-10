import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { 
  Camera, 
  Play, 
  Users, 
  Shield, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Plus,
  X
} from 'lucide-react';
import Header from './Header';
import courtCameraFeed from '../assets/3b354adab023aa80b62dcd0821daf1bfb0d49683.mp4';
import liveMatchFeed from '../assets/784dsa1d81e7b002af0edd0e2a186f4s5cssw.mp4';

const StartGame = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [courtCode, setCourtCode] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [matchStarted, setMatchStarted] = useState(false);
  const [players, setPlayers] = useState([
    { id: 1, name: user.name, avatar: user.profilePicture, isUser: true }
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [matchTime, setMatchTime] = useState(0);
  const [matchTimer, setMatchTimer] = useState(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);

  // Handle browser beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (matchStarted) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? This will end the current match.';
        return 'Are you sure you want to leave? This will end the current match.';
      }
    };

    if (matchStarted) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [matchStarted]);

  // Handle React Router navigation blocking
  useEffect(() => {
    const handlePopState = (e) => {
      if (matchStarted) {
        e.preventDefault();
        window.history.pushState(null, '', location.pathname);
        setShowExitDialog(true);
        setPendingNavigation('back');
      }
    };

    if (matchStarted) {
      window.history.pushState(null, '', location.pathname);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [matchStarted, location.pathname]);

  // Override the Header's logout function to show warning during match
  const handleLogoutWithWarning = () => {
    if (matchStarted) {
      setShowExitDialog(true);
      setPendingNavigation('logout');
    } else {
      onLogout();
    }
  };

  // Handle navigation requests during match
  const handleNavigationRequest = (destination) => {
    if (matchStarted) {
      setShowExitDialog(true);
      setPendingNavigation(destination);
    } else {
      navigate(destination);
    }
  };

  // Handle exit confirmation
  const handleConfirmExit = () => {
    setShowExitDialog(false);
    handleEndMatch();
    
    if (pendingNavigation === 'logout') {
      onLogout();
    } else if (pendingNavigation === 'back') {
      window.history.back();
    } else if (typeof pendingNavigation === 'string') {
      navigate(pendingNavigation);
    }
    
    setPendingNavigation(null);
  };

  const handleCancelExit = () => {
    setShowExitDialog(false);
    setPendingNavigation(null);
  };

  // Mock court validation
  const handleConnect = () => {
    if (courtCode && password) {
      setIsConnected(true);
    }
  };

  const handleStartMatch = () => {
    setMatchStarted(true);
    // Start timer
    const timer = setInterval(() => {
      setMatchTime(prev => prev + 1);
    }, 1000);
    setMatchTimer(timer);
  };

  const handleEndMatch = async () => {
    setMatchStarted(false);
    setMatchTime(0);
    if (matchTimer) {
        clearInterval(matchTimer);
        setMatchTimer(null);
    }

    if (!user || !user.username || players.length < 2) {
        console.error("Cannot save match, user or opponent missing.");
        navigate('/dashboard');
        return;
    }

    const opponent = players.find(p => !p.isUser).name;
    const result = Math.random() > 0.5 ? 'Win' : 'Loss';
    const isWin = result === 'Win';
    const score = isWin ? '6-3, 6-4' : '4-6, 6-2, 3-6';
    const duration = Math.floor(matchTime / 60);
    const club = 'Local Match';
    const surface = 'Hard'; // Assuming hard court for now

    const games = score.split(',').map(s => s.trim().split('-').map(Number));
    const gamesWon = games.reduce((acc, set) => acc + set[0], 0);
    const gamesLost = games.reduce((acc, set) => acc + set[1], 0);

    const forehandWinners = Math.floor(Math.random() * 15) + 5;
    const backhandWinners = Math.floor(Math.random() * 10) + 3;
    const volleyWinners = Math.floor(Math.random() * 8) + 2;
    const overheadWinners = Math.floor(Math.random() * 5) + 1;
    const opponentWinners = Math.floor(Math.random() * 20) + 5;
    const forehandErrors = Math.floor(Math.random() * 10) + 5;
    const backhandErrors = Math.floor(Math.random() * 12) + 5;
    const volleyErrors = Math.floor(Math.random() * 5) + 1;
    const overheadErrors = Math.floor(Math.random() * 3);

    const breakGamesWon = Math.floor(Math.random() * 5);
    const opponentBreakGamesWon = Math.floor(Math.random() * 4);

    const matchData = {
        username: user.username,
        opponent,
        result,
        score,
        duration,
        club,
        surface,
        aces: Math.floor(Math.random() * 10),
        doubleFaults: Math.floor(Math.random() * 5) + 3,
        firstServePercentage: Math.random() * (0.8 - 0.5) + 0.5,
        breakPointsSaved: Math.random() * (0.7 - 0.3) + 0.3,
        serveSpeed: Math.floor(Math.random() * (130 - 100) + 100),
        forehandWinners,
        forehandErrors,
        backhandWinners,
        backhandErrors,
        volleyWinners,
        volleyErrors,
        overheadWinners,
        overheadErrors,
        opponentAces: Math.floor(Math.random() * 8),
        opponentDoubleFaults: Math.floor(Math.random() * 6),
        opponentWinners,
        opponentUnforcedErrors: Math.floor(Math.random() * 20) + 5,
        breakPointsWon: breakGamesWon + Math.floor(Math.random() * 3),
        breakPointsTotal: breakGamesWon + Math.floor(Math.random() * 5) + 3,
        opponentBreakPointsWon: opponentBreakGamesWon + Math.floor(Math.random() * 3),
        opponentBreakPointsTotal: opponentBreakGamesWon + Math.floor(Math.random() * 5) + 2,
    };

    try {
        const response = await fetch('/api/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(matchData),
        });

        if (response.ok) {
            console.log('Match ended and saved');
        } else {
            console.error('Failed to save match');
        }
    } catch (error) {
        console.error('Error saving match:', error);
    }
    
    navigate('/dashboard');
};

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, {
        id: Date.now(),
        name: newPlayerName.trim(),
        avatar: null,
        isUser: false
      }]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (playerId) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== playerId));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (matchTimer) {
        clearInterval(matchTimer);
      }
    };
  }, [matchTimer]);

  if (matchStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogoutWithWarning} onNavigate={handleNavigationRequest} />
        
        {/* Exit Confirmation Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Current Match?</AlertDialogTitle>
              <AlertDialogDescription>
                This will end the current game. Are you sure you want to continue? 
                All match progress will be saved to your history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelExit}>
                Stay in Match
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                End Match
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Video Feed */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Live Match Feed</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        LIVE
                      </Badge>
                      <span className="text-sm text-gray-600">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {formatTime(matchTime)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <video 
                      src={liveMatchFeed}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    
                    {/* Controls overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="destructive" onClick={handleEndMatch}>
                          FINISH MATCH
                        </Button>
                        <Button variant="outline" className="bg-black/50 text-white border-white/30">
                          CHALLENGE
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Scoreboard & Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Score Display */}
                    <div className="bg-gray-900 text-white p-6 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-400">SETS</p>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">GAMES</p>
                          <p className="text-2xl font-bold">4-3</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">POINTS</p>
                          <p className="text-2xl font-bold">30-15</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{players[0]?.name}</span>
                          <span>6-4, 4-3</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{players[1]?.name || 'Opponent'}</span>
                          <span>4-6, 3-4</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-600">Aces</p>
                        <p className="text-xl font-bold">3</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Double Faults</p>
                        <p className="text-xl font-bold">1</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Winners</p>
                        <p className="text-xl font-bold">12</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">Errors</p>
                        <p className="text-xl font-bold">8</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Players */}
              <Card>
                <CardHeader>
                  <CardTitle>Match Players</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {players.map((player, index) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={player.avatar} />
                            <AvatarFallback>
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.name}</span>
                          {player.isUser && <Badge variant="outline">You</Badge>}
                        </div>
                        {index === 0 && (
                          <Badge className="bg-green-100 text-green-800">
                            Serving
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Match Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Match Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Court:</span>
                    <span>Court {courtCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>{formatTime(matchTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span>Best of 3 Sets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surface:</span>
                    <span>Hard Court</span>
                  </div>
                </CardContent>
              </Card>

              {/* Warning Message */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Match in Progress</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Leaving this page will end the current match. Make sure to end the match properly to save your statistics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Current Match?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end the current game. Are you sure you want to continue? 
              All match progress will be saved to your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelExit}>
              Stay in Match
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              End Match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Start New Match</h1>
          <p className="text-gray-600">Connect to an AI-enabled court to begin real-time match tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Court Connection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Court Connection
              </CardTitle>
              <CardDescription>
                Enter the court reference and password displayed on the court's scoreboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="court-code">Court Reference</Label>
                <Input
                  id="court-code"
                  placeholder="e.g., TC001"
                  value={courtCode}
                  onChange={(e) => setCourtCode(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Court Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password from scoreboard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleConnect} 
                disabled={!courtCode || !password || isConnected}
                className="w-full"
              >
                {isConnected ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Connected
                  </>
                ) : (
                  'Connect to Court'
                )}
              </Button>

              {isConnected && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Connected to Court {courtCode}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Camera Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Live Camera Feed
              </CardTitle>
              <CardDescription>
                Preview of the court camera before starting the match
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {isConnected ? (
                  <video 
                    src={courtCameraFeed}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Connect to court to view live feed</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Players Setup */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Match Players
              </CardTitle>
              <CardDescription>
                Add players to the match. You can add registered users or guest players.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current Players */}
                <div className="space-y-3">
                  {players.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>
                            {player.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          {player.isUser && <Badge variant="outline" className="text-xs">You</Badge>}
                        </div>
                      </div>
                      {!player.isUser && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removePlayer(player.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Player */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter player name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                  />
                  <Button onClick={addPlayer}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Start Match */}
                <div className="pt-4 border-t">
                  <Button 
                    onClick={handleStartMatch}
                    disabled={!isConnected || players.length < 2}
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    START MATCH
                  </Button>
                  
                  {(!isConnected || players.length < 2) && (
                    <div className="flex items-center mt-2 text-sm text-amber-600">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      {!isConnected && "Connect to a court"}
                      {isConnected && players.length < 2 && "Add at least one opponent"}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StartGame;