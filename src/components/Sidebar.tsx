import React, { useState } from 'react';
import { ViewType } from '../App';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    metrics: true,
    cxImpact: true,
    methodology: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (view: ViewType) => currentView === view;

  const navItemClass = (active: boolean) => 
    `flex items-center px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out ${
      active 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-400/30' 
        : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 hover:text-white hover:shadow-md'
    }`;

  const subNavItemClass = (active: boolean) => 
    `flex items-center px-10 py-3 text-sm font-medium rounded-xl transition-all duration-300 ease-out ${
      active 
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md ring-1 ring-blue-400/30' 
        : 'text-gray-400 hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-blue-700/30 hover:text-white'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-gray-900 shadow-2xl transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center px-7 py-8 border-b border-gray-700/50">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-blue-400/20">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              <p className="text-xs text-gray-400 mt-1">Analytics & Insights</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-5 py-8 space-y-2">
            {/* Home */}
            <button
              onClick={() => onViewChange('home')}
              className={navItemClass(isActive('home'))}
            >
              <svg className="w-5 h-5 mr-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </button>

            {/* Metrics */}
            <div>
              <button
                onClick={() => toggleSection('metrics')}
                className={`flex items-center justify-between w-full px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out group ${
                  expandedSections.metrics
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    expandedSections.metrics ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  <svg className="w-5 h-5 mr-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-semibold">Metrics</span>
                </div>
                                 <svg
                   className={`w-5 h-5 transition-transform duration-300 ease-out ${
                     expandedSections.metrics ? 'rotate-180 text-blue-400' : 'text-gray-400'
                   }`}
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                 >
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
              </button>
              
              {expandedSections.metrics && (
                <div className="mt-3 ml-4 space-y-1">
                  <button
                    onClick={() => onViewChange('metrics')}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-out text-left flex items-center ${
                      isActive('metrics') 
                        ? 'bg-teal-100 text-teal-800 border border-teal-200' 
                        : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-400 mr-3"></div>
                    Total Interactions
                  </button>
                  <button
                    onClick={() => onViewChange('metrics')}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-out text-left flex items-center ${
                      isActive('metrics') 
                        ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                    Self-Service: Bot Only
                  </button>
                  <button
                    onClick={() => onViewChange('metrics')}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-out text-left flex items-center ${
                      isActive('metrics') 
                        ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-3"></div>
                    Human-Led: CSA Only
                  </button>
                  <button
                    onClick={() => onViewChange('metrics')}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-out text-left flex items-center ${
                      isActive('metrics') 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-400 mr-3"></div>
                    Self-Guided: Page Visits
                  </button>
                  <button
                    onClick={() => onViewChange('cs-channel-trends')}
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ease-out text-left flex items-center ${
                      isActive('cs-channel-trends') 
                        ? 'bg-teal-100 text-teal-800 border border-teal-200' 
                        : 'text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-400 mr-3"></div>
                    CS Channel Trends
                  </button>
                </div>
              )}
            </div>

            {/* CX Impact */}
            <div>
              <button
                onClick={() => toggleSection('cxImpact')}
                className={`flex items-center justify-between w-full px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out group ${
                  expandedSections.cxImpact
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    expandedSections.cxImpact ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  <svg className="w-5 h-5 mr-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-semibold">CX Impact</span>
                </div>
                                 <svg
                   className={`w-5 h-5 transition-transform duration-300 ease-out ${
                     expandedSections.cxImpact ? 'rotate-180 text-blue-400' : 'text-gray-400'
                   }`}
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                 >
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
              </button>
              
              {expandedSections.cxImpact && (
                <div className="mt-3 ml-4 space-y-1">
                  <button
                    onClick={() => onViewChange('cx-impact-p95')}
                    className={subNavItemClass(isActive('cx-impact-p95'))}
                  >
                    P95 Analysis
                  </button>
                  <button
                    onClick={() => onViewChange('cx-impact-p90')}
                    className={subNavItemClass(isActive('cx-impact-p90'))}
                  >
                    P90 Analysis
                  </button>
                </div>
              )}
            </div>

            {/* Methodology */}
            <div>
              <button
                onClick={() => toggleSection('methodology')}
                className={`flex items-center justify-between w-full px-5 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 ease-out group ${
                  expandedSections.methodology
                    ? 'bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-blue-700/20 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    expandedSections.methodology ? 'bg-blue-400' : 'bg-gray-400'
                  }`}></div>
                  <svg className="w-5 h-5 mr-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold">Methodology</span>
                </div>
                                 <svg
                   className={`w-5 h-5 transition-transform duration-300 ease-out ${
                     expandedSections.methodology ? 'rotate-180 text-blue-400' : 'text-gray-400'
                   }`}
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                 >
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
              </button>
              
              {expandedSections.methodology && (
                <div className="mt-3 ml-4 space-y-1">
                  <button
                    onClick={() => onViewChange('methodology')}
                    className={subNavItemClass(isActive('methodology'))}
                  >
                    Methodology
                  </button>
                </div>
              )}
            </div>

            {/* Metrics Dictionary */}
            <button
              onClick={() => onViewChange('dictionary')}
              className={navItemClass(isActive('dictionary'))}
            >
              <svg className="w-5 h-5 mr-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Metrics Dictionary</span>
            </button>

            {/* FAQs */}
            <button
              onClick={() => onViewChange('faqs')}
              className={navItemClass(isActive('faqs'))}
            >
              <svg className="w-5 h-5 mr-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>FAQs</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="px-7 py-6 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <div className="font-medium">Dashboard v1.0</div>
                <div className="text-gray-600 mt-1">Powered by React</div>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
