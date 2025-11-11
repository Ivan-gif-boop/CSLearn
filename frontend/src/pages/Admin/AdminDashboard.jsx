import React from 'react';
import StatCard from './StatCard';
import UserManagement from './UserManagement';
import ContentManagement from './ContentManagement';
import { Users, BookOpen, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard = () => {
  // This data would come from your database/API
  const stats = [
    {
      icon: Users,
      title: 'Total Users',
      value: '2,847',
      subtitle: '+124 this week',
      trend: '+4.5%'
    },
    {
      icon: BookOpen,
      title: 'Total Resources',
      value: '1,243',
      subtitle: '+45 this month',
      trend: '+3.7%'
    },
    {
      icon: TrendingUp,
      title: 'Avg. Engagement',
      value: '73%',
      subtitle: '+5% from last month',
      trend: '+5%'
    },
    {
      icon: Clock,
      title: 'Pending Reviews',
      value: '23',
      subtitle: 'Awaiting approval',
      trend: null
    }
  ];

  const userManagementData = [
    { label: 'Active Users', count: '2847', status: 'active' },
    { label: 'Inactive Users', count: '342', status: 'inactive' },
    { label: 'Pending Approval', count: '23', status: 'pending' }
  ];

  const contentManagementData = [
    { type: 'Lectures', count: '342' },
    { type: 'Papers', count: '156' },
    { type: 'Videos', count: '428' },
    { type: 'Problems', count: '317' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Manage platform resources, users, and content</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserManagement data={userManagementData} />
          <ContentManagement data={contentManagementData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;