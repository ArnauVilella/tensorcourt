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
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  Zap,
} from "lucide-react";
import logoImage from "../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png";
import arnauPhoto from '../assets/e4f959eb9c7282fb18efbf5a5472f0ee4737b846.jpg';

const About = () => {
  // Public Header Component
  const PublicHeader = () => (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center">
            <img
              src={logoImage}
              alt="TensorCourt"
              className="h-10 w-auto brightness-0"
            />
          </Link>
          <div className="flex space-x-4">
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About TensorCourt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe that every player deserves a highlight.
            TensorCourt revolutionizes amateur tennis by
            bringing professional-level analysis and automatic
            highlight generation to tennis clubs worldwide.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                TensorCourt is a pioneering company that
                specializes in setting up advanced camera
                systems in tennis clubs and processing videos of
                amateur tennis games to produce
                professional-quality highlights and
                comprehensive statistics. We're democratizing
                access to highlights and sports analysis
                technology that was previously only available to
                professional athletes, making it accessible to
                tennis players at every level.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>
                  Camera System Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  We install state-of-the-art camera systems in
                  tennis clubs, equipped with AI-powered
                  computer vision technology to capture every
                  moment of gameplay.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>AI Video Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Our advanced AI algorithms analyze match
                  videos in real-time, tracking player
                  movements, ball trajectories, and identifying
                  key moments automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Highlights & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  We generate personalized highlight reels and
                  comprehensive performance statistics, giving
                  every amateur player professional-level
                  insights into their game.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Meet Our Founder
          </h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={arnauPhoto}
                    alt="Arnau Vilella, Founder & CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Arnau Vilella
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                    <Badge variant="outline">
                      Founder & CEO
                    </Badge>
                    <Badge variant="outline">PhD Student</Badge>
                    <Badge variant="outline">
                      AI Researcher
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Arnau is a PhD Student at the Hong Kong
                    University of Science and Technology (HKUST)
                    with a specialization in AI and
                    optimization. His research focuses on the
                    intersection of optimization and machine
                    learning, with application in multiple
                    fields like finance or sports analytics.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    With a passion for both tennis and
                    artificial intelligence, Arnau founded
                    TensorCourt to bridge the gap between
                    professional sports technology and amateur
                    athletics. His vision is to make highlights
                    and advanced sports analysis accessible to
                    every tennis player, regardless of their
                    skill level or budget.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  Innovation in Sports Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're at the forefront of applying
                  cutting-edge AI and computer vision technology
                  to enhance the tennis experience for players
                  of all levels.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Accessibility & Democratization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe advanced sports analysis and
                  highlights shouldn't be exclusive to
                  professionals. Our mission is to make these
                  tools accessible to every tennis enthusiast.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Player Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every highlight reel and statistic we generate
                  serves one purpose: helping players understand
                  their game better and improve their
                  performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Partnership with Tennis Clubs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We work closely with tennis clubs to enhance
                  their offerings, providing them with modern
                  technology that differentiates their
                  facilities and creates new revenue streams.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Transform Your Tennis Experience?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of players who are already using
            TensorCourt to analyze their game and create amazing
            highlights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={{ pathname: "/auth"}} state={{ defaultTab: 'signup' }}>
              <Button variant="secondary" size="lg">
                Start Playing
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;