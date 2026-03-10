import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  User,
  Calendar,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Clock,
  Zap,
  Edit3,
  MapPin,
  Mail,
  Phone,
  Crown,
} from "lucide-react";
import Header from "./Header";

const Profile = ({ user, onLogout }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user || !user.username) return;
      try {
        const response = await fetch(`/api/profile-stats?username=${user.username}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error("Failed to fetch profile stats");
        }
      } catch (error) {
        console.error("Error fetching profile stats:", error);
      }
    };

    fetchStats();
  }, [user]);

  // Mock detailed user data
  const userProfile = {
    ...user,
    email: "admin@tensorcourt.com",
    phone: "+852 6142 8012",
    location: "Sai Kung, HK",
    memberSince: "January 2023",
    preferredHand: "Right-handed",
    playingStyle: "All-court player",
    favoriteShot: "Backhand slice",
    favoriteSurface: "Hard",
    biography:
      "Passionate tennis player with 8 years of experience. Love playing both singles and doubles. Currently working on improving my serve speed and net game.",
  };

  const recentAchievements = [
    {
      id: 1,
      title: "Monthly Winner",
      description: "Won the most matches in July 2025",
      date: "2025-07-31",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Achieved 120+ mph serve speed",
      date: "2025-07-28",
      icon: Zap,
      color: "text-blue-600",
    },
    {
      id: 3,
      title: "Consistency King",
      description: "Won 5 matches in a row",
      date: "2025-07-25",
      icon: Target,
      color: "text-green-600",
    },
  ];

  const favoriteClubs = [
    { name: "City Tennis Center", matches: 18, winRate: 72 },
    { name: "Valley Sports Club", matches: 12, winRate: 67 },
    { name: "Elite Racquet Club", matches: 8, winRate: 75 },
  ];

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage
                      src={userProfile.profilePicture}
                      alt={userProfile.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold mb-2">
                    {userProfile.name}
                  </h1>
                  <Badge variant="outline" className="mb-4">
                    {userProfile.membershipStatus}
                  </Badge>
                  <p className="text-gray-600 mb-4">
                    {userProfile.biography}
                  </p>
                  <div className="space-y-20">
                    <Link to="/settings">
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                    <Link to="/manage-plan">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Crown className="w-4 h-4 mr-2" />
                        Manage Plan
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {userProfile.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {userProfile.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    {userProfile.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    Member since {userProfile.memberSince}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Playing Style */}
            <Card>
              <CardHeader>
                <CardTitle>Playing Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Preferred Hand
                  </label>
                  <p className="text-sm text-gray-600">
                    {userProfile.preferredHand}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Playing Style
                  </label>
                  <p className="text-sm text-gray-600">
                    {userProfile.playingStyle}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Favorite Shot
                  </label>
                  <p className="text-sm text-gray-600">
                    {userProfile.favoriteShot}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Favourite Surface
                  </label>
                  <p className="text-sm text-gray-600">
                    {userProfile.favoriteSurface}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">
                  Statistics
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="clubs">
                  Favorite Clubs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-6">
                {/* Overall Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Career Statistics</CardTitle>
                    <CardDescription>
                      Your tennis performance overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {stats.totalMatches}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Matches
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {stats.wins}
                        </div>
                        <div className="text-sm text-gray-600">
                          Wins
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {stats.losses}
                        </div>
                        <div className="text-sm text-gray-600">
                          Losses
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {stats.winRate}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Win Rate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">
                              First Serve %
                            </span>
                            <span className="text-sm">
                              {stats.firstServePercentage}%
                            </span>
                          </div>
                          <Progress
                            value={
                              stats.firstServePercentage
                            }
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">
                              Break Points Saved
                            </span>
                            <span className="text-sm">
                              {stats.breakPointsSaved}%
                            </span>
                          </div>
                          <Progress
                            value={stats.breakPointsSaved}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Avg Serve Speed
                          </span>
                          <span className="text-sm font-bold">
                            {stats.averageServeSpeed} mph
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Avg Volley Speed
                          </span>
                          <span className="text-sm font-bold">
                            {stats.averageVolleySpeed} mph
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Aces per Match
                          </span>
                          <span className="text-sm font-bold">
                            {stats.acesPerMatch}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Longest Rally
                          </span>
                          <span className="text-sm font-bold">
                            {stats.longestRally} shots
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="achievements"
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                    <CardDescription>
                      Your latest tennis milestones
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAchievements.map((achievement) => {
                        const IconComponent = achievement.icon;
                        return (
                          <div
                            key={achievement.id}
                            className="flex items-center space-x-4 p-4 border rounded-lg"
                          >
                            <div
                              className={`p-3 rounded-lg bg-gray-100 ${achievement.color}`}
                            >
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {achievement.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {achievement.description}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {achievement.date}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clubs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Tennis Clubs</CardTitle>
                    <CardDescription>
                      Clubs where you play most frequently
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.favoriteClubs.map((club, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">
                              {club.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {club.matches} matches played
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {club.winRate}%
                            </div>
                            <div className="text-xs text-gray-500">
                              Win Rate
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;