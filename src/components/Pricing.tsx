import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check, ArrowLeft, Crown, Users, Video, Zap, BarChart3, Calendar, Star } from 'lucide-react';
import logoImage from '../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png';

const Pricing = () => {
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All plans include the same powerful AI tennis analysis features. The only difference is how you pay for matches.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-lg w-fit">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <CardDescription className="text-lg">
                Pay per match at each club
              </CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold text-gray-900">$0</div>
                <div className="text-sm text-gray-600">per month</div>
                <div className="text-xs text-gray-500 mt-2">
                  + individual match fees set by clubs
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">All features included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Match Recording & Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">AI-Generated Highlights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Performance Statistics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Court Booking Access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Match History & Analytics</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Match Pricing:</h5>
                  <p className="text-blue-800 text-sm">
                    Each tennis club sets their own match fees. Typical range: $5-15 per match.
                  </p>
                </div>
              </div>

              <Link to="/auth" className="block">
                <Button variant="outline" className="w-full mt-6">
                  Start Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative ring-2 ring-purple-500">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg w-fit">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription className="text-lg">
                Unlimited matches included
              </CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  $8
                </div>
                <div className="text-sm text-gray-600">per month</div>
                <div className="text-xs text-gray-500 mt-2">
                  Unlimited matches included
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">All features included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Match Recording & Analysis</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">AI-Generated Highlights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Performance Statistics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Court Booking Access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Match History & Analytics</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-900 mb-2">Match Pricing:</h5>
                  <p className="text-purple-800 text-sm">
                    Play unlimited matches at any TensorCourt-enabled club with no additional fees.
                  </p>
                </div>
              </div>

              <Link to="/auth" className="block">
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Crown className="w-4 h-4 mr-2" />
                  Start Premium
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>
              Both plans include the same powerful AI tennis analysis features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Free</th>
                    <th className="text-center py-3 px-4">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center">
                      <Video className="w-4 h-4 mr-2 text-gray-500" />
                      Match Recording & Analysis
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-gray-500" />
                      AI-Generated Highlights
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-gray-500" />
                      Performance Statistics
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      Court Booking Access
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 flex items-center">
                      <Crown className="w-4 h-4 mr-2 text-gray-500" />
                      Match Pricing
                    </td>
                    <td className="text-center py-3 px-4 text-sm text-gray-600">
                      Pay per match
                    </td>
                    <td className="text-center py-3 px-4 text-sm font-medium text-purple-600">
                      Unlimited matches
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Why Choose Premium?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              If you play 2+ matches per month, Premium saves you money while giving you unlimited access to all TensorCourt-enabled courts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">$8/month</div>
                <div className="text-sm text-blue-100">Unlimited matches</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">vs.</div>
                <div className="text-sm text-blue-100">Typical cost comparison</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">$20+/month</div>
                <div className="text-sm text-blue-100">2 matches at $10 each</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's the difference between Free and Premium?</h3>
              <p className="text-gray-600">Both plans include identical AI tennis analysis features. The only difference is match pricing: Free users pay per match (set by each club), while Premium users get unlimited matches for $8/month.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How much do clubs typically charge per match?</h3>
              <p className="text-gray-600">Match fees vary by club but typically range from $5-15 per match. Premium becomes cost-effective if you play 2+ matches per month.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial for Premium?</h3>
              <p className="text-gray-600">Yes, we offer a 14-day free trial for the Premium plan. No credit card required to start.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What happens to my data if I cancel Premium?</h3>
              <p className="text-gray-600">All your match history, statistics, and AI-generated highlights remain accessible. You simply switch to pay-per-match pricing for future games.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;