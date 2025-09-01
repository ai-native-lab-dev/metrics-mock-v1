import React, { useState, useMemo } from 'react';
import Controls from '../components/Controls';
import MetricsTable from '../components/MetricsTable';
import { mockMetricGroups } from '../data/mockData';
import { ALL_CHANNELS, getValidEndChannels, isValidCombination } from '../utils/channelMatrix';

interface MetricsOverviewProps {
  showOnlyGroup?: string;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ showOnlyGroup }) => {
  const [viewType, setViewType] = useState<'monthly' | 'weekly'>('monthly');
  const [metricType, setMetricType] = useState<'repeat' | 'no-repeat'>('repeat');
  const [startChannel, setStartChannel] = useState<string>('all');
  const [endChannel, setEndChannel] = useState<string>('all');

  // Channel options based on Channel Matrix Rules
  const startChannels = useMemo(() => [
    { value: 'all', label: 'All Start Channels' },
    ...ALL_CHANNELS.map(channel => ({ value: channel, label: channel }))
  ], []);

  // Get valid end channels based on selected start channel and current group context
  const validEndChannels = useMemo(() => {
    let validEnds: string[];
    
    if (startChannel === 'all') {
      // When "All Start Channels" is selected, show all channels for the current group context
      if (showOnlyGroup) {
        if (showOnlyGroup.includes('Visit Channels')) {
          validEnds = ['CS Landing Page', 'CS Homepage', 'Help Pages'];
        } else if (showOnlyGroup.includes('Bot Channels')) {
          validEnds = ['CS Chatbot', 'CS Voicebot', 'AI-enabled Email', 'Legacy Chatbot', 'Legacy Voicebot'];
        } else if (showOnlyGroup.includes('CSA Channels')) {
          validEnds = ['CSA Chat', 'CSA Voice', 'CSA Email'];
        } else {
          validEnds = ALL_CHANNELS;
        }
      } else {
        validEnds = ALL_CHANNELS;
      }
    } else {
      // When a specific start channel is selected, get valid end channels and restrict by group context
      validEnds = getValidEndChannels(startChannel);
      
      if (showOnlyGroup) {
        if (showOnlyGroup.includes('Visit Channels')) {
          validEnds = validEnds.filter(channel => 
            channel === 'CS Landing Page' || 
            channel === 'CS Homepage' || 
            channel === 'Help Pages'
          );
        } else if (showOnlyGroup.includes('Bot Channels')) {
          validEnds = validEnds.filter(channel => 
            channel === 'CS Chatbot' || 
            channel === 'CS Voicebot' || 
            channel === 'AI-enabled Email' || 
            channel === 'Legacy Chatbot' || 
            channel === 'Legacy Voicebot'
          );
        } else if (showOnlyGroup.includes('CSA Channels')) {
          validEnds = validEnds.filter(channel => 
            channel === 'CSA Chat' || 
            channel === 'CSA Voice' || 
            channel === 'CSA Email'
          );
        }
      }
    }
    
    return [
      { value: 'all', label: 'All End Channels' },
      ...validEnds.map(channel => ({ value: channel, label: channel }))
    ];
  }, [startChannel, showOnlyGroup]);

  // Handle start channel change and reset end channel if invalid
  const handleStartChannelChange = (newStartChannel: string) => {
    setStartChannel(newStartChannel);
    
    // If current end channel is not valid for new start channel, reset it
    if (endChannel !== 'all' && !isValidCombination(newStartChannel, endChannel)) {
      setEndChannel('all');
    }
  };

  return (
    <div>
      {/* Multi-Level Channel Filters */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 backdrop-blur-sm rounded-2xl border border-cyan-200/60 p-6 shadow-lg mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-cyan-800 mb-2 flex items-center">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
            Channel Filters
          </h3>
          <p className="text-sm text-cyan-700">
            Filter metrics by channel combinations. Select a specific start channel to see only valid end channels, 
            or select "All Start Channels" to see all possible end channels for this metrics group.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Channel Filter */}
          <div>
            <label className="block text-sm font-semibold text-cyan-700 mb-3">Start Channel</label>
            <select
              value={startChannel}
              onChange={(e) => handleStartChannelChange(e.target.value)}
              className="w-full px-4 py-3 border border-cyan-200 bg-white/80 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 transition-all duration-200"
            >
              {startChannels.map(channel => (
                <option key={channel.value} value={channel.value}>
                  {channel.label}
                </option>
              ))}
            </select>
          </div>

          {/* End Channel Filter */}
          <div>
            <label className="block text-sm font-semibold text-cyan-700 mb-3">
              End Channel
              {startChannel === 'all' && (
                <span className="ml-2 text-xs text-cyan-600 font-normal">
                  (All possible end channels shown)
                </span>
              )}
            </label>
            <select
              value={endChannel}
              onChange={(e) => setEndChannel(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 transition-all duration-200 ${
                startChannel === 'all' 
                  ? 'border-cyan-200 bg-cyan-100/80 text-cyan-700' 
                  : 'border-cyan-200 bg-white/80'
              }`}
              disabled={startChannel === 'all'}
            >
              {validEndChannels.map(channel => (
                <option key={channel.value} value={channel.value}>
                  {channel.label}
                </option>
              ))}
            </select>
            {startChannel === 'all' && (
              <p className="mt-2 text-xs text-cyan-600">
                When "All Start Channels" is selected, all possible end channels are shown based on the current metrics group.
              </p>
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setStartChannel('all');
              setEndChannel('all');
            }}
            className="px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-800 hover:bg-cyan-100 rounded-lg transition-colors duration-200"
          >
            Clear Channel Filters
          </button>
        </div>
      </div>

      <Controls 
        viewType={viewType} 
        onViewTypeChange={setViewType}
        metricType={metricType}
        onMetricTypeChange={setMetricType}
      />
      
      <MetricsTable 
        viewType={viewType} 
        metricGroups={mockMetricGroups}
        showOnlyGroup={showOnlyGroup}
        showOnlyMetricType={metricType}
        startChannel={startChannel}
        endChannel={endChannel}
      />
    </div>
  );
};

export default MetricsOverview;