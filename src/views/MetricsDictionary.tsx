import React, { useState } from 'react';
import { mockMetricGroups } from '../data/mockData';

// Helper function to get group colors
const getGroupColors = (groupName: string) => {
  switch (groupName) {
    case 'Total Interactions':
      return {
        card: 'bg-teal-50 border-teal-200',
        header: 'bg-teal-100 text-teal-800',
        dot: 'bg-teal-400',
        accent: 'text-teal-600'
      };
    case 'Self-Service: Bot Only':
      return {
        card: 'bg-blue-50 border-blue-200',
        header: 'bg-blue-100 text-blue-800',
        dot: 'bg-blue-400',
        accent: 'text-blue-600'
      };
    case 'Human-Led: CSA Only':
      return {
        card: 'bg-orange-50 border-orange-200',
        header: 'bg-orange-100 text-orange-800',
        dot: 'bg-orange-400',
        accent: 'text-orange-600'
      };
    case 'Self-Guided: Page Visits':
      return {
        card: 'bg-purple-50 border-purple-200',
        header: 'bg-purple-100 text-purple-800',
        dot: 'bg-purple-400',
        accent: 'text-purple-600'
      };
    default:
      return {
        card: 'bg-gray-50 border-gray-200',
        header: 'bg-gray-100 text-gray-800',
        dot: 'bg-gray-400',
        accent: 'text-gray-600'
      };
  }
};

// Helper function to get metric type and unit
const getMetricInfo = (metricName: string) => {
  const name = metricName.toLowerCase();
  
  if (name.includes('percentage') || name.includes('%')) {
    return { type: 'Percentage', unit: '%', description: 'Percentage-based metric' };
  } else if (name.includes('rate')) {
    return { type: 'Rate', unit: '%', description: 'Rate-based metric' };
  } else if (name.includes('time') || name.includes('duration')) {
    return { type: 'Time', unit: 'min', description: 'Time-based metric' };
  } else if (name.includes('score') || name.includes('satisfaction')) {
    return { type: 'Score', unit: '1-5', description: 'Rating-based metric' };
  } else if (name.includes('count') || name.includes('number') || name.includes('total')) {
    return { type: 'Count', unit: 'Count', description: 'Count-based metric' };
  } else if (name.includes('average') || name.includes('avg')) {
    return { type: 'Average', unit: 'Avg', description: 'Average-based metric' };
  } else {
    return { type: 'Metric', unit: 'Value', description: 'General metric' };
  }
};

// Helper function to get business impact level
const getBusinessImpact = (metricName: string) => {
  const name = metricName.toLowerCase();
  
  if (name.includes('total') || name.includes('percentage') || name.includes('rate')) {
    return { level: 'High', color: 'text-red-600 bg-red-50', description: 'Critical business metric' };
  } else if (name.includes('satisfaction') || name.includes('resolution')) {
    return { level: 'High', color: 'text-red-600 bg-red-50', description: 'Customer experience metric' };
  } else if (name.includes('time') || name.includes('duration') || name.includes('queue')) {
    return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50', description: 'Operational efficiency metric' };
  } else {
    return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50', description: 'Supporting metric' };
  }
};

const MetricsDictionary: React.FC = () => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedMetrics, setExpandedMetrics] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle group expansion
  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  // Toggle metric expansion
  const toggleMetric = (metricName: string) => {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricName)) {
      newExpanded.delete(metricName);
    } else {
      newExpanded.add(metricName);
    }
    setExpandedMetrics(newExpanded);
  };

  // Filter metrics based on search term
  const filteredGroups = mockMetricGroups.map(group => ({
    ...group,
    metrics: group.metrics.filter(metric =>
      metric.metricName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      metric.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(group => group.metrics.length > 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Metrics Dictionary</h1>
            <p className="text-gray-600 mt-1">Comprehensive definitions and explanations for all dashboard metrics</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search metrics, questions, or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Groups</p>
              <p className="text-2xl font-bold text-gray-900">{mockMetricGroups.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Metrics</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMetricGroups.reduce((sum, group) => sum + group.metrics.length, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Impact</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockMetricGroups.reduce((sum, group) => 
                  sum + group.metrics.filter(metric => 
                    getBusinessImpact(metric.metricName).level === 'High'
                  ).length, 0
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Coverage</p>
              <p className="text-2xl font-bold text-gray-900">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Groups */}
      <div className="space-y-6">
        {filteredGroups.map(group => {
          const colors = getGroupColors(group.name);
          const isExpanded = expandedGroups.has(group.name);
          
          return (
            <div key={group.name} className={`${colors.card} rounded-xl border shadow-sm`}>
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.name)}
                className={`w-full ${colors.header} px-6 py-4 rounded-xl flex items-center justify-between transition-all duration-200 ease-out hover:opacity-90`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${colors.dot} w-3 h-3 rounded-full`}></div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold">{group.name}</h2>
                    <p className="text-sm opacity-80">{group.metrics.length} metrics</p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 transition-transform duration-200 ease-out ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Group Content */}
              {isExpanded && (
                <div className="p-6 space-y-4">
                  {group.metrics.map(metric => {
                    const isMetricExpanded = expandedMetrics.has(metric.metricName);
                    const metricInfo = getMetricInfo(metric.metricName);
                    const businessImpact = getBusinessImpact(metric.metricName);
                    
                    return (
                      <div key={metric.metricName} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        {/* Metric Header */}
                        <button
                          onClick={() => toggleMetric(metric.metricName)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <div className={`${colors.dot} w-2 h-2 rounded-full mt-2 flex-shrink-0`}></div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                  {metric.metricName}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2">{metric.question}</p>
                                <div className="flex items-center gap-4 text-xs">
                                  <span className={`px-2 py-1 rounded-full ${businessImpact.color} font-medium`}>
                                    {businessImpact.level} Impact
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                                    {metricInfo.type}
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                                    Unit: {metricInfo.unit}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ease-out ml-4 ${
                              isMetricExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Metric Details */}
                        {isMetricExpanded && (
                          <div className="px-6 pb-6 space-y-4">
                            {/* Definition */}
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Definition</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{metric.definition}</p>
                            </div>

                            {/* Metric Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-blue-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-blue-800 mb-2">Business Context</h4>
                                <p className="text-blue-700 text-sm">{businessImpact.description}</p>
                              </div>
                              <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-green-800 mb-2">Metric Type</h4>
                                <p className="text-green-700 text-sm">{metricInfo.description}</p>
                              </div>
                            </div>

                            {/* Usage Guidelines */}
                            <div className="bg-yellow-50 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-yellow-800 mb-2">Usage Guidelines</h4>
                              <ul className="text-yellow-700 text-sm space-y-1">
                                <li>• Monitor trends over time for performance insights</li>
                                <li>• Compare against industry benchmarks when available</li>
                                <li>• Use in conjunction with related metrics for comprehensive analysis</li>
                                <li>• Consider seasonal variations and business cycles</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredGroups.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No metrics found</h3>
          <p className="text-gray-600">Try adjusting your search terms or browse all metrics above.</p>
        </div>
      )}
    </div>
  );
};

export default MetricsDictionary;
