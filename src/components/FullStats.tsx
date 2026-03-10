import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import html2canvas from "html2canvas";
import ShareableStats from './ShareableStats'; // Import the new component
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { ArrowLeft, Share2, Twitter, Instagram } from 'lucide-react';
import Header from './Header';

import whatsappLogo from '../assets/whatsapp.png';
import xLogo from '../assets/x.png';
import instagramLogo from '../assets/instagram.png';
import wechatLogo from '../assets/wechat.png';
import xiaohongshuLogo from '../assets/xiaohongshu.png';

  const SocialMediaShareButton = ({ platform, image }) => {
  const handleShare = async () => {
    const shareText = "Check out my tennis stats from TensorCourt! ";
    const shareUrl = "https://tensorcourt.com"; // Replace with your actual website URL
    
    switch (platform) {
      case "whatsapp":
        // Download image first, then open WhatsApp with text
        downloadImage(image, 'tennis-stats.png');
        setTimeout(() => {
          const encodedText = encodeURIComponent(`${shareText} ${shareUrl}`);
          window.open(`https://wa.me/?text=${encodedText}`, "_blank");
        }, 500);
        break;
        
      case "x":
        // For Twitter/X, we need to upload to a temporary hosting service or download
        // Since direct image upload isn't possible via URL, we'll download and provide instructions
        downloadImage(image, 'tennis-stats.png');
        setTimeout(() => {
          const encodedText = encodeURIComponent(shareText);
          const encodedUrl = encodeURIComponent(shareUrl);
          window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, "_blank");
        }, 500);
        break;
        
      case "instagram":
        // Instagram requires manual upload
        downloadImage(image, 'tennis-stats.png');
        break;
        
      case "wechat":
        // WeChat requires manual sharing
        downloadImage(image, 'tennis-stats.png');
        break;
        
      case "xiaohongshu":
        // Xiaohongshu requires manual upload
        downloadImage(image, 'tennis-stats.png');
        break;
        
      default:
        // Generic download
        downloadImage(image, 'tennis-stats.png');
        break;
    }
  };

  // Helper function to download image
  const downloadImage = (dataUrl, filename) => {
    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: try to copy image to clipboard
      copyImageToClipboard(dataUrl);
    }
  };

  // Fallback function to copy image to clipboard
  const copyImageToClipboard = async (dataUrl) => {
    try {
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      alert("Image copied to clipboard! You can now paste it in your social media app.");
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      alert("Unable to download or copy image. Please try right-clicking on the image and saving it manually.");
    }
  };

  const getLogo = () => {
    switch (platform) {
      case "whatsapp":
        return <img src={whatsappLogo} alt='whatsapp' className='w-8 h-8' />;
      case "x":
        return <img src={xLogo} alt='x' className='w-8 h-8' />;
      case "instagram":
        return <img src={instagramLogo} alt='instagram' className='w-8 h-8' />;
      case "wechat":
        return <img src={wechatLogo} alt='wechat' className='w-8 h-8' />;
      case "xiaohongshu":
        return <img src={xiaohongshuLogo} alt='xiaohongshu' className='w-8 h-8' />;
      default:
        return null;
    }
  };

  return (
    <Button onClick={handleShare} variant="ghost" size="icon">
      {getLogo()}
    </Button>
  );
};

