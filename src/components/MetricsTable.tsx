import React, { useState } from 'react';
import { isValidCombination } from '../utils/channelMatrix';

// Interface for individual metric data
interface MetricData {
  metricName: string;
  question: string;
  definition: string;
  isP90P95?: boolean; // Special flag for P90/P95 metrics that have expandable definitions
  fullDefinition?: string;
  data2025: number[]; // Data for 2025 (12 months or 52 weeks)
  data2024: number[]; // Data for 2024 (12 months or 52 weeks)
}

// Interface for a group of related metrics
interface MetricGroup {
  name: string;
  metrics: MetricData[];
}

// Props interface for the MetricsTable component
interface MetricsTableProps {
  viewType: 'monthly' | 'weekly'; // Determines column headers (months vs weeks)
  metricGroups: MetricGroup[]; // Array of metric groups to display
  onDataCellClick?: (metricName: string, period: string, value: number) => void; // Optional callback for cell clicks
  showOnlyGroup?: string; // Optional filter to show only specific group
  showOnlyMetricType?: string; // Optional filter to show only specific metric type (repeat-base, repeat-rate, no-repeat-base, no-repeat-rate)
  startChannel?: string; // Optional filter for start channel
  endChannel?: string; // Optional filter for end channel
}

const MetricsTable: React.FC<MetricsTableProps> = ({ 
  viewType, 
  metricGroups, 
  onDataCellClick,
  showOnlyGroup,
  showOnlyMetricType,
  startChannel,
  endChannel
}) => {
  // State for tracking which metric groups are expanded (default: all groups)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Total Interactions', 'Self-Service: Bot Channels', 'Human-Led: CSA Channels', 'Self-Guided: Visit Channels']));
  // State for tracking which metric definitions are expanded
  const [expandedDefinitions, setExpandedDefinitions] = useState<Set<string>>(new Set());
  // State for controlling how many weeks to show at a time in weekly view
  const [weeksPerPage, setWeeksPerPage] = useState<number>(13);

  // Toggle the expanded state of a metric group
  const toggleGroup = (groupName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupName)) {
      newExpanded.delete(groupName);
    } else {
      newExpanded.add(groupName);
    }
    setExpandedGroups(newExpanded);
  };

  // Toggle the expanded state of a metric definition
  const toggleDefinition = (metricName: string) => {
    const newExpanded = new Set(expandedDefinitions);
    if (newExpanded.has(metricName)) {
      newExpanded.delete(metricName);
    } else {
      newExpanded.add(metricName);
    }
    setExpandedDefinitions(newExpanded);
  };

  // Get column headers based on view type (monthly = 12 months, weekly = quarters)
  const getColumns = () => {
    if (viewType === 'monthly') {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    } else {
      // Weekly view shows individual weeks with pagination
      const totalWeeks = 52;
      const startWeek = 1;
      const endWeek = Math.min(startWeek + weeksPerPage - 1, totalWeeks);
      
      const weeks = [];
      for (let i = startWeek; i <= endWeek; i++) {
        weeks.push(`Week ${i}`);
      }
      return weeks;
    }
  };

  // Calculate percentage difference between 2025 and 2024 values
  const calculateDiff = (val2025: number, val2024: number): number => {
    if (val2024 === 0) return val2025 > 0 ? 100 : 0;
    return ((val2025 - val2024) / val2024) * 100;
  };

  // Helper function to safely get data values (prevents array index errors)
  const getDataValue = (dataArray: number[], index: number): number => {
    return dataArray[index] ?? 0;
  };

  // Helper function to safely get column name (prevents array index errors)
  const getColumnName = (columns: string[], index: number): string => {
    return columns[index] ?? `Column ${index + 1}`;
  };

  // Helper function to determine the unit for a metric
  const getMetricUnit = (metricName: string): string => {
    const name = metricName.toLowerCase();
    
    // Time-based metrics
    if (name.includes('time') || name.includes('duration') || name.includes('handle time') || name.includes('queue time')) {
      return 'min';
    }
    
    // Percentage-based metrics
    if (name.includes('rate') || name.includes('percentage') || name.includes('bounce rate') || 
        name.includes('resolution rate') || name.includes('escalation rate') || name.includes('transfer rate') ||
        name.includes('satisfaction score') || name.includes('accuracy') || name.includes('fallback rate') ||
        name.includes('completion rate') || name.includes('usage rate') || name.includes('return visitor rate') ||
        name.includes('pages per session') || name.includes('productivity score') || name.includes('multi-turn') ||
        name.includes('repeat interaction rate') || name.includes('first contact resolution') ||
        name.includes('growth') || name.includes('change') || name.includes('trending') ||
        name.includes('average') || name.includes('per customer') || name.includes('per session')) {
      return '%';
    }
    
    // Count-based metrics (everything else)
    return 'Count';
  };

  // Helper function to get business impact indicator for a metric
  const getMetricIndicator = (metricName: string, groupName: string): { 
    type: 'positive' | 'negative' | 'neutral', 
    message: string
  } => {
    const name = metricName.toLowerCase();
    const group = groupName.toLowerCase();
    
    // CSA-related metrics - generally lower is better (less escalation)
    if (group.includes('csa') || group.includes('human')) {
      if (name.includes('start') || name.includes('end')) {
        return {
          type: 'negative',
          message: 'Lower is better generally, but certain situations when higher is better (e.g., successful containment without escalation)'
        };
      }
    }
    
    // Bot/Visit metrics - higher can be desirable for self-service containment
    if (group.includes('bot') || group.includes('visit') || group.includes('self-service') || group.includes('self-guided')) {
      if (name.includes('start') || name.includes('end') || name.includes('usage')) {
        return {
          type: 'positive',
          message: 'Higher is better generally, but certain situations when lower is better (e.g., avoiding unnecessary interactions)'
        };
      }
    }
    
    // Rate metrics - context dependent
    if (name.includes('rate') || name.includes('percentage')) {
      if (name.includes('usage') || name.includes('start') || name.includes('end')) {
        return {
          type: 'neutral',
          message: 'Context dependent - monitor trends to understand channel preference and effectiveness'
        };
      }
    }
    
    // Total interactions - generally higher indicates more engagement
    if (name.includes('total') && group.includes('total')) {
      return {
        type: 'positive',
        message: 'Higher is better generally, but certain situations when lower is better (e.g., reduced customer effort)'
      };
    }
    
    // Default neutral indicator
    return {
      type: 'neutral',
      message: 'Context dependent - monitor trends to understand performance patterns'
    };
  };

  // Get consistent color classes based on group name
  const getGroupColors = (groupName: string): { bg: string; border: string; header: string; dot: string } => {
    if (groupName.includes('P95')) {
      return { bg: 'bg-gradient-to-br from-rose-50 to-pink-50', border: 'border-rose-200', header: 'bg-gradient-to-r from-rose-100 to-pink-100', dot: 'bg-rose-400' };
    } else if (groupName.includes('P90')) {
      return { bg: 'bg-gradient-to-br from-indigo-50 to-violet-50', border: 'border-indigo-200', header: 'bg-gradient-to-r from-indigo-100 to-violet-100', dot: 'bg-indigo-400' };
    } else if (groupName.includes('Total Interactions')) {
      return { bg: 'bg-teal-50', border: 'border-teal-200', header: 'bg-teal-100', dot: 'bg-teal-400' };
    } else if (groupName.includes('Bot Channels')) {
      return { bg: 'bg-blue-50', border: 'border-blue-200', header: 'bg-blue-100', dot: 'bg-blue-400' };
    } else if (groupName.includes('CSA Channels')) {
      return { bg: 'bg-orange-50', border: 'border-orange-200', header: 'bg-orange-100', dot: 'bg-orange-400' };
    } else if (groupName.includes('Visit Channels')) {
      return { bg: 'bg-purple-50', border: 'border-purple-200', header: 'bg-purple-100', dot: 'bg-purple-400' };
    }
    // Default fallback
    return { bg: 'bg-gray-50', border: 'border-gray-200', header: 'bg-gray-100', dot: 'bg-gray-400' };
  };

  // Get pastel color classes for metric cards (consistent with group colors)
  const getMetricCardColors = (groupName: string, metricIndex: number): { bg: string; border: string; header: string } => {
    const groupColors = getGroupColors(groupName);
    
    // Special handling for P90/P95 cards with gradient backgrounds
    if (groupName.includes('P95')) {
      return { 
        bg: 'bg-gradient-to-br from-rose-50 to-pink-50', 
        border: 'border-rose-200', 
        header: 'bg-gradient-to-r from-rose-100 to-pink-100' 
      };
    } else if (groupName.includes('P90')) {
      return { 
        bg: 'bg-gradient-to-br from-indigo-50 to-violet-50', 
        border: 'border-indigo-200', 
        header: 'bg-gradient-to-r from-indigo-100 to-violet-100' 
      };
    }
    
    // Use the same color family but with slight variations for individual metrics
    const variations = [
      { bg: groupColors.bg, border: groupColors.border, header: groupColors.header },
      { bg: groupColors.bg.replace('50', '25'), border: groupColors.border, header: groupColors.header },
      { bg: groupColors.bg, border: groupColors.border.replace('200', '300'), header: groupColors.header },
      { bg: groupColors.bg.replace('50', '25'), border: groupColors.border.replace('200', '300'), header: groupColors.header }
    ];
    return variations[metricIndex % variations.length];
  };

  // Filter groups based on showOnlyGroup prop, or show all groups by default
  const filteredGroups = showOnlyGroup 
    ? metricGroups.filter(group => group.name === showOnlyGroup)
    : metricGroups;

  // Filter metrics within groups based on showOnlyMetricType and channel filters
  const processedGroups = filteredGroups.map(group => ({
    ...group,
    metrics: group.metrics.filter(metric => {
      const name = metric.metricName.toLowerCase();
      
      // Filter by metric type (repeat/no-repeat)
      if (showOnlyMetricType) {
        if (showOnlyMetricType === 'repeat') {
          if (!name.includes('repeat')) return false;
        } else if (showOnlyMetricType === 'no-repeat') {
          if (name.includes('repeat')) return false;
        }
      }
      
      // Filter by start channel
      if (startChannel && startChannel !== 'all') {
        const startMatch = name.includes(`Started in ${startChannel}`);
        if (!startMatch) return false;
      }
      
      // Filter by end channel
      if (endChannel && endChannel !== 'all') {
        const endMatch = name.includes(`Ended in ${endChannel}`);
        if (!endMatch) return false;
      }
      
      // Ensure the combination is valid according to Channel Matrix Rules
      if (startChannel && startChannel !== 'all' && endChannel && endChannel !== 'all') {
        if (!isValidCombination(startChannel, endChannel)) {
          return false;
        }
      }
      
      return true;
    })
  })).filter(group => group.metrics.length > 0);

  const columns = getColumns();

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/60 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ease-out">
      {/* Weekly Pagination Controls */}
      {viewType === 'weekly' && (
        <div className="px-8 py-6 border-b border-gray-200/60 bg-gradient-to-r from-gray-50 to-gray-100/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-sm font-semibold text-gray-700">Weeks per page:</span>
              <div className="flex space-x-3">
                {[13, 26, 39, 52].map((weeks) => (
                  <button
                    key={weeks}
                    onClick={() => setWeeksPerPage(weeks)}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ease-out ${
                      weeksPerPage === weeks
                        ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-500/30 transform scale-105'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md hover:scale-105'
                    }`}
                  >
                    {weeks} weeks
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-600 bg-white/80 px-4 py-2 rounded-lg border border-gray-200">
              Showing weeks 1-{Math.min(weeksPerPage, 52)} of 52
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200/40">
          <thead className="bg-gradient-to-r from-slate-50 via-gray-50 to-slate-100/80 sticky top-0 z-20 shadow-sm">
            <tr>
              <th className="px-8 py-6 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-80 sticky left-0 bg-gradient-to-r from-slate-50 to-gray-50 border-r border-gray-300/60 z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Metric</span>
                </div>
              </th>
              <th className="px-4 py-6 text-center text-xs font-bold text-gray-700 uppercase tracking-wider w-24 sticky left-80 bg-gradient-to-r from-gray-50 to-slate-50 border-r border-gray-300/60 z-10">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Unit</span>
                </div>
              </th>
              {columns.map((column, index) => (
                <th key={index} className="px-3 py-6 text-center text-xs font-bold text-gray-700 uppercase tracking-wider min-w-16 sticky top-0 bg-gradient-to-r from-slate-50 to-gray-50 border-r border-gray-300/60">
                  <div className="text-xs font-bold text-gray-800">
                    {column}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-gray-100/50">
            {processedGroups.map((group) => (
              <React.Fragment key={group.name}>
                {/* Group Header */}
                {(() => {
                  const groupColors = getGroupColors(group.name);
                  const isExpanded = expandedGroups.has(group.name);
                  return (
                    <tr className={`group-header sticky top-20 z-10 ${
                      isExpanded
                        ? groupColors.header
                        : groupColors.bg
                    }`}>
                      <td colSpan={columns.length + 2}>
                        <button
                          onClick={() => toggleGroup(group.name)}
                          className={`w-full px-8 py-6 text-left flex items-center justify-between transition-all duration-500 ease-out group hover:shadow-lg rounded-lg mx-2 my-1 ${
                            isExpanded 
                              ? 'bg-white/80 shadow-md border border-gray-200/60' 
                              : 'hover:bg-white/60'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-4 h-4 rounded-full shadow-sm transition-all duration-300 ${
                              isExpanded ? groupColors.dot : 'bg-gray-400'
                            }`}></div>
                            <span className={`text-base font-bold transition-colors duration-300 ${
                              isExpanded 
                                ? 'text-gray-900' 
                                : 'text-gray-700 group-hover:text-gray-900'
                            }`}>
                              {group.name}
                            </span>
                            <div className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                              isExpanded
                                ? 'bg-white/80 text-gray-700 shadow-sm'
                                : 'bg-gray-200/60 text-gray-600'
                            }`}>
                              {group.metrics.length} metrics
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                              isExpanded
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isExpanded ? 'Expanded' : 'Collapsed'}
                            </div>
                            <svg
                              className={`w-6 h-6 transition-all duration-500 ease-out ${
                                isExpanded
                                  ? 'rotate-180 text-gray-700'
                                  : 'text-gray-500 group-hover:text-gray-700'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                      </td>
                    </tr>
                  );
                })()}

                {/* Metric Rows */}
                {expandedGroups.has(group.name) && group.metrics.map((metric, metricIndex) => {
                  const colors = getMetricCardColors(group.name, metricIndex);
                  return (
                  <React.Fragment key={metric.metricName}>
                    {/* Metric Card Container */}
                    <tr>
                      <td colSpan={columns.length + 2} className="p-0">
                        <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl m-6 shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-[1.02]`}>
                          {/* Metric Info Block */}
                          <div className={`p-8 border-b ${colors.border} bg-gradient-to-br from-white/80 to-white/40`}>
                            <div className="space-y-8">
                              {/* Metric Name and Question */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className={`${colors.header} rounded-xl p-6 border-2 ${colors.border} shadow-sm hover:shadow-md transition-all duration-300`}>
                                  <div className="flex items-center space-x-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">METRIC NAME</div>
                                  </div>
                                  <div className="text-lg font-bold text-gray-900 leading-relaxed">{metric.metricName}</div>
                                </div>
                                
                                <div className={`${colors.header} rounded-xl p-6 border-2 ${colors.border} shadow-sm hover:shadow-md transition-all duration-300`}>
                                  <div className="flex items-center space-x-2 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">QUESTION IT ANSWERS</div>
                                  </div>
                                  <div className="text-sm text-gray-700 leading-relaxed">{metric.question}</div>
                                </div>
                              </div>
                              
                              {/* Definition Section */}
                              <div className={`${colors.header} rounded-xl p-6 border-2 ${colors.border} shadow-sm hover:shadow-md transition-all duration-300`}>
                                <div className="flex items-center space-x-2 mb-3">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">DEFINITION</div>
                                </div>
                                
                                {metric.isP90P95 ? (
                                  <div>
                                    <div className="text-sm text-gray-700 mb-3 leading-relaxed">{metric.definition}</div>
                                    {metric.fullDefinition && (
                                      <div>
                                        <button
                                          onClick={() => toggleDefinition(metric.metricName)}
                                          className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200 ease-out"
                                        >
                                          {expandedDefinitions.has(metric.metricName) ? 'Hide Full Definition' : 'Show Full Definition'}
                                        </button>
                                        {expandedDefinitions.has(metric.metricName) && (
                                          <div className="mt-3 p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-700">
                                            {metric.fullDefinition}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-700 leading-relaxed">{metric.definition}</div>
                                )}
                              </div>
                              
                              {/* Potential Interpretation */}
                              {(() => {
                                const indicator = getMetricIndicator(metric.metricName, group.name);
                                return (
                                  <div className="border-t border-gray-200 pt-4">
                                    <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                                      POTENTIAL INTERPRETATION
                                    </div>
                                    <div className="text-sm text-gray-700 leading-relaxed">
                                      {indicator.message}
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                          
                          {/* Data Table */}
                          <div className="overflow-x-auto bg-gradient-to-r from-gray-50/50 to-white/50">
                            <table className="min-w-full">
                              <thead>
                                <tr className="bg-gray-100/60">
                                  <th className="px-8 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-80 bg-gray-100/60 border-r border-gray-200/60">
                                    <span>Year</span>
                                  </th>
                                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-24 bg-gray-100/60 border-r border-gray-200/60">
                                    <span>Unit</span>
                                  </th>
                                  {columns.map((column, index) => (
                                    <th key={index} className="px-3 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-16 bg-gray-100/60 border-r border-gray-200/60">
                                      <span className="text-xs font-semibold text-gray-700">
                                        {column}
                                      </span>
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {/* Data Rows */}
                                <tr className="border-t border-gray-200/60 hover:bg-gray-50/30 transition-colors duration-300">
                                  <td className="px-8 py-5 text-sm font-bold text-gray-900 bg-gray-50/50 border-r border-gray-200/60 w-80 text-center">
                                    <span className="text-gray-700">2025</span>
                                  </td>
                                  <td className="px-4 py-5 text-sm text-center bg-gray-50/50 border-r border-gray-200/60 w-24">
                                    <span className="text-xs font-medium text-gray-600">
                                      {getMetricUnit(metric.metricName)}
                                    </span>
                                  </td>
                                  {columns.map((_, colIndex) => {
                                    const value = getDataValue(metric.data2025, colIndex);
                                    const indicator = getMetricIndicator(metric.metricName, group.name);
                                    return (
                                      <td key={colIndex} className="px-3 py-5 text-sm text-center border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                                        <button
                                          onClick={() => onDataCellClick?.(metric.metricName, getColumnName(columns, colIndex), value)}
                                          className={`w-full px-3 py-2 rounded-lg hover:shadow-sm transition-all duration-300 ease-out font-semibold hover:text-blue-800 ${
                                            indicator.type === 'positive' 
                                              ? 'hover:bg-green-100 text-gray-900' 
                                              : indicator.type === 'negative'
                                              ? 'hover:bg-orange-100 text-gray-900'
                                              : 'hover:bg-blue-100 text-gray-900'
                                          }`}
                                          title={indicator.message}
                                        >
                                          {value.toLocaleString()}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr className="border-t border-gray-200/60 bg-gray-50/30 hover:bg-gray-50/50 transition-colors duration-300">
                                  <td className="px-8 py-5 text-sm font-bold text-gray-900 bg-gray-100/50 border-r border-gray-200/60 w-80 text-center">
                                    <span className="text-gray-700">2024</span>
                                  </td>
                                  <td className="px-4 py-5 text-sm text-center bg-gray-100/50 border-r border-gray-200/60 w-24">
                                    <span className="text-xs font-medium text-gray-600">
                                      {getMetricUnit(metric.metricName)}
                                    </span>
                                  </td>
                                  {columns.map((_, colIndex) => {
                                    const value = getDataValue(metric.data2024, colIndex);
                                    return (
                                      <td key={colIndex} className="px-3 py-5 text-sm text-center bg-gray-50/30 border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                                        <button
                                          onClick={() => onDataCellClick?.(metric.metricName, getColumnName(columns, colIndex), value)}
                                          className="w-full px-3 py-2 rounded-lg hover:bg-orange-100 hover:shadow-sm transition-all duration-300 ease-out font-semibold text-gray-900 hover:text-orange-800"
                                        >
                                          {value.toLocaleString()}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr className="border-t border-gray-200/60 hover:bg-gray-50/30 transition-colors duration-300">
                                  <td className="px-8 py-5 text-sm font-bold text-gray-900 bg-gray-50/50 border-r border-gray-200/60 w-80 text-center">
                                    <span className="text-gray-700">Diff %</span>
                                  </td>
                                  <td className="px-4 py-5 text-sm text-center bg-gray-50/50 border-r border-gray-200/60 w-24">
                                    <span className="text-xs font-medium text-gray-600">%</span>
                                  </td>
                                  {columns.map((_, colIndex) => {
                                    const val2025 = getDataValue(metric.data2025, colIndex);
                                    const val2024 = getDataValue(metric.data2024, colIndex);
                                    const diff = calculateDiff(val2025, val2024);
                                    return (
                                      <td key={colIndex} className="px-3 py-5 text-sm text-center border-r border-gray-200/60 hover:bg-gray-50/50 transition-colors duration-200">
                                        <span className={`font-bold px-3 py-2 rounded-lg text-sm shadow-sm transition-all duration-300 ${
                                          diff >= 0 
                                            ? 'text-green-800 bg-green-100 border border-green-200 hover:bg-green-200' 
                                            : 'text-red-800 bg-red-100 border border-red-200 hover:bg-red-200'
                                        }`}>
                                          {diff >= 0 ? '+' : ''}{diff.toFixed(1)}%
                                        </span>
                                      </td>
                                    );
                                  })}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricsTable;
