import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import html2canvas from "html2canvas";
import ShareableMatchStats from './ShareableMatchStats';
import {
  ArrowLeft,
  Play,
  Download,
  Share2,
  Trophy,
  Clock,
  MapPin,
} from 'lucide-react';
import Header from './Header';
import tennisCourtImage from '../assets/c36b8e44bfbc8a1a461425a15ac4957eabe6104e.png';
import tennisServeImage from '../assets/571a1758277b6bbdfde66fb5fdfca23a72cc72d4.png';
import tennisBackhandImage from '../assets/8567ffb7631d96a4ea7b72395cb887ae8ead374b.png';
import tennisRallyImage from '../assets/f878ffcd7460e093a8669c4a681313c2b3f024cf.png';
import tennisDropShotImage from '../assets/266c4c9b33dae5f8c1468ae7608f8cc18b2b8651.png';
import highlightsVideo from '../assets/highlights.mp4';
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

const MatchDetails = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const shareableRef = React.useRef(null);

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
    const fetchMatch = async () => {
      try {
                const response = await fetch(`/api/matches/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMatch(data);
        } else {
          console.error('Failed to fetch match');
        }
      } catch (error) {
        console.error('Error fetching match:', error);
      }
    };

    fetchMatch();
  }, [id]);

  if (!match) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const highlights = [
    {
      id: 1,
      title: 'Match-Winning Ace',
      timestamp: '00:12',
      description: 'Clutch ace to secure the second set and match victory',
      thumbnail: tennisServeImage
    },
    {
      id: 2,
      title: 'Amazing 18-Shot Rally',
      timestamp: '01:48',
      description: 'Incredible baseline exchange showcasing both players\' skills',
      thumbnail: tennisRallyImage
    },
    {
      id: 3,
      title: 'Perfect Backhand Winner',
      timestamp: '00:15',
      description: 'Down-the-line backhand winner to break serve',
      thumbnail: tennisBackhandImage
    },
    {
      id: 4,
      title: 'Stunning Drop Shot',
      timestamp: '00:10',
      description: 'Perfectly executed drop shot catches opponent off guard',
      thumbnail: tennisDropShotImage
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>

        {/* Match Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center mb-2">
                  <Badge 
                    variant={match.result === 'Win' ? 'default' : 'secondary'}
                    className="mr-4"
                  >
                    {match.result}
                  </Badge>
                  <h1 className="text-3xl font-bold">{user.name} vs {match.opponent}</h1>
                </div>
                <p className="text-2xl text-gray-600 mb-2">{match.score}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(match.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {match.club}
                  </span>
                  <span>Duration: {formatDuration(parseInt(match.duration))}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleShareClick} disabled={isLoading}>
                  {isLoading ? 'Generating...' : <><Share2 className="w-4 h-4 mr-2" /> Share</>}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Full Game</DropdownMenuItem>
                    <DropdownMenuItem>Highlights</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="replay">Replay</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      <video
                        src={highlightsVideo}
                        controls
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Match Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Surface:</span>
                      <span>{match.surface}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Games:</span>
                      <span>{match.gamesWon + match.gamesLost}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aces</span>
                        <span>{match.aces} - {match.opponentAces}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <Progress value={match.aces + match.opponentAces > 0 ? (match.aces / (match.aces + match.opponentAces)) * 100 : 0} className="h-2" />
                        <Progress value={match.aces + match.opponentAces > 0 ? (match.opponentAces / (match.aces + match.opponentAces)) * 100 : 0} className="h-2 transform -scale-x-100" />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Winners</span>
                        <span>{match.winners} - {match.opponentWinners}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <Progress value={match.winners + match.opponentWinners > 0 ? (match.winners / (match.winners + match.opponentWinners)) * 100 : 0} className="h-2" />
                        <Progress value={match.winners + match.opponentWinners > 0 ? (match.opponentWinners / (match.winners + match.opponentWinners)) * 100 : 0} className="h-2 transform -scale-x-100" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Unforced Errors</span>
                        <span>{match.unforcedErrors} - {match.opponentUnforcedErrors}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <Progress value={match.unforcedErrors + match.opponentUnforcedErrors > 0 ? (match.unforcedErrors / (match.unforcedErrors + match.opponentUnforcedErrors)) * 100 : 0} className="h-2" />
                        <Progress value={match.unforcedErrors + match.opponentUnforcedErrors > 0 ? (match.opponentUnforcedErrors / (match.unforcedErrors + match.opponentUnforcedErrors)) * 100 : 0} className="h-2 transform -scale-x-100" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Break Games Won</span>
                        <span>{match.breakGamesWon} - {match.opponentBreakGamesWon}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <Progress value={match.breakGamesWon + match.opponentBreakGamesWon > 0 ? (match.breakGamesWon / (match.breakGamesWon + match.opponentBreakGamesWon)) * 100 : 0} className="h-2" />
                        <Progress value={match.breakGamesWon + match.opponentBreakGamesWon > 0 ? (match.opponentBreakGamesWon / (match.breakGamesWon + match.opponentBreakGamesWon)) * 100 : 0} className="h-2 transform -scale-x-100" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-green-600" />
                    Match Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{match.aces}</div>
                      <div className="text-sm text-gray-600">Aces</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{match.doubleFaults}</div>
                      <div className="text-sm text-gray-600">Double Faults</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>First Serve %</span>
                        <span>{Math.round(match.firstServePercentage * 100)}%</span>
                      </div>
                      <Progress value={match.firstServePercentage * 100} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold">{match.winners}</div>
                      <div className="text-xs text-gray-600">Winners</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{match.unforcedErrors}</div>
                      <div className="text-xs text-gray-600">UE</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{match.averageServeSpeed}</div>
                      <div className="text-xs text-gray-600">Avg Serve</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                        <div className="text-lg font-bold">{match.breakPointsWon}/{match.breakPointsTotal}</div>
                        <div className="text-xs text-gray-600">Break Points Won</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold">{match.breakGamesWon}/{match.breakGamesTotal}</div>
                        <div className="text-xs text-gray-600">Break Games Won</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          <TabsContent value="replay">
            <div className="space-y-6">
              {/* Match Replay */}
              <Card>
                <CardHeader>
                  <CardTitle>Match Replay</CardTitle>
                  <CardDescription>Watch the complete match recording</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img 
                      src={tennisCourtImage}
                      alt="Match replay"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                        <Play className="w-8 h-8" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Highlights */}
              <div>
                <h3 className="text-lg font-medium mb-4">Key Moments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highlights.map((highlight) => (
                    <Card key={highlight.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative">
                        <img 
                          src={highlight.thumbnail}
                          alt={highlight.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                          {highlight.timestamp}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{highlight.title}</CardTitle>
                        <CardDescription>{highlight.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Set-by-Set Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {match.sets && JSON.parse(match.sets).map((set) => (
                    <div key={set.set}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Set {set.set}</h3>
                        <div className="text-2xl font-bold">
                          {set.player1} - {set.player2}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                        {set.games.map((game, index) => (
                          <div 
                            key={index}
                            className="bg-gray-100 p-2 rounded text-center text-sm"
                          >
                            <div className="font-medium">Game {index + 1}</div>
                            <div className="text-xs text-gray-600">{game}</div>
                          </div>
                        ))}
                      </div>
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
                  alt="Match Statistics"
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

        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <ShareableMatchStats ref={shareableRef} match={match} user={user} />
        </div>
      </main>
    </div>
  );
};

export default MatchDetails;