import React, { useState } from "react";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Check,
  Crown,
  CreditCard,
  ArrowLeft,
  Star,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Video,
  Users,
  Calendar,
} from "lucide-react";
import Header from "./Header";

const ManagePlan = ({ user, onLogout, onPlanChange }) => {
  const [currentPlan, setCurrentPlan] = useState(user.plan || "free"); // free or premium
  const [isPaymentModalOpen, setIsPaymentModalOpen] =
    useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "US",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpgradeToPremium = () => {
    setIsPaymentModalOpen(true);
  };

    const handleDowngradeToFree = async () => {
    try {
      const response = await fetch('/api/user/plan', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          plan: 'free',
        }),
      });

      if (response.ok) {
        setCurrentPlan("free");
        onPlanChange("free");
        alert("You have successfully downgraded to the Free plan.");
      } else {
        alert("Failed to downgrade. Please try again.");
      }
    } catch (error) {
      console.error('Error updating plan:', error);
      alert("Failed to downgrade. Please try again.");
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

        try {
        const response = await fetch('/api/user/plan', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                plan: 'premium',
            }),
        });

        if (response.ok) {
            setCurrentPlan("premium");
            onPlanChange("premium");
            alert("Payment successful! Welcome to TensorCourt Premium!");
            onPlanChange('premium');
        } else {
            alert("Payment failed. Please try again.");
        }
    } catch (error) {
        console.error('Error updating plan:', error);
        alert("Payment failed. Please try again.");
    } finally {
        setIsProcessing(false);
        setIsPaymentModalOpen(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold">
            Manage Your Plan
          </h1>
          <p className="text-gray-600">
            Choose the perfect plan for your tennis journey
          </p>
        </div>

        {/* Current Plan Status */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-lg ${currentPlan === "premium" ? "bg-gradient-to-r from-purple-100 to-blue-100" : "bg-gray-100"}`}
                >
                  {currentPlan === "premium" ? (
                    <Crown className="w-8 h-8 text-purple-600" />
                  ) : (
                    <Users className="w-8 h-8 text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Current Plan:{" "}
                    {currentPlan === "premium"
                      ? "Premium"
                      : "Free"}
                  </h3>
                  <p className="text-gray-600">
                    {currentPlan === "premium"
                      ? "Unlimited matches included for $8/month"
                      : "Pay-per-match pricing set by each club"}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  currentPlan === "premium"
                    ? "default"
                    : "secondary"
                }
                className="text-sm"
              >
                {currentPlan === "premium"
                  ? "Premium Member"
                  : "Free Member"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Free Plan */}
          <Card
            className={`relative ${currentPlan === "free" ? "ring-2 ring-blue-500" : ""}`}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-lg w-fit">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle className="text-2xl">
                Free Plan
              </CardTitle>
              <CardDescription className="text-lg">
                Pay per match at each club
              </CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold text-gray-900">
                  $0
                </div>
                <div className="text-sm text-gray-600">
                  per month
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  + individual match fees set by clubs
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentPlan === "free" ? (
                <Button
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDowngradeToFree}
                >
                  Downgrade to Free
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card
            className={`relative ${currentPlan === "premium" ? "ring-2 ring-purple-500" : ""}`}
          >
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
              <CardTitle className="text-2xl">
                Premium Plan
              </CardTitle>
              <CardDescription className="text-lg">
                Unlimited matches included
              </CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  $8
                </div>
                <div className="text-sm text-gray-600">
                  per month
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Unlimited matches included
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentPlan === "premium" ? (
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <Dialog
                  open={isPaymentModalOpen}
                  onOpenChange={setIsPaymentModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={handleUpgradeToPremium}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        Upgrade to Premium
                      </DialogTitle>
                      <DialogDescription>
                        Complete your payment to unlock
                        unlimited matches and premium features.
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      onSubmit={handlePaymentSubmit}
                      className="space-y-4"
                    >
                      {/* Plan Summary */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <span>TensorCourt Premium</span>
                            <span className="font-bold">
                              $8.00/month
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Unlimited matches & premium features
                          </div>
                        </CardContent>
                      </Card>

                      {/* Payment Form */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentData.cardNumber}
                            onChange={(e) =>
                              handlePaymentChange(
                                "cardNumber",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">
                              Expiry Date
                            </Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentData.expiryDate}
                              onChange={(e) =>
                                handlePaymentChange(
                                  "expiryDate",
                                  e.target.value,
                                )
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentData.cvv}
                              onChange={(e) =>
                                handlePaymentChange(
                                  "cvv",
                                  e.target.value,
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardholderName">
                            Cardholder Name
                          </Label>
                          <Input
                            id="cardholderName"
                            placeholder="John Doe"
                            value={paymentData.cardholderName}
                            onChange={(e) =>
                              handlePaymentChange(
                                "cardholderName",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>

                        <Separator />

                        <div>
                          <Label htmlFor="billingAddress">
                            Billing Address
                          </Label>
                          <Input
                            id="billingAddress"
                            placeholder="123 Main Street"
                            value={paymentData.billingAddress}
                            onChange={(e) =>
                              handlePaymentChange(
                                "billingAddress",
                                e.target.value,
                              )
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="San Francisco"
                              value={paymentData.city}
                              onChange={(e) =>
                                handlePaymentChange(
                                  "city",
                                  e.target.value,
                                )
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">
                              ZIP Code
                            </Label>
                            <Input
                              id="zipCode"
                              placeholder="94105"
                              value={paymentData.zipCode}
                              onChange={(e) =>
                                handlePaymentChange(
                                  "zipCode",
                                  e.target.value,
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="country">
                            Country
                          </Label>
                          <Select
                            value={paymentData.country}
                            onValueChange={(value) =>
                              handlePaymentChange(
                                "country",
                                value,
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">
                                United States
                              </SelectItem>
                              <SelectItem value="CA">
                                Canada
                              </SelectItem>
                              <SelectItem value="GB">
                                United Kingdom
                              </SelectItem>
                              <SelectItem value="AU">
                                Australia
                              </SelectItem>
                              <SelectItem value="DE">
                                Germany
                              </SelectItem>
                              <SelectItem value="FR">
                                France
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() =>
                            setIsPaymentModalOpen(false)
                          }
                          disabled={isProcessing}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4 mr-2" />
                              Pay $8.00
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="text-xs text-gray-500 text-center">
                        <Shield className="w-4 h-4 inline mr-1" />
                        Your payment information is secure and
                        encrypted
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
            <CardDescription>
              See what's included with each plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">
                      Feature
                    </th>
                    <th className="text-center py-3 px-4">
                      Free
                    </th>
                    <th className="text-center py-3 px-4">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
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
                    <td className="text-center py-3 px-4">
                      Pay per match
                    </td>
                    <td className="text-center py-3 px-4">
                      Unlimited matches
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>


      </main>
    </div>
  );
};

export default ManagePlan;