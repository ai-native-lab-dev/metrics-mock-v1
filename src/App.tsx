import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricsOverview from './views/MetricsOverview';
import CSChannelTrends from './views/CSChannelTrends';
import CXImpact from './views/CXImpact';
import Methodology from './views/Methodology';
import ChannelMatrixRules from './views/ChannelMatrixRules';

// Define all possible view types for the dashboard
export type ViewType = 'home' | 'metrics' | 'metrics-total' | 'metrics-bot' | 'metrics-csa' | 'metrics-visit' | 'cs-channel-trends-repeat' | 'cs-channel-trends-no-repeat' | 'cx-impact-p95' | 'cx-impact-p90' | 'methodology' | 'dictionary' | 'channel-matrix-rules' | 'faqs';

function App() {
  // State management for the main dashboard
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get the appropriate header title based on the current view
  const getHeaderTitle = (view: ViewType): string => {
    switch (view) {
      case 'home':
        return 'Dashboard Home';
      case 'metrics':
        return 'Metrics Overview';
      case 'metrics-total':
        return 'Total Interactions';
      case 'metrics-bot':
        return 'Self-Service: Bot Only';
      case 'metrics-csa':
        return 'Human-Led: CSA Only';
      case 'metrics-visit':
        return 'Self-Guided: Page Visits';
      case 'cs-channel-trends-repeat':
        return 'CS Channel Trends: Repeat';
      case 'cs-channel-trends-no-repeat':
        return 'CS Channel Trends: No Repeat';
      case 'cx-impact-p95':
      case 'cx-impact-p90':
        return 'CX Impact Analysis';
      case 'methodology':
        return 'Methodology';
      case 'dictionary':
        return 'Metrics Dictionary';
      case 'channel-matrix-rules':
        return 'Channel Matrix Rules';
      case 'faqs':
        return 'Frequently Asked Questions';
      default:
        return 'Dashboard';
    }
  };

  // Helper function to parse metric view types
  const parseMetricView = (view: ViewType) => {
    if (!view.startsWith('metrics-')) return null;
    
    const parts = view.split('-');
    if (parts.length < 2) return null;
    
    const category = parts[1]; // total, bot, csa, visit
    const metricType = parts.slice(2).join('-'); // repeat-base, repeat-rate, no-repeat-base, no-repeat-rate, or empty
    
    return { category, metricType };
  };

  // Render the appropriate content component based on the current view
  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
      case 'metrics':
        return <MetricsOverview />;
      
      // Handle all metric views
      default:
        if (currentView.startsWith('metrics-')) {
          const parsed = parseMetricView(currentView);
          if (parsed) {
            const { category, metricType } = parsed;
            
            // Map category to group name
            const groupMap: Record<string, string> = {
              'total': 'Total Interactions',
              'bot': 'Self-Service: Bot Only',
              'csa': 'Human-Led: CSA Only',
              'visit': 'Self-Guided: Page Visits'
            };
            
            const groupName = groupMap[category];
            if (groupName) {
              return <MetricsOverview 
                showOnlyGroup={groupName} 
                showOnlyMetricType={metricType || undefined}
              />;
            }
          }
        }
        break;
      case 'cs-channel-trends-repeat':
        return <CSChannelTrends type="repeat" onNavigate={setCurrentView} />;
      case 'cs-channel-trends-no-repeat':
        return <CSChannelTrends type="no-repeat" onNavigate={setCurrentView} />;
      case 'cx-impact-p95':
      case 'cx-impact-p90':
        return <CXImpact metricGroup={currentView} />;
      case 'methodology':
        return <Methodology />;
      case 'dictionary':
      case 'faqs':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentView === 'dictionary' ? 'Metrics Dictionary' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600">
                {currentView === 'dictionary' 
                  ? 'This section will contain detailed definitions and explanations of all metrics used in the dashboard.'
                  : 'This section will contain answers to commonly asked questions about the dashboard and its features.'
                }
              </p>
            </div>
          </div>
        );
      case 'channel-matrix-rules':
        return <ChannelMatrixRules />;
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-25">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={getHeaderTitle(currentView)}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-8 bg-gray-25">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
