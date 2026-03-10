import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';
registerLocale('en-GB', enGB);
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css';
import { 
  ArrowLeft, 
  MapPin, 
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Clock,
  Search,
  Calendar as CalendarIcon
} from 'lucide-react';
import Header from './Header';

const AllMatches = ({ user, onLogout }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const matchesPerPage = 10;

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user || !user.username) return;
      try {
        setLoading(true);
        const response = await fetch(`/api/matches?username=${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
          setFilteredMatches(data);
        } else {
          console.error('Failed to fetch matches');
          setMatches([]);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user]);

  useEffect(() => {
    let filtered = matches;

    if (searchTerm) {
        filtered = filtered.filter(match => 
            match.opponent.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (startDate && endDate) {
        filtered = filtered.filter(match => {
            const matchDate = new Date(match.date);
            return matchDate >= startDate && matchDate <= endDate;
        });
    }

    setFilteredMatches(filtered);
    setCurrentPage(1);
  }, [searchTerm, startDate, endDate, matches]);

  // Pagination
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = filteredMatches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate stats
  const totalMatches = filteredMatches.length;
  const wins = filteredMatches.filter(m => m.result === 'Win').length;
  const losses = filteredMatches.filter(m => m.result === 'Loss').length;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

  const getResultIcon = (result) => {
    switch(result) {
      case 'Win': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'Loss': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getResultColor = (result) => {
    switch(result) {
      case 'Win': return 'bg-green-100 text-green-800';
      case 'Loss': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/dashboard">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Match History</h1>
          <p className="text-gray-600">View and analyze all your tennis matches</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Matches</p>
                  <p className="text-2xl font-bold">{totalMatches}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wins</p>
                  <p className="text-2xl font-bold text-green-600">{wins}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Losses</p>
                  <p className="text-2xl font-bold text-red-600">{losses}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold">{winRate}%</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
            <CardContent className="p-6 flex items-center space-x-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                        placeholder="Search by opponent..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        isClearable={true}
                        placeholderText="Select a date range"
                        className="w-64 p-2 border rounded-md"
                        locale="en-GB"
                        popperClassName="react-datepicker-override"
                    />
                </div>
            </CardContent>
        </Card>

        {/* Matches List */}
        <div className="space-y-4">
          {loading ? (
             <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">Loading matches...</p>
              </CardContent>
            </Card>
          ) : currentMatches.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">No matches found.</p>
              </CardContent>
            </Card>
          ) : (
            currentMatches.map((match) => (
              <Card key={match.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center mb-2">
                        <Badge className={`mr-3 ${getResultColor(match.result)}`}>
                          <span className="flex items-center">
                            {getResultIcon(match.result)}
                            <span className="ml-1">{match.result}</span>
                          </span>
                        </Badge>
                        <h3 className="text-lg font-semibold">
                          vs {match.opponent}
                        </h3>
                      </div>
                      
                      <p className="text-xl text-gray-800 mb-2">{match.score}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {new Date(match.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {match.club}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDuration(parseInt(match.duration))}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Link to={`/match/${match.id}`}>
                        <Button size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) 
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-8">
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        )}
      </main>
    </div>
  );
};

export default AllMatches;