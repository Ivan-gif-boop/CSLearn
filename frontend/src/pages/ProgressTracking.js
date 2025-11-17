import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  Clock,
  Menu,
  X,
  Home,
  LogOut,
  MessageCircle,
  BarChart3,
  Calendar,
  Zap,
  Star
} from 'lucide-react';

export default function ProgressTracking() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Get progress data from localStorage or initialize
  const [progressData, setProgressData] = useState(() => {
    const saved = localStorage.getItem('progressData');
    return saved ? JSON.parse(saved) : {
      resourcesAccessed: [],
      problemsSolved: [],
      problemsAttempted: [],
      studyTime: {},
      achievements: []
    };
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Calculate statistics
  const stats = {
    totalResourcesAccessed: progressData.resourcesAccessed.length,
    totalProblemsSolved: progressData.problemsSolved.length,
    totalProblemsAttempted: progressData.problemsAttempted.length,
    successRate: progressData.problemsAttempted.length > 0 
      ? Math.round((progressData.problemsSolved.length / progressData.problemsAttempted.length) * 100)
      : 0,
    weeklyStudyTime: Object.values(progressData.studyTime).reduce((a, b) => a + b, 0),
    currentStreak: 7 // Calculate based on daily activity
  };

  // Unit progress data
  const unitProgress = [
    {
      name: 'Data Structures',
      completed: 12,
      total: 25,
      percentage: 48,
      lastAccessed: '2 hours ago',
      topics: [
        { name: 'Arrays', completed: true },
        { name: 'Linked Lists', completed: true },
        { name: 'Trees', completed: false },
        { name: 'Graphs', completed: false }
      ]
    },
    {
      name: 'Algorithms',
      completed: 8,
      total: 20,
      percentage: 40,
      lastAccessed: '1 day ago',
      topics: [
        { name: 'Sorting', completed: true },
        { name: 'Searching', completed: true },
        { name: 'DP', completed: false },
        { name: 'Greedy', completed: false }
      ]
    },
    {
      name: 'Database Systems',
      completed: 15,
      total: 18,
      percentage: 83,
      lastAccessed: '3 hours ago',
      topics: [
        { name: 'SQL Basics', completed: true },
        { name: 'Normalization', completed: true },
        { name: 'Transactions', completed: true },
        { name: 'Indexing', completed: false }
      ]
    },
    {
      name: 'Operating Systems',
      completed: 6,
      total: 22,
      percentage: 27,
      lastAccessed: '5 days ago',
      topics: [
        { name: 'Processes', completed: true },
        { name: 'Threads', completed: false },
        { name: 'Memory', completed: false },
        { name: 'File Systems', completed: false }
      ]
    }
  ];

  // Recent activity
  const recentActivity = [
    {
      type: 'resource',
      title: 'Binary Trees and Traversals',
      unit: 'Data Structures',
      timestamp: '2 hours ago',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      type: 'problem',
      title: 'Two Sum - Solved',
      unit: 'Arrays',
      timestamp: '3 hours ago',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    },
    {
      type: 'resource',
      title: 'SQL Query Practice - 2024 Exam',
      unit: 'Database Systems',
      timestamp: '5 hours ago',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      type: 'problem',
      title: 'Reverse Linked List - Attempted',
      unit: 'Linked Lists',
      timestamp: '1 day ago',
      icon: <Clock className="h-5 w-5 text-orange-600" />
    },
    {
      type: 'problem',
      title: 'Climbing Stairs - Solved',
      unit: 'Dynamic Programming',
      timestamp: '1 day ago',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />
    }
  ];

  // Achievements
  const achievements = [
    {
      title: 'First Steps',
      description: 'Solved your first problem',
      earned: true,
      icon: <Star className="h-6 w-6" />,
      date: 'Jan 10, 2025'
    },
    {
      title: 'Quick Learner',
      description: 'Completed 10 resources',
      earned: true,
      icon: <Zap className="h-6 w-6" />,
      date: 'Jan 12, 2025'
    },
    {
      title: 'Problem Solver',
      description: 'Solve 5 coding problems',
      earned: true,
      icon: <Target className="h-6 w-6" />,
      date: 'Jan 15, 2025'
    },
    {
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      earned: false,
      icon: <Award className="h-6 w-6" />,
      date: null
    }
  ];

  // Weekly study time data
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.7 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.2 }
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

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
              <p>Track your progress!</p>
              <p className="text-sm mt-2">Ask me about your learning journey.</p>
            </div>
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              placeholder="Ask about progress..."
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
            <h1 className="text-xl font-bold text-gray-900">Progress Tracking</h1>
            <div className="w-6 lg:hidden"></div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">{stats.totalResourcesAccessed}</span>
              </div>
              <p className="text-sm text-gray-600">Resources Accessed</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">{stats.totalProblemsSolved}</span>
              </div>
              <p className="text-sm text-gray-600">Problems Solved</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-6 w-6 text-purple-600" />
                <span className="text-2xl font-bold text-gray-900">{stats.successRate}%</span>
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-6 w-6 text-orange-600" />
                <span className="text-2xl font-bold text-gray-900">{stats.currentStreak}</span>
              </div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Weekly Study Time */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Study Time</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '100%' }}>
                      <div
                        className="bg-indigo-600 rounded-t-lg absolute bottom-0 w-full transition-all"
                        style={{ height: `${(day.hours / maxHours) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{day.day}</p>
                    <p className="text-xs font-semibold text-gray-900">{day.hours}h</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-indigo-50' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`${achievement.earned ? 'text-indigo-600' : 'text-gray-400'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-indigo-600 mt-1">{achievement.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Unit Progress */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Unit Progress</h3>
            <div className="space-y-4">
              {unitProgress.map((unit, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{unit.name}</h4>
                      <p className="text-sm text-gray-600">Last accessed: {unit.lastAccessed}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">{unit.percentage}%</p>
                      <p className="text-sm text-gray-600">{unit.completed}/{unit.total} complete</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${unit.percentage}%` }}
                    />
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {unit.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          topic.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {topic.completed && <CheckCircle className="inline h-3 w-3 mr-1" />}
                        {topic.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="mt-0.5">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.unit}</p>
                  </div>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}