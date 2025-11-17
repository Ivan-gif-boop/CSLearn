import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Video,
  Download,
  Search,
  Filter,
  ChevronDown,
  Star,
  Clock,
  Eye,
  Menu,
  X,
  Home,
  Code,
  LogOut,
  MessageCircle
} from 'lucide-react';

export default function CuratedResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const navigate = useNavigate();

  // Get user data
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Sample data - replace with API calls
  const units = [
    'Data Structures',
    'Algorithms',
    'Database Systems',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering'
  ];

  const resourceTypes = [
    { value: 'lecture', label: 'Lecture Notes', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'video', label: 'Video Tutorials', icon: <Video className="h-4 w-4" /> },
    { value: 'paper', label: 'Past Papers', icon: <FileText className="h-4 w-4" /> }
  ];

  const resources = [
    {
      id: 1,
      title: 'Introduction to Arrays and Lists',
      unit: 'Data Structures',
      type: 'lecture',
      description: 'Comprehensive guide covering arrays, dynamic arrays, and linked lists with examples.',
      author: 'Dr. Sarah Johnson',
      rating: 4.8,
      views: 1234,
      duration: '45 min read',
      uploadDate: '2025-01-15',
      tags: ['Arrays', 'Lists', 'Fundamentals']
    },
    {
      id: 2,
      title: 'Sorting Algorithms Explained',
      unit: 'Algorithms',
      type: 'video',
      description: 'Visual explanation of bubble sort, merge sort, and quick sort with complexity analysis.',
      author: 'Prof. Michael Chen',
      rating: 4.9,
      views: 2156,
      duration: '1h 20min',
      uploadDate: '2025-01-10',
      tags: ['Sorting', 'Time Complexity', 'Analysis']
    },
    {
      id: 3,
      title: 'SQL Query Practice - 2024 Exam',
      unit: 'Database Systems',
      type: 'paper',
      description: 'Previous year examination paper with solutions and detailed explanations.',
      author: 'Dr. Emily Rodriguez',
      rating: 4.7,
      views: 987,
      duration: '2 hours',
      uploadDate: '2025-01-05',
      tags: ['SQL', 'Exam Prep', 'Practice']
    },
    {
      id: 4,
      title: 'Binary Trees and Traversals',
      unit: 'Data Structures',
      type: 'lecture',
      description: 'In-depth coverage of binary trees, BSTs, and various traversal methods.',
      author: 'Dr. Sarah Johnson',
      rating: 4.9,
      views: 1876,
      duration: '55 min read',
      uploadDate: '2025-01-12',
      tags: ['Trees', 'BST', 'Recursion']
    },
    {
      id: 5,
      title: 'Dynamic Programming Masterclass',
      unit: 'Algorithms',
      type: 'video',
      description: 'Master DP with step-by-step solutions to classic problems.',
      author: 'Prof. David Kumar',
      rating: 5.0,
      views: 3421,
      duration: '2h 15min',
      uploadDate: '2025-01-08',
      tags: ['DP', 'Optimization', 'Advanced']
    },
    {
      id: 6,
      title: 'Normalization and ER Diagrams',
      unit: 'Database Systems',
      type: 'lecture',
      description: 'Complete guide to database normalization forms and entity-relationship modeling.',
      author: 'Dr. Emily Rodriguez',
      rating: 4.6,
      views: 1543,
      duration: '40 min read',
      uploadDate: '2025-01-14',
      tags: ['Normalization', 'ER', 'Design']
    }
  ];

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnit = selectedUnit === 'all' || resource.unit === selectedUnit;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesUnit && matchesType;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case 'lecture': return <BookOpen className="h-5 w-5" />;
      case 'video': return <Video className="h-5 w-5" />;
      case 'paper': return <FileText className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeBadge = (type) => {
    const colors = {
      lecture: 'bg-blue-100 text-blue-700',
      video: 'bg-purple-100 text-purple-700',
      paper: 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
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
              <p>Hello! How can I help you with resources?</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask about resources..."
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
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600">
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
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-indigo-50 text-indigo-600">
                <BookOpen className="h-5 w-5" />
                <span>Resources</span>
              </button>
              <button onClick={() => navigate('/coding-practice')} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
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
            <h1 className="text-xl font-bold text-gray-900">Curated Resources</h1>
            <div className="w-6 lg:hidden"></div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                  />
                </div>
              </div>

              {/* Unit Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                >
                  <option value="all">All Units</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="lecture">Lecture Notes</option>
                  <option value="video">Video Tutorials</option>
                  <option value="paper">Past Papers</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredResources.length}</span> resources
                </p>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-600">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.unit}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(resource.type)}`}>
                    {resource.type === 'lecture' ? 'Lecture' : resource.type === 'video' ? 'Video' : 'Paper'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {resource.rating}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {resource.views}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {resource.duration}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-gray-600">By {resource.author}</p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    <Download className="h-4 w-4" />
                    <span>Access</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}