import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react';
import logoImage from '../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png';

const PrivacyPolicy = () => {
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
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: July 31, 2025
          </p>
        </div>

        {/* Privacy Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">We use industry-standard encryption to protect your personal information and match data.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Transparency</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">We clearly explain what data we collect, how we use it, and who we share it with.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Lock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Your Control</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm">You have full control over your data with options to access, modify, or delete your information.</p>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">
                  When you register for TensorCourt, we collect information such as your name, email address, and profile picture. This information is necessary to create and manage your account.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Match Data</h3>
                <p className="text-gray-600">
                  During your tennis matches, our AI system collects and processes video footage, match statistics, and performance data. This includes player movements, ball trajectories, scores, and game events.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
                <p className="text-gray-600">
                  We automatically collect information about how you use our service, including pages visited, features used, and time spent on the platform.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Provide and improve our tennis analysis services</li>
                <li>Generate AI-powered highlights and statistics</li>
                <li>Maintain and secure your account</li>
                <li>Send you important service updates and notifications</li>
                <li>Respond to your support requests and inquiries</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations and prevent misuse</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">We do not sell your personal data</h3>
                <p className="text-gray-600">
                  TensorCourt does not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Limited sharing scenarios:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>With tennis clubs where you play (for match coordination)</li>
                  <li>With other players in your matches (match statistics only)</li>
                  <li>With service providers who help us operate our platform</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In case of a business merger or acquisition</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data centers with physical access controls</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">You have the right to:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Access and review your personal information</li>
                  <li>Correct or update your account details</li>
                  <li>Delete your account and associated data</li>
                  <li>Download your match data and statistics</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request information about data sharing</li>
                </ul>
              </div>
              
              <p className="text-gray-600">
                To exercise these rights, please contact us at privacy@tensorcourt.com or through your account settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Data Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We retain your information for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Account information: Until you delete your account</li>
                <li>Match data: As selected in your account preferences</li>
                <li>Support communications: 3 years after resolution</li>
                <li>Anonymized analytics: May be retained indefinitely</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                TensorCourt operates globally and may transfer your information to countries outside your residence. We ensure appropriate safeguards are in place to protect your data during international transfers, including standard contractual clauses and adequacy decisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by email or through our service. Your continued use of TensorCourt after such changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@tensorcourt.com</p>
                <p><strong>General Contact:</strong> contact@tensorcourt.com</p>
                <p><strong>Phone:</strong> +852 6142 8012</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;