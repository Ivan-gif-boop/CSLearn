import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  TrendingUp, 
  Award,
  Clock,
  Target,
  Menu,
  X,
  Home,
  Library,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Play,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Mock user data
  const user = {
    name: "Fatma Abdulle",
    email: "fatmaabdulle@gmail.com",
    avatar: null
  };

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "Data Structures",
      progress: 75,
      topics: 12,
      completed: 9,
      lastAccessed: "2 hours ago",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Algorithms",
      progress: 45,
      topics: 15,
      completed: 7,
      lastAccessed: "1 day ago",
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Database Systems",
      progress: 30,
      topics: 10,
      completed: 3,
      lastAccessed: "3 days ago",
      color: "bg-green-500"
    }
  ];

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: "completed",
      title: "Completed Binary Search Trees",
      course: "Data Structures",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "started",
      title: "Started Sorting Algorithms",
      course: "Algorithms",
      time: "1 day ago"
    },
    {
      id: 3,
      type: "achievement",
      title: "Earned 'Quick Learner' Badge",
      course: "General",
      time: "2 days ago"
    }
  ];

  const stats = [
    {
      label: "Courses Enrolled",
      value: "3",
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-blue-500"
    },
    {
      label: "Average Progress",
      value: "50%",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-green-500"
    },
    {
      label: "Problems Solved",
      value: "47",
      icon: <Code className="h-6 w-6" />,
      color: "bg-purple-500"
    },
    {
      label: "Badges Earned",
      value: "8",
      icon: <Award className="h-6 w-6" />,
      color: "bg-yellow-500"
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'courses', label: 'My Courses', icon: <Library className="h-5 w-5" /> },
    { id: 'practice', label: 'Practice', icon: <Code className="h-5 w-5" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'resources', label: 'Resources', icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AI Assistant Button */}
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

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Code className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">CSLearn</span>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 lg:hidden flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CSLearn</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200 space-y-1">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Clock className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Target className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-gray-600">Here's your learning progress today</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Continue Learning Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Continue Learning</h3>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">Binary Search Trees</h4>
                  <p className="text-sm text-gray-600 mb-3">Data Structures • 15 min left</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center">
                    <Play className="h-4 w-4 mr-2" />
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* My Courses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">My Courses</h3>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center">
                Browse All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                  <div className={`h-2 ${course.color}`}></div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{course.completed}/{course.topics} Topics</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.lastAccessed}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${course.color} h-2 rounded-full transition-all`} 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                      Continue Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'completed' ? 'bg-green-100' :
                      activity.type === 'started' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      {activity.type === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : activity.type === 'started' ? (
                        <Play className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Award className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{activity.course}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}