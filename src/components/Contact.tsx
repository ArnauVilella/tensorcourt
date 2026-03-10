import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
  Mail,
  Phone,
  MapPin,
  Building,
  Users,
  MessageCircle,
} from "lucide-react";
import logoImage from "../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png";

const Contact = () => {
  const [formType, setFormType] = useState("user"); // 'user' or 'club'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    clubName: "",
    clubLocation: "",
    courts: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert(
      "Thank you for your message! We'll get back to you within 24 hours.",
    );
  };

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

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team. We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get In Touch
                </CardTitle>
                <CardDescription>
                  We'd love to hear from you. Send us a message
                  and we'll respond as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contact@tensorcourt.com"
                      className="text-blue-600 hover:underline"
                    >
                      contact@tensorcourt.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+85261428012"
                      className="text-blue-600 hover:underline"
                    >
                      +852 6142 8012
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">Hong Kong</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      General Inquiries:
                    </span>
                    <Badge variant="outline">24 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Club Partnerships:
                    </span>
                    <Badge variant="outline">12 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Technical Support:
                    </span>
                    <Badge variant="outline">6 hours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Forms */}
          <div className="lg:col-span-2">
            {/* Form Type Selector */}
            <div className="flex space-x-4 mb-6">
              <Button
                variant={
                  formType === "user" ? "default" : "outline"
                }
                onClick={() => setFormType("user")}
                className="flex-1"
              >
                <Users className="w-4 h-4 mr-2" />
                For Players
              </Button>
              <Button
                variant={
                  formType === "club" ? "default" : "outline"
                }
                onClick={() => setFormType("club")}
                className="flex-1"
              >
                <Building className="w-4 h-4 mr-2" />
                For Tennis Clubs
              </Button>
            </div>

            {/* User Contact Form */}
            {formType === "user" && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Have questions about using TensorCourt? Need
                    help with your account? We're here to assist
                    you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your question or issue in detail..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Club Contact Form */}
            {formType === "club" && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Partner With TensorCourt
                  </CardTitle>
                  <CardDescription>
                    Transform your tennis club with our
                    AI-powered system. Offer your members
                    professional-level match analysis and
                    highlights while creating a new revenue
                    stream for your business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Benefits for Your Club:
                    </h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>
                        • Differentiate your club with
                        cutting-edge technology
                      </li>
                      <li>
                        • Generate additional revenue through
                        premium court bookings
                      </li>
                      <li>
                        • Attract new members with unique value
                        proposition
                      </li>
                      <li>
                        • Full technical support and maintenance
                        included
                      </li>
                      <li>
                        • Custom branding and integration with
                        your club's systems
                      </li>
                    </ul>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">
                          Contact Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="courts">
                          Number of Courts
                        </Label>
                        <Input
                          id="courts"
                          name="courts"
                          value={formData.courts}
                          onChange={handleInputChange}
                          placeholder="e.g., 8"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="clubName">
                        Club Name
                      </Label>
                      <Input
                        id="clubName"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="clubLocation">
                        Club Location
                      </Label>
                      <Input
                        id="clubLocation"
                        name="clubLocation"
                        value={formData.clubLocation}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">
                        Tell us about your club
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your tennis club, current facilities, member base, and what you hope to achieve with TensorCourt..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Request Partnership Information
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;