const FullStats = ({ user, onLogout }) => {
  const [stats, setStats] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const shareableRef = useRef(null);

  const handleShareClick = async () => {
    if (!shareableRef.current) {
      alert("Could not generate image: component not ready.");
      return;
    }
    setIsLoading(true);
    try {
      const canvas = await html2canvas(shareableRef.current, {
        useCORS: true, // In case any images are loaded from other origins
        scale: 2, // Higher resolution
      });
      const image = canvas.toDataURL("image/png", 1.0);
      setGeneratedImage(image);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Sorry, there was an error creating the shareable image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || !user.username) return;
      try {
        const response = await fetch(`/api/full-stats?username=${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Failed to fetch full stats');
        }
      } catch (error) {
        console.error('Error fetching full stats:', error);
      }
    };

    const fetchMatches = async () => {
      if (!user || !user.username) return;
      try {
        const response = await fetch(`/api/matches?username=${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setMatches(data);
        } else {
          console.error('Failed to fetch matches');
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchStats();
    fetchMatches();
  }, [user, selectedPeriod]);

  if (!stats) {
    return <div>Loading...</div>;
  }

  const { overallStats, serveStats, returnStats, shotAnalysis, surfaceStats, recentForm, performanceData } = stats;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const winRateTrendData = performanceData
    ? performanceData.filter(item => {
        const itemDate = new Date(item.month);
        return itemDate >= sixMonthsAgo;
      })
    : [];

  const radarData = [
    { subject: 'Serve', value: serveStats.firstServePercentage, fullMark: 100 },
    { subject: 'Return', value: returnStats.breakPointsConverted, fullMark: 100 },
    { subject: 'Forehand', value: (shotAnalysis.forehandWinners / (shotAnalysis.forehandWinners + shotAnalysis.forehandErrors)) * 100, fullMark: 100 },
    { subject: 'Backhand', value: (shotAnalysis.backhandWinners / (shotAnalysis.backhandWinners + shotAnalysis.backhandErrors)) * 100, fullMark: 100 },
    { subject: 'Volley', value: (shotAnalysis.volleyWinners / (shotAnalysis.volleyWinners + shotAnalysis.volleyErrors)) * 100, fullMark: 100 },
    { subject: 'Overhead', value: (shotAnalysis.overheadWinners / (shotAnalysis.overheadWinners + shotAnalysis.overheadErrors)) * 100, fullMark: 100 }
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${value}`}
      </text>
    );
  };

  const shotData = [
    { name: 'Forehand', winners: shotAnalysis.forehandWinners, errors: shotAnalysis.forehandErrors },
    { name: 'Backhand', winners: shotAnalysis.backhandWinners, errors: shotAnalysis.backhandErrors },
    { name: 'Volley', winners: shotAnalysis.volleyWinners, errors: shotAnalysis.volleyErrors },
    { name: 'Overhead', winners: shotAnalysis.overheadWinners, errors: shotAnalysis.overheadErrors },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Off-screen component for image generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <ShareableStats ref={shareableRef} stats={stats} user={user} matches={matches} performanceData={winRateTrendData} radarData={radarData} />
      </div>

      <Header user={user} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Full Statistics</h1>
              <p className="text-gray-600">Comprehensive tennis performance analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleShareClick} disabled={isLoading}>
              {isLoading ? 'Generating...' : <><Share2 className="w-4 h-4 mr-2" /> Share</>}
            </Button>
          </div>
        </div>

        {/* The rest of the component remains the same... */}
        <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="serve">Serve Analysis</TabsTrigger>
              <TabsTrigger value="return">Return Analysis</TabsTrigger>
              <TabsTrigger value="shots">Shot Analysis</TabsTrigger>
              <TabsTrigger value="surfaces">Surface Stats</TabsTrigger>
              <TabsTrigger value="form">Recent Form</TabsTrigger>
            </TabsList>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Win Rate Trend */}
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Win Rate Trend</CardTitle>
                    <CardDescription>Monthly win percentage over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      {winRateTrendData.length > 0 ? (
                        <LineChart data={winRateTrendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Line 
                            type="monotone" 
                            dataKey="winRate"
                            name="Win Rate"
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-500">No data available for the last 6 months.</p>
                        </div>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Performance Radar */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Performance Radar</CardTitle>
                    <CardDescription>Overall skill assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 100]} />
                        <Radar
                          name="Performance"
                          dataKey="value"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Match Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{overallStats.wins}</div>
                      <div className="text-sm text-gray-600">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{overallStats.losses}</div>
                      <div className="text-sm text-gray-600">Losses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{overallStats.setsWon}</div>
                      <div className="text-sm text-gray-600">Sets Won</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{overallStats.setsLost}</div>
                      <div className="text-sm text-gray-600">Sets Lost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{overallStats.gamesWon}</div>
                      <div className="text-sm text-gray-600">Games Won</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">{overallStats.gamesLost}</div>
                      <div className="text-sm text-gray-600">Games Lost</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Serve Analysis Tab */}
            <TabsContent value="serve" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Serve Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">First Serve %</span>
                        <span className="text-sm">{serveStats.firstServePercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={serveStats.firstServePercentage} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">First Serve Win %</span>
                        <span className="text-sm">{serveStats.firstServeWinPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={serveStats.firstServeWinPercentage} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Second Serve Win %</span>
                        <span className="text-sm">{serveStats.secondServeWinPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={serveStats.secondServeWinPercentage} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Break Points Saved</span>
                        <span className="text-sm">{serveStats.breakPointsSaved.toFixed(1)}%</span>
                      </div>
                      <Progress value={serveStats.breakPointsSaved} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Serve Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{serveStats.averageServeSpeed.toFixed(0)}</div>
                        <div className="text-sm text-gray-600">Avg Speed (mph)</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{serveStats.maxServeSpeed}</div>
                        <div className="text-sm text-gray-600">Max Speed (mph)</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{serveStats.acesPerMatch.toFixed(1)}</div>
                        <div className="text-sm text-gray-600">Aces/Match</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{serveStats.doubleFaultsPerMatch.toFixed(1)}</div>
                        <div className="text-sm text-gray-600">Double Faults/Match</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Return Analysis Tab */}
            <TabsContent value="return" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Return Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Break Points Converted</span>
                        <span className="text-sm">{returnStats.breakPointsConverted.toFixed(1)}%</span>
                      </div>
                      <Progress value={returnStats.breakPointsConverted} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Return Games Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Games Won', value: returnStats.returnGamesWon },
                            { name: 'Games Lost', value: returnStats.returnGamesLost }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          labelLine={false}
                          label={renderCustomizedLabel}
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Shot Analysis Tab */}
            <TabsContent value="shots" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shot Analysis</CardTitle>
                  <CardDescription>Winners vs Errors by shot type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={shotData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="winners" fill="#10b981" name="Winners" />
                      <Bar dataKey="errors" fill="#ef4444" name="Errors" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Surface Stats Tab */}
            <TabsContent value="surfaces" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Surface</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(surfaceStats).map(([surface, data]) => (
                      <div key={surface} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{surface} Court</h4>
                          <p className="text-sm text-gray-600">
                            {data.matches} matches ({data.wins}W - {data.losses}L)
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">{((data.wins / data.matches) * 100).toFixed(1)}%</div>
                          <div className="text-xs text-gray-500">Win Rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Form Tab */}
            <TabsContent value="form" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Match Results</CardTitle>
                  <CardDescription>Your most recent matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={match.result === 'Win' ? 'default' : 'destructive'}
                            className={match.result === 'Win' ? 'bg-green-600' : ''}
                          >
                            {match.result}
                          </Badge>
                          <div>
                            <h4 className="font-medium">vs {match.opponent}</h4>
                            <p className="text-sm text-gray-600">{match.score}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{new Date(match.date).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg p-4">
            {generatedImage && (
              <div className="flex flex-col items-center pt-4">
                <img
                  src={generatedImage}
                  alt="Full Statistics"
                  className="max-w-full h-auto rounded-lg border-2 border-gray-200 shadow-md"
                />
              </div>
            )}
            <DialogFooter className="mt-2 flex justify-center items-center space-x-4">
                <p className="font-bold">Share on:</p>
                <SocialMediaShareButton
                  platform="whatsapp"
                  image={generatedImage}
                />
                <SocialMediaShareButton
                  platform="x"
                  image={generatedImage}
                />
                <SocialMediaShareButton
                  platform="instagram"
                  image={generatedImage}
                />
                <SocialMediaShareButton
                  platform="wechat"
                  image={generatedImage}
                />
                <SocialMediaShareButton
                  platform="xiaohongshu"
                  image={generatedImage}
                />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default FullStats;
