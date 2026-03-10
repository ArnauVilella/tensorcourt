import React, { useState } from "react";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Eye,
  Camera,
  Save,
  ArrowLeft,
} from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";

const Settings = ({ user, onLogout }) => {
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: "admin@tensorcourt.com",
    phone: "+852 6142 8012",
    location: "Sai Kung, HK",
    biography:
      "Passionate tennis player with 8 years of experience. Love playing both singles and doubles.",
    preferredHand: "Right-handed",
    playingStyle: "All-court player",
    favoriteShot: "Backhand slice",
    favoriteSurface: "Hard",
  });

  const [notificationSettings, setNotificationSettings] =
    useState({
      emailMatches: true,
      emailHighlights: true,
      emailWeeklyReport: false,
      pushMatches: true,
      pushAchievements: true,
      pushFriendRequests: true,
      smsReminders: false,
    });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showStats: true,
    showMatchHistory: true,
    showAchievements: true,
    allowFriendRequests: true,
  });

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacySettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    console.log("Saving profile:", profileData);
    alert("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notificationSettings);
    alert("Notification preferences updated!");
  };

  const handleSavePrivacy = () => {
    console.log("Saving privacy:", privacySettings);
    alert("Privacy settings updated!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/profile">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and settings
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and tennis
                  preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={user?.profilePicture}
                      alt={user?.name}
                    />
                    <AvatarFallback className="text-xl">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, GIF or PNG. 1MB max.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        handleProfileChange(
                          "name",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        handleProfileChange(
                          "email",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        handleProfileChange(
                          "phone",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) =>
                        handleProfileChange(
                          "location",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                {/* Biography */}
                <div className="space-y-2">
                  <Label htmlFor="biography">Biography</Label>
                  <Textarea
                    id="biography"
                    placeholder="Tell us about your tennis journey..."
                    value={profileData.biography}
                    onChange={(e) =>
                      handleProfileChange(
                        "biography",
                        e.target.value,
                      )
                    }
                    rows={3}
                  />
                </div>

                {/* Tennis Preferences */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredHand">
                      Preferred Hand
                    </Label>
                    <Select
                      value={profileData.preferredHand}
                      onValueChange={(value) =>
                        handleProfileChange(
                          "preferredHand",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Right-handed">
                          Right-handed
                        </SelectItem>
                        <SelectItem value="Left-handed">
                          Left-handed
                        </SelectItem>
                        <SelectItem value="Ambidextrous">
                          Ambidextrous
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="playingStyle">
                      Playing Style
                    </Label>
                    <Select
                      value={profileData.playingStyle}
                      onValueChange={(value) =>
                        handleProfileChange(
                          "playingStyle",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All-court player">
                          All-court player
                        </SelectItem>
                        <SelectItem value="Baseline player">
                          Baseline player
                        </SelectItem>
                        <SelectItem value="Serve and volley">
                          Serve and volley
                        </SelectItem>
                        <SelectItem value="Aggressive baseliner">
                          Aggressive baseliner
                        </SelectItem>
                        <SelectItem value="Defensive specialist">
                          Defensive specialist
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favoriteShot">
                      Favorite Shot
                    </Label>
                    <Select
                      value={profileData.favoriteShot}
                      onValueChange={(value) =>
                        handleProfileChange(
                          "favoriteShot",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Forehand">
                          Forehand
                        </SelectItem>
                        <SelectItem value="Backhand">
                          Backhand
                        </SelectItem>
                        <SelectItem value="Backhand slice">
                          Backhand slice
                        </SelectItem>
                        <SelectItem value="Serve">
                          Serve
                        </SelectItem>
                        <SelectItem value="Volley">
                          Volley
                        </SelectItem>
                        <SelectItem value="Drop shot">
                          Drop shot
                        </SelectItem>
                        <SelectItem value="Lob">Lob</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favoriteSurface">
                      Favourite Surface
                    </Label>
                    <Select
                      value={profileData.favoriteSurface}
                      onValueChange={(value) =>
                        handleProfileChange(
                          "favoriteSurface",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hard">
                          Hard
                        </SelectItem>
                        <SelectItem value="Clay">
                          Clay
                        </SelectItem>
                        <SelectItem value="Grass">
                          Grass
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent
            value="notifications"
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose which emails you'd like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>Match Results</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Get notified when your matches are
                      completed
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailMatches}
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "emailMatches",
                        checked,
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>AI Highlights</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Receive your AI-generated highlight reels
                    </p>
                  </div>
                  <Switch
                    checked={
                      notificationSettings.emailHighlights
                    }
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "emailHighlights",
                        checked,
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>Weekly Report</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Weekly summary of your tennis activities
                    </p>
                  </div>
                  <Switch
                    checked={
                      notificationSettings.emailWeeklyReport
                    }
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "emailWeeklyReport",
                        checked,
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage your mobile app notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-gray-500" />
                      <span>Match Updates</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Real-time match scoring and updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushMatches}
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "pushMatches",
                        checked,
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-gray-500" />
                      <span>Achievements</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      When you unlock new achievements
                    </p>
                  </div>
                  <Switch
                    checked={
                      notificationSettings.pushAchievements
                    }
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "pushAchievements",
                        checked,
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="w-4 h-4 text-gray-500" />
                      <span>Friend Requests</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      When someone wants to connect with you
                    </p>
                  </div>
                  <Switch
                    checked={
                      notificationSettings.pushFriendRequests
                    }
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "pushFriendRequests",
                        checked,
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>
                  Text message notifications for important
                  updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span>Match Reminders</span>
                    <p className="text-sm text-gray-500">
                      SMS reminders for upcoming matches
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsReminders}
                    onCheckedChange={(checked) =>
                      handleNotificationChange(
                        "smsReminders",
                        checked,
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSaveNotifications}>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>
                  Control who can see your profile and
                  information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) =>
                      handlePrivacyChange(
                        "profileVisibility",
                        value,
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        Public - Everyone can see your profile
                      </SelectItem>
                      <SelectItem value="friends">
                        Friends Only - Only your tennis
                        connections
                      </SelectItem>
                      <SelectItem value="private">
                        Private - Only you can see your profile
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span>Show Statistics</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Display your tennis performance stats
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showStats}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange(
                          "showStats",
                          checked,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span>Show Match History</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Allow others to see your match results
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showMatchHistory}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange(
                          "showMatchHistory",
                          checked,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span>Show Achievements</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Display your tennis achievements and
                        badges
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showAchievements}
                      onCheckedChange={(checked) =>
                        handlePrivacyChange(
                          "showAchievements",
                          checked,
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span>Allow Friend Requests</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Let other players send you connection
                        requests
                      </p>
                    </div>
                    <Switch
                      checked={
                        privacySettings.allowFriendRequests
                      }
                      onCheckedChange={(checked) =>
                        handlePrivacyChange(
                          "allowFriendRequests",
                          checked,
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>
                  Manage your data and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  Download My Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  Delete Account
                </Button>
                <p className="text-sm text-gray-500">
                  Learn more about how we handle your data in
                  our{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSavePrivacy}>
                <Save className="w-4 h-4 mr-2" />
                Save Privacy Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;