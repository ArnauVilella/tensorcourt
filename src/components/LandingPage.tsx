import React from "react";
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
  Play,
  BarChart3,
  Video,
  MapPin,
  Zap,
  Eye,
  TrendingUp,
  Trophy,
} from "lucide-react";
import logoImage from "../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">

              <img
                src={logoImage}
                alt="TensorCourt"
                className="h-10 w-auto brightness-0"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-500 hover:text-gray-900"
              >
                Features
              </a>
              <Link
                to="/about"
                className="text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                to="/clubs"
                className="text-gray-500 hover:text-gray-900"
              >
                Clubs
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link to={{ pathname: "/auth"}} state={{ defaultTab: 'signin' }}>
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to={{ pathname: "/auth"}} state={{ defaultTab: 'signup' }}>
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-8">
              AI-Powered Tennis
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block leading-tight pb-2">
                Highlights and Statistics
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform your tennis matches with real-time AI
              scoring, automatic highlight generation, and
              detailed performance analytics. Track your
              progress and relive your best moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={{ pathname: "/auth"}} state={{ defaultTab: 'signin' }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Playing
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Video className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Because Every Player Deserves a Highlight
            </h2>
            <p className="text-xl text-gray-600">
              Our AI technology revolutionizes how you play,
              analyze and enjoy your game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Live Scoring</CardTitle>
                <CardDescription>
                  Real-time AI-powered scoring with instant
                  point recognition and automatic scorekeeping.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>AI Highlights</CardTitle>
                <CardDescription>
                  Automatically generated highlight reels of
                  your best shots, aces, and rallies.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Detailed Statistics</CardTitle>
                <CardDescription>
                  Comprehensive analytics including serve speed,
                  shot placement, and performance trends.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Club Directory</CardTitle>
                <CardDescription>
                  Find AI-enabled courts near you and connect
                  with local tennis communities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Thousands of Players
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                50,000+
              </div>
              <div className="text-gray-600">
                Matches Analyzed
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                98%
              </div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">
                Active Players
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img
                  src={logoImage}
                  alt="TensorCourt Logo"
                  className="h-14 w-auto mr-3"
                />
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing tennis with AI-powered analysis
                and real-time scoring.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TensorCourt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;