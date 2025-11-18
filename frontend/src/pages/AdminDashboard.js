import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Menu,
  X,
  Home,
  Library,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  MessageCircle,
  Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const navigate = useNavigate();

  // Get admin user data from localStorage
  const [admin, setAdmin] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { username: 'Admin', email: '', role: 'Administrator' };
  });

  // Protect route - redirect if not logged in
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Stats data
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Total Users',
      value: '2,847',
      subtitle: '+124 this week',
      trend: '+4.5%',
      color: 'bg-blue-500'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Total Resources',
      value: '1,243',
      subtitle: '+45 this month',
      trend: '+3.7%',
      color: 'bg-green-500'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Avg. Engagement',
      value: '73%',
      subtitle: '+5% from last month',
      trend: '+5%',
      color: 'bg-purple-500'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Pending Reviews',
      value: '23',
      subtitle: 'Awaiting approval',
      trend: null,
      color: 'bg-orange-500'
    }
  ];

  // User management data
  const userStats = [
    { label: 'Active Users', count: '2,847', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Inactive Users', count: '342', color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'Pending Approval', count: '23', color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  // Content management data
  const contentStats = [
    { type: 'Lectures', count: '342', icon: <BookOpen className="h-5 w-5" /> },
    { type: 'Past Papers', count: '156', icon: <FileText className="h-5 w-5" /> },
    { type: 'Video Tutorials', count: '428', icon: <FileText className="h-5 w-5" /> },
    { type: 'Coding Problems', count: '317', icon: <Code className="h-5 w-5" /> }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { id: 'users', label: 'User Management', icon: <Users className="h-5 w-5" /> },
    { id: 'content', label: 'Content Management', icon: <Library className="h-5 w-5" /> },
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
              <p>Hello Admin! How can I help you today?</p>
              <p className="text-sm mt-2">Ask me anything about platform management.</p>
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

        {/* Admin Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{admin.username || 'Admin'}</p>
              <p className="text-xs text-indigo-600 truncate">{admin.role || 'Administrator'}</p>
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
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
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{admin.username || 'Admin'}</p>
                  <p className="text-xs text-indigo-600 truncate">{admin.role || 'Administrator'}</p>
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
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
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
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="w-6 lg:hidden"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Admin,
              </h2>
            <p className="text-gray-600">Manage platform resources, users, and content</p>
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
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  {stat.trend && (
                    <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600 text-sm mb-6">Monitor and manage user accounts</p>

              <div className="space-y-4 mb-6">
                {userStats.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${item.bg} rounded-lg`}>
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className={`font-bold ${item.color}`}>{item.count}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                Manage Users
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Content Management</h3>
              <p className="text-gray-600 text-sm mb-6">Manage resources and course materials</p>

              <div className="space-y-4 mb-6">
                {contentStats.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400">{item.icon}</div>
                      <span className="text-gray-700 font-medium">{item.type}</span>
                    </div>
                    <span className="text-gray-900 font-bold">{item.count}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                Manage Content
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}