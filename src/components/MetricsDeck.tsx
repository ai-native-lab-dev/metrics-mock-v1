import React, { useState } from 'react';
import { MetricGroup } from '../data/mockData';

// Props interface for the MetricsDeck component
interface MetricsDeckProps {
  metricGroups: MetricGroup[]; // Array of metric groups to display
  showOnlyGroup?: string; // Optional filter to show only specific group
}

// Helper function to generate deterministic synthetic values
const generateSyntheticValue = (baseValue: number, index: number, isPercentage: boolean = false): number => {
  // Use a simple hash-like function for deterministic values
  const seed = baseValue + index;
  const hash = Math.sin(seed) * 10000;
  const normalized = Math.abs(hash - Math.floor(hash));
  
  if (isPercentage) {
    return Math.round(40 + (normalized * 30)); // 40-70% range
  } else {
    return Math.round(40 + (normalized * 30)); // 40-70 count range
  }
};

// Helper function to get group colors
const getGroupColors = (groupName: string) => {
  switch (groupName) {
    case 'Total Interactions':
      return {
        card: 'bg-teal-50 border-teal-200',
        header: 'bg-teal-100 text-teal-800',
        dot: 'bg-teal-400'
      };
    case 'Self-Service: Bot Only':
      return {
        card: 'bg-blue-50 border-blue-200',
        header: 'bg-blue-100 text-blue-800',
        dot: 'bg-blue-400'
      };
    case 'Human-Led: CSA Only':
      return {
        card: 'bg-orange-50 border-orange-200',
        header: 'bg-orange-100 text-orange-800',
        dot: 'bg-orange-400'
      };
    case 'Self-Guided: Page Visits':
      return {
        card: 'bg-purple-50 border-purple-200',
        header: 'bg-purple-100 text-purple-800',
        dot: 'bg-purple-400'
      };
    default:
      return {
        card: 'bg-gray-50 border-gray-200',
        header: 'bg-gray-100 text-gray-800',
        dot: 'bg-gray-400'
      };
  }
};

