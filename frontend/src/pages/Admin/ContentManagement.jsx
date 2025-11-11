import React from 'react';
import { ChevronRight } from 'lucide-react';

const ContentManagement = ({ data }) => {
  const handleManageContent = () => {
    // Add your navigation or modal logic here
    console.log('Manage content clicked');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Content Management</h3>
      <p className="text-gray-600 text-sm mb-6">Manage resources and course materials</p>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <span className="text-gray-700 font-medium">{item.type}</span>
            <span className="text-gray-900 font-bold">{item.count}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleManageContent}
        className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        Manage Content
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ContentManagement;