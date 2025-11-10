import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, FileText, TrendingUp, Search, Menu, X, MessageCircle } from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* AI Assistant Button - Fixed position */}
      <button
        onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-50 flex items-center justify-center group"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Assistant
        </span>
      </button>

      {/* AI Assistant Chat Window */}
      {aiAssistantOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col">
          <div className="bg-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button onClick={() => setAiAssistantOpen(false)} className="hover:bg-indigo-700 p-1 rounded">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Hello! I'm your AI learning assistant.</p>
              <p className="text-sm mt-2">How can I help you today?</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>
        </div>
      )}
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CSLearn</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600">How It Works</a>
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Log In</Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Get Started
              </Link>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#features" className="block text-gray-700">Features</a>
              <a href="#how-it-works" className="block text-gray-700">How It Works</a>
              <Link to="/login" className="block text-indigo-600 font-medium">Log In</Link>
              <Link to="/register" className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center py-40 md:py-56"
        style={{
          backgroundImage: "url('/images/elearning-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master CS<br />
            <span className="text-indigo-400">One Topic at a Time</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Curated resources, coding practice, and progress tracking all in one place.
          </p>
          <Link to="/register" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700 shadow-lg">
            Start Learning
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Excel
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BookOpen className="h-10 w-10 text-indigo-600" />}
              title="Curated Resources"
              description="Access notes, past papers, and coding problems organized by topic"
            />
            <FeatureCard 
              icon={<Code className="h-10 w-10 text-indigo-600" />}
              title="Coding Practice"
              description="Solve problems from LeetCode, HackerRank, and custom challenges"
            />
            <FeatureCard 
              icon={<TrendingUp className="h-10 w-10 text-indigo-600" />}
              title="Progress Tracking"
              description="Monitor your completion percentage for each topic"
            />
            <FeatureCard 
              icon={<Search className="h-10 w-10 text-indigo-600" />}
              title="Smart Search"
              description="Find exactly what you need with powerful filters"
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Effective Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              title="Choose Your Unit"
              description="Select from units like Data Structures, Algorithms, or Database Systems"
            />
            <StepCard 
              number="2"
              title="Pick a Topic"
              description="Drill down into specific topics like Pointers, Sorting, or SQL Queries"
            />
            <StepCard 
              number="3"
              title="Learn & Practice"
              description="Access resources, solve problems, and watch your progress grow"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Code className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">CSLearn</span>
              </div>
              <p className="text-gray-400">
                Your companion for mastering computer science fundamentals.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CSLearn.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}