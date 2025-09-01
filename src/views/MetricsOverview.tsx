import React, { useState } from 'react';
import Controls from '../components/Controls';
import MetricsTable from '../components/MetricsTable';
import { mockMetricGroups } from '../data/mockData';

interface MetricsOverviewProps {
  showOnlyGroup?: string;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ showOnlyGroup }) => {
  const [viewType, setViewType] = useState<'monthly' | 'weekly'>('monthly');
  const [metricType, setMetricType] = useState<'repeat' | 'no-repeat' | 'all'>('all');

  return (
    <div>
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
        showOnlyMetricType={metricType === 'all' ? undefined : metricType}
      />
    </div>
  );
};

export default MetricsOverview;