import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import logoImage from '../assets/dc2b5e7b8fdf8e9caeeff8fe8a713087a95d6e3a.png';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "How do I start using TensorCourt?",
          answer: "Simply sign up for a free account, find an AI-enabled tennis court in our directory, and start your first match. Free users pay AI analysis fees to clubs per match, while Premium users ($8/month) get unlimited matches at all participating courts."
        },
        {
          question: "What do I need to play at an AI-enabled court?",
          answer: "You just need a TensorCourt account and access to an AI-enabled court. Each court has a unique reference code and password displayed on the scoreboard. Enter these in our app to connect and start recording your match."
        },
        {
          question: "How do I find AI-enabled courts near me?",
          answer: "Use our Clubs Directory to search for tennis clubs with AI-enabled courts in your area. You can search by location, club name, or filter by specific amenities and court types."
        }
      ]
    },
    {
      title: "AI Features & Technology",
      questions: [
        {
          question: "How does the AI analyze my tennis matches?",
          answer: "Our AI system uses computer vision to track player movements, ball trajectory, and court positioning in real-time. It automatically generates statistics, identifies key moments for highlights, and provides detailed performance analytics."
        },
        {
          question: "What kind of statistics does TensorCourt provide?",
          answer: "We track comprehensive statistics including aces, double faults, winners, unforced errors, first serve percentage, break points, rally length, shot placement heatmaps, advanced analytics, and historical trends. All features are available to every user."
        },
        {
          question: "How accurate is the AI scoring system?",
          answer: "Our AI scoring system is highly accurate, using advanced computer vision algorithms trained specifically for tennis. The system continuously improves through machine learning and can handle various court conditions and lighting."
        },
        {
          question: "What are AI-generated highlights?",
          answer: "Our AI automatically identifies the most exciting moments from your match - great shots, important points, match-changing moments - and creates short highlight videos. This feature is available to all users."
        }
      ]
    },
    {
      title: "Matches & Recording",
      questions: [
        {
          question: "Can I play singles and doubles matches?",
          answer: "Yes, our system supports both singles and doubles matches. You can add up to 4 players for doubles matches, and the AI will track all players simultaneously."
        },
        {
          question: "What happens if I lose connection during a match?",
          answer: "The system continues recording locally and will sync your data once connection is restored. Your match statistics and video are preserved, ensuring no data loss."
        },
        {
          question: "How long are matches stored?",
          answer: "All users have unlimited match history storage with full statistics and video highlights accessible anytime. The difference is that Premium users ($8/month) don't pay AI analysis fees to clubs."
        },
        {
          question: "Can I export my match data?",
          answer: "All users can export match statistics, performance data, and video highlights in various formats for personal analysis or sharing with coaches."
        }
      ]
    },
    {
      title: "Plans & Pricing",
      questions: [
        {
          question: "What's included in the free plan?",
          answer: "The free plan includes access to all TensorCourt features, but you'll pay an AI analysis fee directly to each tennis club when you play. This fee is separate from court usage fees and varies by club."
        },
        {
          question: "What additional features do I get with Premium?",
          answer: "Premium costs $8/month and gives you unlimited matches at any AI-enabled court without paying AI analysis fees. You get the same great features as free users - AI analysis, statistics, highlights, and match history - but with unlimited access across all participating clubs."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your Premium subscription at any time. You'll continue to have unlimited matches until the end of your billing period, then you'll return to paying AI analysis fees directly to clubs."
        },
        {
          question: "How much do AI analysis fees cost at clubs?",
          answer: "AI analysis fees vary by tennis club and typically range from $5-15 per match. Each club sets their own pricing for AI analysis services. Court usage fees are separate and managed directly by the clubs. Premium users ($8/month) avoid AI analysis fees entirely."
        }
      ]
    },
    {
      title: "Technical Support",
      questions: [
        {
          question: "What devices are supported?",
          answer: "TensorCourt works on all modern web browsers on desktop, tablet, and mobile devices. For the best experience, we recommend using Chrome, Safari, Firefox, or Edge."
        },
        {
          question: "What if the court camera isn't working?",
          answer: "If you encounter camera issues, first check that you've entered the correct court reference and password. If problems persist, contact the tennis club staff or our support team for assistance."
        },
        {
          question: "How do I get help if I have issues?",
          answer: "All users have access to customer support through our help center. You can contact support for assistance with any issues you encounter while using TensorCourt."
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we take data security seriously. All match data and personal information are encrypted and stored securely. We comply with international data protection standards and never share your data without permission."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about TensorCourt
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <Card key={questionIndex} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          {openIndex === `${categoryIndex}-${questionIndex}` ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      {openIndex === `${categoryIndex}-${questionIndex}` && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-white rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link to="/contact">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FAQ;