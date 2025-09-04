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
export type ViewType = 'home' | 'metrics' | 'metrics-total' | 'metrics-bot' | 'metrics-csa' | 'metrics-visit' | 'cs-channel-trends-repeat' | 'cs-channel-trends-no-repeat' | 'cx-impact-p95' | 'cx-impact-p90' | 'methodology' | 'dictionary' | 'channel-matrix-rules' | 'interaction-framework' | 'customer-interaction-matrix' | 'interpretation' | 'faqs' | 'egregious-high-volume-repeats' | 'shopping-churn-high-volume-repeats' | 'no-repeat-negative-sentiment';

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
        return 'Channel Matrix';
      case 'interaction-framework':
        return 'Customer Interaction Framework';
      case 'customer-interaction-matrix':
        return 'Customer Interaction Matrix';
      case 'interpretation':
        return 'Interpretation';
      case 'egregious-high-volume-repeats':
        return 'Egregious Repeats';
      case 'shopping-churn-high-volume-repeats':
        return 'Shopping Churn Signal';
      case 'no-repeat-negative-sentiment':
        return 'No-Repeat Dissatisfaction';
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
      case 'egregious-high-volume-repeats':
        return (
          <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header with Export */}
              <div className="bg-black text-white py-8 px-8">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-white">EGREGIOUS & HIGH-VOLUME REPEATS</h1>
                  <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
                    "I Had to Contact Amazon Too Many Times"
                  </p>
                </div>
              </div>
              
              {/* Export Controls */}
              <div className="bg-white px-8 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last updated:</span> {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export PDF
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="egregious-repeats-content" className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 p-8">
              <div className="prose prose-lg max-w-none">

              {/* Metric Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Metric</h3>
                <p className="text-gray-700 text-lg">Repeat Interactions Started in Any CS Channel and Ended in Contact (Bot + CSA) (3–13 Repeats)</p>
              </div>

              {/* CX Question */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">CX Question</h3>
                <p className="text-gray-700 text-lg">Why did I have to contact Amazon three or more times in a week?</p>
              </div>

              {/* Definition */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Definition</h3>
                                  <p className="text-lg text-gray-700 leading-relaxed">
                    Measures the number of customers with <strong>3–13 contacts in a 7-day rolling window</strong>, across self-service (Chatbots, Voicebots, Legacy Bots) and human-led channels (CSA chat, voice, email). We also considered P95 = 34, but the likelihood of noisy data increases significantly so we set the cutoff at P90 = 13 to stay more objective.
                  </p>
              </div>

              {/* Why Important */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Important?</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By the third contact, a customer has already put in reasonable effort. More returns almost always signal frustration and a broken experience, making 3+ repeats a clear marker of <strong>egregious effort</strong>.
                </p>
              </div>

                              {/* Chart Placeholder */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Chart</h3>
                  <div className="bg-white border border-gray-300 rounded-lg p-6">
                    <div className="text-center text-red-600 text-lg font-semibold">
                      Insert Chart
                    </div>
                  </div>
                </div>

              {/* Data Table */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">3+ REPEAT CONTACT VOLUME</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">3+ REPEAT CONTACT VOLUME</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Unit</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jan</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Feb</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Mar</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Apr</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">May</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jun</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jul</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Aug</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Sep</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Oct</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Nov</th>
                        <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Dec</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">2025 Actual</td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,847</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">3,156</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,934</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,678</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,445</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,189</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,034</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,876</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,723</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,598</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,534</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,412</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">2024 Actual</td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,476</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,817</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,719</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,819</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,521</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,233</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">2,075</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,955</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,833</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,702</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,582</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">1,567</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Difference</td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">+371</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">+339</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">+215</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-141</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-76</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-44</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-41</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-79</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-110</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-104</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-48</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-33</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold">-45</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+15%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+12%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+8%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-5%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-3%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-1%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-4%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-6%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-3%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                        <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm italic text-gray-600 mt-4">
                  <strong>Note:</strong> Positive and Negative are not necessarily better or worse, they are just directional YoY changes, e.g., there are healthy REPEATS, and there are also unhealthy NO REPEATS.
                </p>
              </div>
              </div>
            </div>
          </div>
        );
      case 'shopping-churn-high-volume-repeats':
        return (
          <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header with Export */}
              <div className="bg-black text-white py-8 px-8">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-white">SHOPPING CHURN SIGNAL</h1>
                  <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
                    "I Gave Up and Shopped Less"
                  </p>
                </div>
              </div>
              
              {/* Export Controls */}
              <div className="bg-white px-8 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last updated:</span> {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export PDF
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="shopping-churn-content" className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 p-8">
              <div className="prose prose-lg max-w-none">

                {/* Metric Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Metric</h3>
                  <p className="text-gray-700 text-lg">Repeat Interactions Started in Any CS Channel and Ended in Contact (Bot + CSA) (4–13 Repeats)</p>
                </div>

                {/* CX Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">CX Question</h3>
                  <p className="text-gray-700 text-lg">Why, after four or more attempts, do I feel so dissatisfied that I start shopping less with Amazon?</p>
                </div>

                {/* Definition */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Definition</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Measures the number of customers with <strong>4–13 contacts in a 7-day rolling window</strong>. A causal inference econometric study of U.S. marketplace customers (Jan–Jul 2025) showed that those with 4+ repeats reduced their annual spend by a factor of three. We also considered P95 = 34, but the likelihood of noisy data increases significantly so we set the cutoff at P90 = 13 to stay more objective.
                  </p>
                </div>

                {/* Why Important */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Important?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Four or more repeats are not just an effort signal — they are a shopping churn signal. Customers with 4+ repeats display silent dissatisfaction and reduce their annual spend by 3x, creating both a CX and business impact.
                  </p>
                </div>

                {/* Chart Placeholder */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Chart</h3>
                  <div className="bg-white border border-gray-300 rounded-lg p-6">
                    <div className="text-center text-red-600 text-lg font-semibold">
                      Insert Chart
                    </div>
                  </div>
                </div>

                {/* Data Table */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">4+ REPEAT CONTACT VOLUME</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">4+ REPEAT CONTACT VOLUME</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Unit</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jan</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Feb</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Mar</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Apr</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">May</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jun</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jul</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Aug</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Sep</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Oct</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Nov</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Dec</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">2025 Actual</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">342</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">287</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">156</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">423</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">198</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">267</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">389</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">134</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">456</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">312</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">178</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">234</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">2024 Actual</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">298</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">245</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">189</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">356</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">167</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">223</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">312</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">145</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">378</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">267</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">156</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">198</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Difference</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+44</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+42</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">-33</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+67</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+31</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+44</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+77</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">-11</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+78</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+45</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+22</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+36</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+18%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+14%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+9%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-6%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-4%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-3%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-5%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-7%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-4%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-3%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm italic text-gray-600 mt-4">
                    <strong>Note:</strong> Positive and Negative are not necessarily better or worse, they are just directional YoY changes, e.g., there are healthy REPEATS, and there are also unhealthy NO REPEATS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'no-repeat-negative-sentiment':
        return (
          <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header with Export */}
              <div className="bg-black text-white py-8 px-8">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold text-white">NO-REPEAT DISSATISFACTION</h1>
                  <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
                    "Even One Contact Left Me Dissatisfied"
                  </p>
                </div>
              </div>
              
              {/* Export Controls */}
              <div className="bg-white px-8 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last updated:</span> {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Export PDF
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="no-repeat-dissatisfaction-content" className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 p-8">
              <div className="prose prose-lg max-w-none">
                {/* Metric Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Metric</h3>
                  <p className="text-lg text-gray-700">Repeat Interactions Started in Any CS Channel and Ended in Contact (Bot + CSA)</p>
                </div>

                {/* CX Question */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">CX Question</h3>
                  <p className="text-lg text-gray-700">Why did even a single interaction with Amazon leave me dissatisfied?</p>
                </div>

                {/* Definition */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Definition</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Measures the number of customers with exactly one contact in a 7-day rolling window with a customer-perceived negative sentiment. Customers must have an authenticated Customer ID and available contact ID.
                  </p>
                </div>

                {/* Why Important */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Important?</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Not all dissatisfaction shows up in repeat volume. Some customers leave after a single negative experience, creating silent one-and-done dissatisfaction that erodes trust without being visible in repeat metrics.
                  </p>
                </div>

                {/* Chart Placeholder */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Chart</h3>
                  <div className="bg-white border border-gray-300 rounded-lg p-6">
                    <div className="text-center text-red-600 text-lg font-semibold">
                      Insert Chart
                    </div>
                  </div>
                </div>

                {/* Data Table */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">NO-REPEAT DISSATISFACTION</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">NO-REPEAT DISSATISFACTION</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Unit</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jan</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Feb</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Mar</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Apr</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">May</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jun</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Jul</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Aug</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Sep</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Oct</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Nov</th>
                          <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">Dec</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">2025 Actual</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">234</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">198</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">156</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">289</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">167</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">223</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">312</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">145</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">267</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">189</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">134</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">178</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">2024 Actual</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">198</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">167</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">134</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">245</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">145</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">189</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">267</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">123</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">223</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">156</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">112</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">145</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">Difference</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">#</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+36</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+31</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+22</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+44</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+22</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+34</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+45</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+22</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+44</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+33</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+22</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">+33</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center text-gray-600">%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+12%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+8%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-red-600">+6%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-3%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-1%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-4%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-5%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-3%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-2%</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold text-green-600">-1%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm italic text-gray-600 mt-4">
                    <strong>Note:</strong> Positive and Negative are not necessarily better or worse, they are just directional YoY changes, e.g., there are healthy REPEATS, and there are also unhealthy NO REPEATS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
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
