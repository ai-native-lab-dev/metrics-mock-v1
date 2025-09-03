import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MetricsOverview from './views/MetricsOverview';
import CSChannelTrends from './views/CSChannelTrends';
import CXImpact from './views/CXImpact';
import Methodology from './views/Methodology';
import ChannelMatrixRules from './views/ChannelMatrixRules';
import MetricsDictionary from './views/MetricsDictionary';
import CustomerInteractionMatrix from './views/CustomerInteractionMatrix';
import InteractionFramework from './views/InteractionFramework';
import Interpretation from './views/Interpretation';

// Define all possible view types for the dashboard
export type ViewType = 'home' | 'metrics' | 'metrics-total' | 'metrics-bot' | 'metrics-csa' | 'metrics-visit' | 'cs-channel-trends-repeat' | 'cs-channel-trends-no-repeat' | 'cx-impact-p95' | 'cx-impact-p90' | 'methodology' | 'dictionary' | 'channel-matrix-rules' | 'interaction-framework' | 'customer-interaction-matrix' | 'interpretation' | 'faqs';

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
        return 'Self-Service: Bot Channels';
      case 'metrics-csa':
        return 'Human-Led: CSA Channels';
      case 'metrics-visit':
        return 'Self-Guided: Visit Channels';
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
      case 'interaction-framework':
        return 'Customer Interaction Framework';
      case 'customer-interaction-matrix':
        return 'Customer Interaction Matrix';
      case 'interpretation':
        return 'Interpretation';
      case 'faqs':
        return 'Frequently Asked Questions';
      default:
        return 'Dashboard';
    }
  };

  // Render the appropriate content component based on the current view
  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return <MetricsOverview />;
      case 'metrics':
        // Redirect to Total Interactions since we removed "All Metrics Overview"
        return <MetricsOverview showOnlyGroup="Total Interactions" />;
      case 'metrics-total':
        return <MetricsOverview showOnlyGroup="Total Interactions" />;
      case 'metrics-bot':
        return <MetricsOverview showOnlyGroup="Self-Service: Bot Channels" />;
      case 'metrics-csa':
        return <MetricsOverview showOnlyGroup="Human-Led: CSA Channels" />;
      case 'metrics-visit':
        return <MetricsOverview showOnlyGroup="Self-Guided: Visit Channels" />;
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
        return <MetricsDictionary />;
      case 'faqs':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                This section will contain answers to commonly asked questions about the dashboard and its features.
              </p>
            </div>
          </div>
        );
      case 'channel-matrix-rules':
        return <ChannelMatrixRules />;
      case 'interaction-framework':
        return <InteractionFramework />;
      case 'customer-interaction-matrix':
        return <CustomerInteractionMatrix />;
      case 'interpretation':
        return <Interpretation />;
      default:
        return <MetricsOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 min-h-screen">
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
        
        <main className="flex-1 overflow-y-auto p-8 pb-16 bg-gray-100 relative z-10">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