const MetricsDeck: React.FC<MetricsDeckProps> = ({ 
  metricGroups, 
  showOnlyGroup 
}) => {
  const [viewType, setViewType] = useState<'monthly' | 'weekly'>('monthly');
  const [weeksPerPage, setWeeksPerPage] = useState<number>(13);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Filter groups based on showOnlyGroup prop, or show all groups by default
  const filteredGroups = showOnlyGroup 
    ? metricGroups.filter(group => group.name === showOnlyGroup)
    : metricGroups;

  // Toggle the expanded state of a metric card
  const toggleCard = (metricName: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(metricName)) {
      newExpanded.delete(metricName);
    } else {
      newExpanded.add(metricName);
    }
    setExpandedCards(newExpanded);
  };

  // Generate column headers based on view type
  const getColumnHeaders = () => {
    if (viewType === 'monthly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
      const headers = [];
      const totalWeeks = 52;
      const startWeek = 1;
      
      for (let i = 0; i < weeksPerPage; i++) {
        const weekNum = startWeek + i;
        if (weekNum <= totalWeeks) {
          headers.push(`Week ${weekNum}`);
        }
      }
      return headers;
    }
  };

  // Generate synthetic data for a metric
  const generateMetricData = (metricName: string, isPercentage: boolean = false) => {
    const baseValue = metricName.length; // Use metric name length as base for deterministic values
    const periods = viewType === 'monthly' ? 12 : weeksPerPage;
    const data2025 = [];
    const data2024 = [];
    
    for (let i = 0; i < periods; i++) {
      data2025.push(generateSyntheticValue(baseValue + 2025, i, isPercentage));
      data2024.push(generateSyntheticValue(baseValue + 2024, i, isPercentage));
    }
    
    return { data2025, data2024 };
  };

  // Calculate difference percentage
  const calculateDiffPercentage = (val2025: number, val2024: number): number => {
    if (val2024 === 0) return val2025 > 0 ? 100 : 0;
    return ((val2025 - val2024) / val2024) * 100;
  };

  // Format difference percentage with color
  const formatDiffPercentage = (val2025: number, val2024: number): { value: string; className: string } => {
    const diff = calculateDiffPercentage(val2025, val2024);
    const className = diff >= 0 ? 'text-green-600' : 'text-red-600';
    const sign = diff >= 0 ? '+' : '';
    return {
      value: `${sign}${diff.toFixed(1)}%`,
      className
    };
  };

  const columnHeaders = getColumnHeaders();

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* View Type Toggle */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-700">View:</span>
            <div className="bg-gray-100 rounded-xl p-1.5 shadow-inner">
              <button
                onClick={() => setViewType('monthly')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                  viewType === 'monthly'
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30 transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setViewType('weekly')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                  viewType === 'weekly'
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30 transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          {/* Weeks Per Page (only show in weekly view) */}
          {viewType === 'weekly' && (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-700">Weeks per page:</span>
              <div className="bg-gray-100 rounded-xl p-1.5 shadow-inner">
                {[13, 26, 39, 52].map(weeks => (
                  <button
                    key={weeks}
                    onClick={() => setWeeksPerPage(weeks)}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ease-out ${
                      weeksPerPage === weeks
                        ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-500/30 transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                  >
                    {weeks}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards */}
      {filteredGroups.map(group => {
        const colors = getGroupColors(group.name);
        
        return (
          <div key={group.name} className="space-y-4">
            {/* Group Header */}
            <div className={`${colors.header} px-6 py-4 rounded-xl border border-gray-200 shadow-sm`}>
              <div className="flex items-center gap-3">
                <div className={`${colors.dot} w-3 h-3 rounded-full`}></div>
                <h2 className="text-xl font-bold">{group.name}</h2>
                <span className="text-sm text-gray-600">({group.metrics.length} metrics)</span>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid gap-4">
              {group.metrics.map(metric => {
                const isExpanded = expandedCards.has(metric.metricName);
                const { data2025, data2024 } = generateMetricData(metric.metricName, metric.metricName.includes('%'));
                
                return (
                  <div
                    key={metric.metricName}
                    className={`${colors.card} rounded-xl border shadow-sm transition-all duration-300 ease-out hover:shadow-md`}
                  >
                    {/* Card Header */}
                    <button
                      onClick={() => toggleCard(metric.metricName)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`${colors.dot} w-2 h-2 rounded-full`}></div>
                        <h3 className="text-lg font-semibold text-gray-900">{metric.metricName}</h3>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Card Content */}
                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-4">
                        {/* Question and Definition */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Question it answers:</h4>
                            <p className="text-gray-600 text-sm">{metric.question}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-1">Definition:</h4>
                            <p className="text-gray-600 text-sm">{metric.definition}</p>
                          </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-3 font-semibold text-gray-700">Period</th>
                                {columnHeaders.map(header => (
                                  <th key={header} className="text-center py-2 px-2 font-semibold text-gray-700 min-w-[80px]">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {/* 2025 Row */}
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 font-medium text-gray-900">2025</td>
                                {data2025.map((value, index) => (
                                  <td key={`2025-${index}`} className="text-center py-2 px-2 text-gray-700">
                                    {value}
                                  </td>
                                ))}
                              </tr>
                              
                              {/* 2024 Row */}
                              <tr className="border-b border-gray-100">
                                <td className="py-2 px-3 font-medium text-gray-900">2024</td>
                                {data2024.map((value, index) => (
                                  <td key={`2024-${index}`} className="text-center py-2 px-2 text-gray-700">
                                    {value}
                                  </td>
                                ))}
                              </tr>
                              
                              {/* Diff % Row */}
                              <tr>
                                <td className="py-2 px-3 font-medium text-gray-900">Diff %</td>
                                {data2025.map((val2025, index) => {
                                  const val2024 = data2024[index];
                                  const diff = formatDiffPercentage(val2025, val2024);
                                  return (
                                    <td key={`diff-${index}`} className={`text-center py-2 px-2 font-medium ${diff.className}`}>
                                      {diff.value}
                                    </td>
                                  );
                                })}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsDeck;
