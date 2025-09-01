import React, { useState } from 'react';

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
}

const MetricsTable: React.FC<MetricsTableProps> = ({ 
  viewType, 
  metricGroups, 
  onDataCellClick,
  showOnlyGroup,
  showOnlyMetricType
}) => {
  // State for tracking which metric groups are expanded (default: all groups)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['Total Interactions', 'Self-Service: Bot Only', 'Human-Led: CSA Only', 'Self-Guided: Page Visits']));
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

  // Get consistent color classes based on group name
  const getGroupColors = (groupName: string): { bg: string; border: string; header: string; dot: string } => {
    if (groupName.includes('Total Interactions')) {
      return { bg: 'bg-teal-50', border: 'border-teal-200', header: 'bg-teal-100', dot: 'bg-teal-400' };
    } else if (groupName.includes('Bot')) {
      return { bg: 'bg-blue-50', border: 'border-blue-200', header: 'bg-blue-100', dot: 'bg-blue-400' };
    } else if (groupName.includes('CSA') || groupName.includes('Human')) {
      return { bg: 'bg-orange-50', border: 'border-orange-200', header: 'bg-orange-100', dot: 'bg-orange-400' };
    } else if (groupName.includes('Visit') || groupName.includes('Page')) {
      return { bg: 'bg-purple-50', border: 'border-purple-200', header: 'bg-purple-100', dot: 'bg-purple-400' };
    }
    // Default fallback
    return { bg: 'bg-gray-50', border: 'border-gray-200', header: 'bg-gray-100', dot: 'bg-gray-400' };
  };

  // Get pastel color classes for metric cards (consistent with group colors)
  const getMetricCardColors = (groupName: string, metricIndex: number): { bg: string; border: string; header: string } => {
    const groupColors = getGroupColors(groupName);
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

  // Filter metrics within groups based on showOnlyMetricType prop
  const processedGroups = showOnlyMetricType 
    ? filteredGroups.map(group => ({
        ...group,
        metrics: group.metrics.filter(metric => {
          // Filter based on metric name patterns
          const name = metric.metricName.toLowerCase();
          if (showOnlyMetricType === 'repeat') {
            return name.includes('repeat');
          } else if (showOnlyMetricType === 'no-repeat') {
            return !name.includes('repeat');
          }
          return true;
        })
      }))
    : filteredGroups;

  const columns = getColumns();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-out">
      {/* Weekly Pagination Controls */}
      {viewType === 'weekly' && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Weeks per page:</span>
              <div className="flex space-x-2">
                {[13, 26, 39, 52].map((weeks) => (
                  <button
                    key={weeks}
                    onClick={() => setWeeksPerPage(weeks)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      weeksPerPage === weeks
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {weeks} weeks
                  </button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Showing weeks 1-{Math.min(weeksPerPage, 52)} of 52
            </div>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100/50">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 sticky top-0 z-20">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-80 sticky left-0 bg-gray-50 border-r border-gray-200 z-10">
                Metric
              </th>
              <th className="px-4 py-5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-24 sticky left-80 bg-gray-50 border-r border-gray-200 z-10">
                Unit
              </th>
              {columns.map((column, index) => (
                <th key={index} className="px-3 py-5 text-center text-xs font-bold text-gray-600 uppercase tracking-wider min-w-16 sticky top-0 bg-gray-50 border-r border-gray-200">
                  <div className="text-xs font-bold text-gray-700">
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
                  return (
                    <tr className={`group-header sticky top-20 z-10 ${
                      expandedGroups.has(group.name)
                        ? groupColors.header
                        : groupColors.bg
                    }`}>
                      <td colSpan={columns.length + 2}>
                        <button
                          onClick={() => toggleGroup(group.name)}
                          className={`w-full px-8 py-5 text-left flex items-center justify-between transition-all duration-300 ease-out group hover:${groupColors.header.replace('bg-', 'bg-').replace('100', '200')}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              expandedGroups.has(group.name) ? groupColors.dot : 'bg-gray-400'
                            }`}></div>
                        <span className="text-sm font-bold text-gray-900 group-hover:text-gray-700">
                          {group.name}
                        </span>
                      </div>
                                                   <svg
                               className={`w-5 h-5 transition-transform duration-300 ease-out ${
                                 expandedGroups.has(group.name)
                                   ? 'rotate-180 text-gray-600'
                                   : 'text-gray-500'
                               }`}
                               fill="none"
                               stroke="currentColor"
                               viewBox="0 0 24 24"
                             >
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                             </svg>
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
                        <div className={`${colors.bg} border-2 ${colors.border} rounded-xl m-4 shadow-sm hover:shadow-md transition-all duration-300 ease-out`}>
                          {/* Metric Info Block */}
                          <div className={`p-6 border-b ${colors.border}`}>
                            <div className="space-y-6">
                              {/* Metric Name and Question */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className={`${colors.header} rounded-lg p-4 border ${colors.border}`}>
                                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">METRIC NAME</div>
                                  <div className="text-base font-bold text-gray-900">{metric.metricName}</div>
                                </div>
                                
                                <div className={`${colors.header} rounded-lg p-4 border ${colors.border}`}>
                                  <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">QUESTION IT ANSWERS</div>
                                  <div className="text-sm text-gray-700 leading-relaxed">{metric.question}</div>
                                </div>
                              </div>
                              
                              {/* Definition Section */}
                              <div className={`${colors.header} rounded-lg p-4 border ${colors.border}`}>
                                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">DEFINITION</div>
                                
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
                            </div>
                          </div>
                          
                          {/* Data Table */}
                          <div className="overflow-x-auto">
                            <table className="min-w-full">
                              <tbody>

                                {/* Data Rows */}
                                <tr className="border-t border-gray-200">
                                  <td className="px-8 py-4 text-sm font-bold text-gray-900 bg-gray-50 border-r border-gray-200 sticky left-0 z-5">
                                    2025
                                  </td>
                                  <td className="px-4 py-4 text-sm text-center bg-gray-50 border-r border-gray-200 sticky left-80 z-5 w-24">
                                    <span className="text-xs font-medium text-gray-600">
                                      {getMetricUnit(metric.metricName)}
                                    </span>
                                  </td>
                                  {columns.map((_, colIndex) => {
                                    const value = getDataValue(metric.data2025, colIndex);
                                    return (
                                      <td key={colIndex} className="px-3 py-4 text-sm text-center border-r border-gray-200">
                                        <button
                                          onClick={() => onDataCellClick?.(metric.metricName, getColumnName(columns, colIndex), value)}
                                          className="w-full px-3 py-2 rounded hover:bg-gray-100 transition-all duration-200 ease-out font-medium text-gray-900"
                                        >
                                          {value.toLocaleString()}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr className="border-t border-gray-200 bg-gray-50/30">
                                  <td className="px-8 py-4 text-sm font-bold text-gray-900 bg-gray-100 border-r border-gray-200 sticky left-0 z-5">
                                    2024
                                  </td>
                                  <td className="px-4 py-4 text-sm text-center bg-gray-100 border-r border-gray-200 sticky left-80 z-5 w-24">
                                    <span className="text-xs font-medium text-gray-600">
                                      {getMetricUnit(metric.metricName)}
                                    </span>
                                  </td>
                                  {columns.map((_, colIndex) => {
                                    const value = getDataValue(metric.data2024, colIndex);
                                    return (
                                      <td key={colIndex} className="px-3 py-4 text-sm text-center bg-gray-50/30 border-r border-gray-200">
                                        <button
                                          onClick={() => onDataCellClick?.(metric.metricName, getColumnName(columns, colIndex), value)}
                                          className="w-full px-3 py-2 rounded hover:bg-gray-100 transition-all duration-200 ease-out font-medium text-gray-900"
                                        >
                                          {value.toLocaleString()}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                                <tr className="border-t border-gray-200">
                                  <td className="px-8 py-4 text-sm font-bold text-gray-900 bg-gray-50 border-r border-gray-200 sticky left-0 z-5">
                                    Diff %
                                  </td>
                                  <td className="px-4 py-4 text-sm text-center bg-gray-50 border-r border-gray-200 sticky left-80 z-5 w-24">
                                    <span className="text-xs font-medium text-gray-600">%</span>
                                  </td>
                                  {columns.map((_, colIndex) => {
                                    const val2025 = getDataValue(metric.data2025, colIndex);
                                    const val2024 = getDataValue(metric.data2024, colIndex);
                                    const diff = calculateDiff(val2025, val2024);
                                    return (
                                      <td key={colIndex} className="px-3 py-4 text-sm text-center border-r border-gray-200">
                                        <span className={`font-medium px-2 py-1 rounded text-sm ${
                                          diff >= 0 
                                            ? 'text-green-700 bg-green-50' 
                                            : 'text-red-700 bg-red-50'
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
