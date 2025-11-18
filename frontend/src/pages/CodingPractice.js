import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  BookOpen,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Menu,
  X,
  Home,
  LogOut,
  MessageCircle,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function CodingPractice() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Sample data
  const topics = [
    'Arrays',
    'Strings',
    'Linked Lists',
    'Trees',
    'Graphs',
    'Dynamic Programming',
    'Sorting',
    'Searching',
    'Recursion',
    'Hash Tables'
  ];

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'easy',
      topic: 'Arrays',
      description: 'Given an array of integers, return indices of two numbers that add up to a target.',
      acceptanceRate: 48.2,
      submissions: 12453,
      solved: 6001,
      timeLimit: '1000ms',
      memoryLimit: '256MB',
      source: 'LeetCode',
      tags: ['Array', 'Hash Table'],
      status: 'solved'
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'easy',
      topic: 'Linked Lists',
      description: 'Reverse a singly linked list iteratively or recursively.',
      acceptanceRate: 72.4,
      submissions: 8932,
      solved: 6465,
      timeLimit: '1000ms',
      memoryLimit: '256MB',
      source: 'LeetCode',
      tags: ['Linked List', 'Recursion'],
      status: 'attempted'
    },
    {
      id: 3,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'medium',
      topic: 'Trees',
      description: 'Return the level order traversal of a binary tree nodes values.',
      acceptanceRate: 61.8,
      submissions: 5621,
      solved: 3473,
      timeLimit: '2000ms',
      memoryLimit: '512MB',
      source: 'LeetCode',
      tags: ['Tree', 'BFS', 'Queue'],
      status: 'unsolved'
    },
    {
      id: 4,
      title: 'Longest Palindromic Substring',
      difficulty: 'medium',
      topic: 'Strings',
      description: 'Find the longest palindromic substring in a given string.',
      acceptanceRate: 32.7,
      submissions: 9876,
      solved: 3229,
      timeLimit: '2000ms',
      memoryLimit: '512MB',
      source: 'LeetCode',
      tags: ['String', 'DP'],
      status: 'unsolved'
    },
    {
      id: 5,
      title: 'Merge K Sorted Lists',
      difficulty: 'hard',
      topic: 'Linked Lists',
      description: 'Merge k sorted linked lists and return it as one sorted list.',
      acceptanceRate: 49.3,
      submissions: 4321,
      solved: 2130,
      timeLimit: '3000ms',
      memoryLimit: '1GB',
      source: 'LeetCode',
      tags: ['Linked List', 'Heap', 'Divide and Conquer'],
      status: 'unsolved'
    },
    {
      id: 6,
      title: 'Climbing Stairs',
      difficulty: 'easy',
      topic: 'Dynamic Programming',
      description: 'Calculate the number of distinct ways to climb to the top of a staircase.',
      acceptanceRate: 51.2,
      submissions: 15432,
      solved: 7901,
      timeLimit: '1000ms',
      memoryLimit: '256MB',
      source: 'LeetCode',
      tags: ['DP', 'Math'],
      status: 'solved'
    },
    {
      id: 7,
      title: 'Valid Parentheses',
      difficulty: 'easy',
      topic: 'Strings',
      description: 'Determine if the input string has valid parentheses.',
      acceptanceRate: 40.1,
      submissions: 11234,
      solved: 4505,
      timeLimit: '1000ms',
      memoryLimit: '256MB',
      source: 'LeetCode',
      tags: ['String', 'Stack'],
      status: 'solved'
    },
    {
      id: 8,
      title: 'Course Schedule',
      difficulty: 'medium',
      topic: 'Graphs',
      description: 'Determine if you can finish all courses given prerequisites.',
      acceptanceRate: 45.9,
      submissions: 6789,
      solved: 3116,
      timeLimit: '2000ms',
      memoryLimit: '512MB',
      source: 'LeetCode',
      tags: ['Graph', 'DFS', 'Topological Sort'],
      status: 'attempted'
    }
  ];

  // Stats
  const stats = [
    { label: 'Problems Solved', value: 3, icon: <CheckCircle className="h-5 w-5" />, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Attempted', value: 2, icon: <Target className="h-5 w-5" />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Total Problems', value: problems.length, icon: <Code className="h-5 w-5" />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Success Rate', value: '60%', icon: <Trophy className="h-5 w-5" />, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  // Filter problems
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'all' || problem.topic === selectedTopic;
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'solved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'attempted': return <Clock className="h-5 w-5 text-orange-600" />;
      default: return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AI Assistant Button */}
      <button
        onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 transition-all z-50"
      >
        <MessageCircle className="h-6 w-6" />
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
              <p>Need help with a problem?</p>
              <p className="text-sm mt-2">Ask me for hints or explanations!</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask about a problem..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
            />
          </div>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Code className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">CSLearn</span>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
              {user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.username || 'Student'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/resources')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <BookOpen className="h-5 w-5" />
            <span>Resources</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600">
            <Code className="h-5 w-5" />
            <span>Coding Practice</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 lg:hidden flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold">CSLearn</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <button onClick={() => navigate('/dashboard')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button onClick={() => navigate('/resources')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <BookOpen className="h-5 w-5" />
                <span>Resources</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600">
                <Code className="h-5 w-5" />
                <span>Coding Practice</span>
              </button>
            </nav>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Coding Practice</h1>
            <div className="w-6 lg:hidden"></div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className={`${stat.bg} rounded-xl p-4`}>
                <div className={`${stat.color} mb-2`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              {/* Topic Filter */}
              <div>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                >
                  <option value="all">All Topics</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.map(problem => (
              <div key={problem.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="mt-1">
                      {getStatusIcon(problem.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{problem.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{problem.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {problem.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Acceptance: {problem.acceptanceRate}%</span>
                        <span>•</span>
                        <span>{problem.submissions} submissions</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {problem.timeLimit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 whitespace-nowrap">
                    <span>Solve</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No problems found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}