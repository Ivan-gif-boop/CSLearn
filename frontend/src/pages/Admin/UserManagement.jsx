import React from 'react';
import { ChevronRight } from 'lucide-react';

const UserManagement = ({ data }) => {
  const handleViewAllUsers = () => {
    // Add your navigation or modal logic here
    console.log('View all users clicked');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">User Management</h3>
      <p className="text-gray-600 text-sm mb-6">Manage student and instructor accounts</p>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'active' ? 'bg-blue-600' :
                item.status === 'pending' ? 'bg-red-500' :
                'bg-gray-400'
              }`} />
              <span className="text-gray-700 font-medium">{item.label}</span>
            </div>
            <span className="text-gray-900 font-bold">{item.count}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleViewAllUsers}
        className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        View All Users
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UserManagement;
