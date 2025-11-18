import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Code,
  BookOpen,
  FileText,
  Video,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  Tag,
  Menu,
  X,
  Home,
  LogOut,
  MessageCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function SmartSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    difficulty: [],
    type: [],
    unit: [],
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // All searchable content
  const allContent = [
    // Resources
    {
      id: 1,
      type: 'resource',
      category: 'lecture',
      title: 'Introduction to Arrays and Lists',
      description: 'Comprehensive guide covering arrays, dynamic arrays, and linked lists with practical examples and time complexity analysis.',
      unit: 'Data Structures',
      topic: 'Arrays',
      author: 'Dr. Sarah Johnson',
      rating: 4.8,
      views: 1234,
      tags: ['Arrays', 'Lists', 'Fundamentals', 'Big O'],
      difficulty: 'easy',
      uploadDate: '2025-01-15'
    },
    {
      id: 2,
      type: 'resource',
      category: 'video',
      title: 'Sorting Algorithms Explained',
      description: 'Visual explanation of bubble sort, merge sort, quick sort with step-by-step breakdown and complexity analysis.',
      unit: 'Algorithms',
      topic: 'Sorting',
      author: 'Prof. Michael Chen',
      rating: 4.9,
      views: 2156,
      tags: ['Sorting', 'Algorithms', 'Visualization'],
      difficulty: 'medium',
      uploadDate: '2025-01-10'
    },
    {
      id: 3,
      type: 'resource',
      category: 'paper',
      title: 'SQL Query Practice - 2024 Exam',
      description: 'Previous year examination paper with detailed solutions, common pitfalls, and optimization tips.',
      unit: 'Database Systems',
      topic: 'SQL',
      author: 'Dr. Emily Rodriguez',
      rating: 4.7,
      views: 987,
      tags: ['SQL', 'Exam', 'Practice'],
      difficulty: 'medium',
      uploadDate: '2025-01-05'
    },
    // Coding Problems
    {
      id: 4,
      type: 'problem',
      title: 'Two Sum',
      description: 'Given an array of integers, return indices of two numbers that add up to a specific target. Multiple solution approaches.',
      unit: 'Data Structures',
      topic: 'Arrays',
      difficulty: 'easy',
      acceptanceRate: 48.2,
      tags: ['Array', 'Hash Table', 'Two Pointer'],
      status: 'solved'
    },
    {
      id: 5,
      type: 'problem',
      title: 'Binary Tree Level Order Traversal',
      description: 'Return the level order traversal of binary tree nodes values using BFS approach.',
      unit: 'Data Structures',
      topic: 'Trees',
      difficulty: 'medium',
      acceptanceRate: 61.8,
      tags: ['Tree', 'BFS', 'Queue'],
      status: 'unsolved'
    },
    {
      id: 6,
      type: 'problem',
      title: 'Longest Palindromic Substring',
      description: 'Find the longest palindromic substring in a given string using dynamic programming.',
      unit: 'Algorithms',
      topic: 'Dynamic Programming',
      difficulty: 'medium',
      acceptanceRate: 32.7,
      tags: ['String', 'DP', 'Palindrome'],
      status: 'unsolved'
    },
    {
      id: 7,
      type: 'resource',
      category: 'lecture',
      title: 'Binary Trees and Traversals',
      description: 'In-depth coverage of binary trees, BSTs, and various traversal methods including inorder, preorder, and postorder.',
      unit: 'Data Structures',
      topic: 'Trees',
      author: 'Dr. Sarah Johnson',
      rating: 4.9,
      views: 1876,
      tags: ['Trees', 'BST', 'Recursion', 'Traversal'],
      difficulty: 'medium',
      uploadDate: '2025-01-12'
    },
    {
      id: 8,
      type: 'problem',
      title: 'Merge K Sorted Lists',
      description: 'Merge k sorted linked lists and return it as one sorted list using heap data structure.',
      unit: 'Data Structures',
      topic: 'Linked Lists',
      difficulty: 'hard',
      acceptanceRate: 49.3,
      tags: ['Linked List', 'Heap', 'Divide and Conquer'],
      status: 'unsolved'
    }
  ];

  // Smart search algorithm
  const performSmartSearch = () => {
    if (!searchQuery.trim() && selectedFilters.difficulty.length === 0 && selectedFilters.type.length === 0) {
      return allContent;
    }

    let results = allContent;

    // Text search with relevance scoring
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.map(item => {
        let score = 0;
        
        // Title match (highest weight)
        if (item.title.toLowerCase().includes(query)) score += 10;
        
        // Description match
        if (item.description.toLowerCase().includes(query)) score += 5;
        
        // Tags match
        if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) score += 7;
        
        // Unit/Topic match
        if (item.unit.toLowerCase().includes(query)) score += 6;
        if (item.topic && item.topic.toLowerCase().includes(query)) score += 6;
        
        return { ...item, relevanceScore: score };
      })
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    // Apply filters
    if (selectedFilters.difficulty.length > 0) {
      results = results.filter(item => 
        selectedFilters.difficulty.includes(item.difficulty)
      );
    }

    if (selectedFilters.type.length > 0) {
      results = results.filter(item => 
        selectedFilters.type.includes(item.type)
      );
    }

    if (selectedFilters.unit.length > 0) {
      results = results.filter(item => 
        selectedFilters.unit.includes(item.unit)
      );
    }

    if (selectedFilters.rating > 0) {
      results = results.filter(item => 
        item.rating && item.rating >= selectedFilters.rating
      );
    }

    // Tab filtering
    if (activeTab !== 'all') {
      results = results.filter(item => item.type === activeTab);
    }

    return results;
  };

  const searchResults = performSmartSearch();

  const toggleFilter = (filterType, value) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType];
      if (Array.isArray(currentValues)) {
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      difficulty: [],
      type: [],
      unit: [],
      rating: 0
    });
  };

  const getTypeIcon = (type, category) => {
    if (type === 'problem') return <Code className="h-5 w-5" />;
    if (category === 'lecture') return <BookOpen className="h-5 w-5" />;
    if (category === 'video') return <Video className="h-5 w-5" />;
    if (category === 'paper') return <FileText className="h-5 w-5" />;
    return <BookOpen className="h-5 w-5" />;
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
              <p>Try: "Find sorting algorithms"</p>
              <p className="text-sm mt-2">I can help you search smarter!</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask me to find something..."
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
          <button
            onClick={() => navigate('/coding-practice')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <Code className="h-5 w-5" />
            <span>Coding Practice</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600">
            <Search className="h-5 w-5" />
            <span>Smart Search</span>
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Progress</span>
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
              <button onClick={() => navigate('/coding-practice')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <Code className="h-5 w-5" />
                <span>Coding Practice</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600">
                <Search className="h-5 w-5" />
                <span>Smart Search</span>
              </button>
              <button onClick={() => navigate('/progress')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                <TrendingUp className="h-5 w-5" />
                <span>Progress</span>
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
            <h1 className="text-xl font-bold text-gray-900">Smart Search</h1>
            <div className="w-6 lg:hidden"></div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Hero Search */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 mr-2" />
              <h2 className="text-2xl font-bold">Smart Search</h2>
            </div>
            <p className="text-center text-indigo-100 mb-6">Search across all resources, problems, and topics with intelligent filtering</p>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for topics, problems, resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl focus:ring-4 focus:ring-indigo-300 outline-none text-lg"
                />
              </div>
            </div>
          </div>

          {/* Filters and Tabs */}
          <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
            {/* Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  All ({allContent.length})
                </button>
                <button
                  onClick={() => setActiveTab('resource')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === 'resource' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Resources ({allContent.filter(i => i.type === 'resource').length})
                </button>
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    activeTab === 'problem' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Problems ({allContent.filter(i => i.type === 'problem').length})
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <div className="space-y-2">
                      {['easy', 'medium', 'hard'].map(diff => (
                        <label key={diff} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.difficulty.includes(diff)}
                            onChange={() => toggleFilter('difficulty', diff)}
                            className="mr-2"
                          />
                          <span className="capitalize">{diff}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                    <div className="space-y-2">
                      {['resource', 'problem'].map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFilters.type.includes(type)}
                            onChange={() => toggleFilter('type', type)}
                            className="mr-2"
                          />
                          <span className="capitalize">{type}s</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                    <select
                      value={selectedFilters.rating}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{searchResults.length}</span> results
              {searchQuery && <span> for "{searchQuery}"</span>}
            </p>
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            {searchResults.map(item => (
              <div key={`${item.type}-${item.id}`} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-indigo-600 mt-1">
                      {getTypeIcon(item.type, item.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                        {item.difficulty && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">
                          {item.unit}
                        </span>
                        {item.tags && item.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {item.rating && (
                          <span className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            {item.rating}
                          </span>
                        )}
                        {item.views && <span>{item.views} views</span>}
                        {item.acceptanceRate && <span>{item.acceptanceRate}% acceptance</span>}
                        {item.author && <span>By {item.author}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <button className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 whitespace-nowrap">
                    <span>{item.type === 'problem' ? 'Solve' : 'View'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try different keywords or adjust your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}