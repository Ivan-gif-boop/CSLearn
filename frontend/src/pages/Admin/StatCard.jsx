import React from 'react';

const StatCard = ({ icon: Icon, title, value, subtitle, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <span className="text-gray-600 text-sm font-medium">{title}</span>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-500">{subtitle}</div>
      </div>
      {trend && (
        <div className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </div>
      )}
    </div>
  </div>
);

export default StatCard;