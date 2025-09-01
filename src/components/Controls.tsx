import React from 'react';

interface ControlsProps {
  viewType: 'monthly' | 'weekly';
  onViewTypeChange: (type: 'monthly' | 'weekly') => void;
  metricType?: 'repeat' | 'no-repeat' | 'all';
  onMetricTypeChange?: (type: 'repeat' | 'no-repeat' | 'all') => void;
}

const Controls: React.FC<ControlsProps> = ({ viewType, onViewTypeChange, metricType = 'all', onMetricTypeChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-8 mb-8 shadow-sm hover:shadow-md transition-all duration-300 ease-out">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-8 lg:space-y-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-700">View:</span>
            <div className="bg-gray-100 rounded-xl p-1.5 shadow-inner">
              <button
                onClick={() => onViewTypeChange('monthly')}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                  viewType === 'monthly'
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30 transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => onViewTypeChange('weekly')}
                className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                  viewType === 'weekly'
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30 transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          {onMetricTypeChange && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-700">Metrics:</span>
              <div className="bg-gray-100 rounded-xl p-1.5 shadow-inner">
                <button
                  onClick={() => onMetricTypeChange('all')}
                  className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                    metricType === 'all'
                      ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-500/30 transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => onMetricTypeChange('repeat')}
                  className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                    metricType === 'repeat'
                      ? 'bg-orange-600 text-white shadow-lg ring-2 ring-orange-500/30 transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  Repeat
                </button>
                <button
                  onClick={() => onMetricTypeChange('no-repeat')}
                  className={`px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                    metricType === 'no-repeat'
                      ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30 transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  No-Repeat
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
          <div>
            <label htmlFor="reporting-vertical" className="block text-sm font-semibold text-gray-700 mb-3">
              Reporting Vertical
            </label>
            <select
              id="reporting-vertical"
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ease-out hover:border-gray-300"
            >
              <option>All Verticals</option>
              <option>E-commerce</option>
              <option>Healthcare</option>
              <option>Finance</option>
            </select>
          </div>

          <div>
            <label htmlFor="customer-segment" className="block text-sm font-semibold text-gray-700 mb-3">
              Customer Segment
            </label>
            <select
              id="customer-segment"
              className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ease-out hover:border-gray-300"
            >
              <option>All Segments</option>
              <option>Prime Members</option>
              <option>Non-Prime Members</option>
              <option>New Customers</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
