import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "../styles/datepicker.css";
import { Button } from "./ui/button";
import winningAceImage from '../assets/34387cd335f784092f0e579d9fd817384ed5cacb.png';
import perfectBackhandImage from '../assets/a661e0f8b33ce2632306097c309ec3558a682a5b.png';
import amazingRallyImage from '../assets/ab8c79c50957d713ad5a0930f40005c3cd6a2fb0.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Trophy,
  Play,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Crown,
  Calendar as CalendarIcon,
} from "lucide-react";
import Header from "./Header";

const Dashboard = ({ user, onLogout }) => {
  const [matches, setMatches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingDates, setBookingDates] = useState([]);
  const [stats, setStats] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [hoveredMatchId, setHoveredMatchId] = useState(null);
  const [lockedMatchId, setLockedMatchId] = useState(null);
  const popoverRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Helper function to check if a date has a match
  const hasMatch = (date) => {
    return highlightedDates.some(matchDate => {
      const matchDateOnly = new Date(matchDate);
      matchDateOnly.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return matchDateOnly.getTime() === checkDate.getTime();
    });
  };

  const hasBooking = (date) => {
    const result = bookings.some(booking => {
      const bookingDate = new Date(booking.start_time);
      bookingDate.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      
      const hasMatch = bookingDate.getTime() === checkDate.getTime();
      if (hasMatch) {
        console.log('Found booking match:', {
          booking: booking,
          bookingDate: bookingDate,
          checkDate: checkDate,
          bookingStartTime: booking.start_time
        });
      }
      return hasMatch;
    });
    
    console.log('hasBooking check for date:', date, 'result:', result);
    return result;
  };

  const getClubName = (clubId) => {
    const clubNames = {
      1: "City Tennis Center",
      2: "Valley Sports Club", 
      3: "Riverside Tennis Academy",
      4: "Metro Tennis Complex"
    };
    return clubNames[clubId] || `Club ${clubId}`;
  };

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    console.log('dayClassName check for:', date);
    
    // Check if the date is exactly today
    if (compareDate.getTime() === today.getTime()) {
      console.log('Date is today');
      return "react-datepicker__day--today";
    }
    
    if (hasBooking(date)) {
      console.log('Date has booking - applying booking class');
      return "react-datepicker__day--highlighted react-datepicker__day--booking";
    }
    
    // Check if the date has a match
    if (hasMatch(date)) {
      console.log('Date has match - applying match class');
      return "react-datepicker__day--highlighted react-datepicker__day--match";
    }
    
    console.log('Date has no special styling');
    return undefined;
  };

  const renderDayContents = (day, date) => {
  const match = matches.find(m => {
    const matchDate = new Date(m.date);
    return date.getDate() === matchDate.getDate() &&
           date.getMonth() === matchDate.getMonth() &&
           date.getFullYear() === matchDate.getFullYear();
  });

  const booking = bookings.find(b => {
    const bookingDate = new Date(b.start_time);
    return date.getDate() === bookingDate.getDate() &&
           date.getMonth() === bookingDate.getMonth() &&
           date.getFullYear() === bookingDate.getFullYear();
  });

  // Match found - show match popover with hover functionality
  if (match) {
    return (
      <Popover open={hoveredMatchId === match.id || lockedMatchId === match.id}>
        <PopoverTrigger asChild
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current);
            setHoveredMatchId(match.id)
          }}
          onMouseLeave={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setHoveredMatchId(null);
            }, 200);
          }}
          onClick={() => setLockedMatchId(lockedMatchId === match.id ? null : match.id)}
        >
          <div className="react-datepicker__day--match-container">{day}</div>
        </PopoverTrigger>
        <PopoverContent 
          ref={popoverRef} 
          className="w-[500px]" 
          align="end" 
          sideOffset={4} 
          onOpenAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current);
            setHoveredMatchId(match.id)
          }} 
          onMouseLeave={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setHoveredMatchId(null);
            }, 200);
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge
                variant={
                  match.result === "Win"
                    ? "default"
                    : "secondary"
                }
              >
                {match.result}
              </Badge>
              <div>
                <p className="font-medium">
                  vs {match.opponent}
                </p>
                <p className="text-sm text-gray-600">
                  {match.score}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {new Date(match.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                {formatDuration(parseInt(match.duration))}
              </p>
            </div>
            <Link to={`/match/${match.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Booking found - show booking popover with hover functionality
  if (booking) {
    return (
      <Popover open={hoveredMatchId === `booking-${booking.id}` || lockedMatchId === `booking-${booking.id}`}>
        <PopoverTrigger asChild
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current);
            setHoveredMatchId(`booking-${booking.id}`)
          }}
          onMouseLeave={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setHoveredMatchId(null);
            }, 200);
          }}
          onClick={() => {
            const bookingId = `booking-${booking.id}`;
            setLockedMatchId(lockedMatchId === bookingId ? null : bookingId);
          }}
        >
          <div className="react-datepicker__day--booking-container">{day}</div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[500px]" 
          align="end" 
          sideOffset={4} 
          onOpenAutoFocus={(e) => e.preventDefault()}
          onMouseEnter={() => {
            clearTimeout(hoverTimeoutRef.current);
            setHoveredMatchId(`booking-${booking.id}`)
          }} 
          onMouseLeave={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setHoveredMatchId(null);
            }, 200);
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className="bg-orange-500">
                Booking
              </Badge>
              <div>
                <p className="font-medium">
                  {booking.club_name || `Club ${booking.club_id}`}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.court_name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {new Date(booking.start_time).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleCancelBooking(booking.id)}>
              Cancel Booking
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // No match or booking - return plain day
  return <div>{day}</div>;
};

const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== bookingId));
      } else {
        console.error('Failed to cancel booking');
        alert('Failed to cancel booking. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('An error occurred while cancelling the booking.');
    }
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setLockedMatchId(null);
    }
  };

  if (lockedMatchId) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [lockedMatchId]);

// Also update your cleanup when component unmounts:
useEffect(() => {
  return () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };
}, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user || !user.username) return;
      try {
        const response = await fetch(`/api/matches?username=${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
          calculateStats(data);
          setHighlightedDates(data.map(match => new Date(match.date)));
        } else {
          console.error('Failed to fetch matches');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();

    const fetchBookings = async () => {
      if (!user || !user.username) return;
      try {
        const response = await fetch(`/api/bookings?username=${user.username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched bookings:', data); // Debug log
          
          // Map the bookings to include proper club names
          const bookingsWithClubNames = data.map(booking => ({
            ...booking,
            club_name: getClubName(booking.club_id)
          }));
          
          setBookings(bookingsWithClubNames);
          console.log('Processed bookings:', bookingsWithClubNames); // Debug log
          
          // Create booking dates array
          const bookingDatesArray = bookingsWithClubNames.map(booking => {
            const date = new Date(booking.start_time);
            console.log('Booking date:', date, 'from start_time:', booking.start_time); // Debug log
            return date;
          });
          
          setBookingDates(bookingDatesArray);
          console.log('Booking dates array:', bookingDatesArray); // Debug log
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [user]);
  
  const calculateStats = (matchesData) => {
    if (matchesData.length === 0) {
        setStats({
            totalMatches: 0,
            winRate: 0,
            avgServeSpeed: 0,
            acesPerMatch: 0,
            firstServePercentage: 0,
            breakPointsSaved: 0,
            longestRally: 0,
            totalDoubleFaults: 0,
        });
        return;
    }
    const totalMatches = matchesData.length;
    const wins = matchesData.filter(m => m.result === 'Win').length;
    const winRate = Math.round((wins / totalMatches) * 100);
    const avgServeSpeed = Math.round(matchesData.reduce((acc, m) => acc + m.averageServeSpeed, 0) / totalMatches);
    const acesPerMatch = (matchesData.reduce((acc, m) => acc + m.aces, 0) / totalMatches).toFixed(1);
    const firstServePercentage = Math.round(matchesData.reduce((acc, m) => acc + m.firstServePercentage, 0) / totalMatches * 100);
    const breakPointsSaved = Math.round(matchesData.reduce((acc, m) => acc + m.breakPointsSavedPercentage, 0) / totalMatches * 100);
    const longestRally = Math.max(...matchesData.map(m => m.forehandWinners + m.backhandWinners + m.volleyWinners + m.overheadWinners));
    const totalDoubleFaults = matchesData.reduce((acc, m) => acc + m.doubleFaults, 0);
    setStats({
      totalMatches,
      winRate,
      avgServeSpeed,
      acesPerMatch,
      firstServePercentage,
      breakPointsSaved,
      longestRally,
      totalDoubleFaults
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const highlights = [
    {
      id: 1,
      title: "Winning Ace",
      match: "vs Sarah Johnson",
      thumbnail: winningAceImage,
    },
    {
      id: 2,
      title: "Amazing Rally",
      match: "vs Mike Wilson",
      thumbnail: amazingRallyImage,
    },
    {
      id: 3,
      title: "Perfect Backhand",
      match: "vs Emma Davis",
      thumbnail: perfectBackhandImage,
    },
  ];

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user.username}!
                  </h1>
                  <p className="text-blue-100">
                    Ready to play today?
                  </p>
                </div>
                <Link to="/start-game">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Game
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">
                        Total Matches
                      </p>
                      <p className="text-2xl font-bold text-[18px]">
                        {stats.totalMatches}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">
                        Win Rate
                      </p>
                      <p className="text-2xl font-bold text-[18px]">
                        {stats.winRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">
                        Avg Serve
                      </p>
                      <p className="text-2xl font-bold text-[18px]">
                        {stats.avgServeSpeed} mph
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">
                        Aces/Match
                      </p>
                      <p className="text-2xl font-bold text-[18px]">
                        {stats.acesPerMatch}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>
                  Your latest tennis matches and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.slice(0, 3).map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            match.result === "Win"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {match.result}
                        </Badge>
                        <div>
                          <p className="font-medium">
                            vs {match.opponent}
                          </p>
                          <p className="text-sm text-gray-600">
                            {match.score}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(match.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDuration(parseInt(match.duration))}
                        </p>
                      </div>
                      <Link to={`/match/${match.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/matches">
                    <Button variant="outline" className="w-full">
                      View All Matches
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Highlights Reel */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Highlights</CardTitle>
                <CardDescription>
                  Your best moments from recent matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {highlights.map((highlight) => (
                    <div
                      key={highlight.id}
                      className="relative group cursor-pointer"
                    >
                      <img
                        src={highlight.thumbnail}
                        alt={highlight.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      <div className="mt-2">
                        <p className="font-medium">
                          {highlight.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {highlight.match}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={user.profilePicture}
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{user.username}</h3>
                    <Badge
                      variant={user.plan === "premium" ? "default" : "secondary"}
                      className={`text-sm ${
                        user.plan === "premium"
                          ? "bg-black text-white"
                          : ""
                      }`}
                    >
                      {user.plan === "premium" ? "Premium" : "Free"}
                    </Badge>
                  </div>
                </div>
                <Link to="/manage-plan">
                  <Button variant="outline" className="w-full">
                    <Crown className="w-4 h-4 mr-2" />
                    Manage Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Match Calendar */}
            <Card className="calendar-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Match Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <DatePicker
                  onChange={() => {}}
                  highlightDates={[...highlightedDates, ...bookingDates]}
                  dayClassName={dayClassName}
                  renderDayContents={renderDayContents}
                  inline
                />
              </CardContent>
            </Card>

            {/* Detailed Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>First Serve %</span>
                    <span>
                      {stats.firstServePercentage}%
                    </span>
                  </div>
                  <Progress value={stats.firstServePercentage} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Break Points Saved</span>
                    <span>{stats.breakPointsSaved}%</span>
                  </div>
                  <Progress value={stats.breakPointsSaved} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {stats.longestRally}
                    </p>
                    <p className="text-xs text-gray-600">
                      Longest Rally
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {stats.totalDoubleFaults}
                    </p>
                    <p className="text-xs text-gray-600">
                      Double Faults
                    </p>
                  </div>
                </div>
                <Link to="/full-stats">
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Stats
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
