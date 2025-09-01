import React, { useState } from 'react';

interface AnalysisDimension {
  id: string;
  title: string;
  description: string;
}

const Methodology: React.FC = () => {
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(new Set());

  const toggleDimension = (dimensionId: string) => {
    const newExpanded = new Set(expandedDimensions);
    if (newExpanded.has(dimensionId)) {
      newExpanded.delete(dimensionId);
    } else {
      newExpanded.add(dimensionId);
    }
    setExpandedDimensions(newExpanded);
  };

  const analysisDimensions: AnalysisDimension[] = [
    {
      id: 'sub-channel',
      title: 'By Sub-Channel',
      description: 'Isolate behaviors between customers who used "Bot only" versus "CSA only". This helps identify which support channels are most effective for different customer segments.'
    },
    {
      id: 'frequency-tiers',
      title: 'By Frequency Tiers',
      description: 'Segment the "Repeat" group into tiers (e.g., 2-3 contacts, 4-5 contacts, 6+ contacts) to identify hyper-repeaters who may indicate systemic issues or high-value customers.'
    },
    {
      id: 'prime-status',
      title: 'By Prime Status',
      description: 'Compare the contact patterns of "Prime" versus "Non-Prime" members to understand how subscription status affects customer support needs and satisfaction.'
    },
    {
      id: 'order-status',
      title: 'By Order Status',
      description: 'Analyze the difference between customers who "Have an Order" versus those with "No Order" in their history to understand the relationship between purchasing behavior and support interactions.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-6">
          Our Customer Segmentation Methodology
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          A step-by-step guide to how we identify, segment, and analyze customer interactions 
          to drive meaningful insights and improve customer experience.
        </p>
      </div>

      {/* Scope & Definitions Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Analysis Scope Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-[1.02]">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Analysis Scope & Dimensions</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="font-semibold text-gray-700 w-24">Time:</span>
              <span className="text-gray-600">Weekly, Monthly, YTD for 2024 and 2025</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="font-semibold text-gray-700 w-24">Geography:</span>
              <span className="text-gray-600">US Marketplace</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="font-semibold text-gray-700 w-24">Vertical:</span>
              <span className="text-gray-600">All Reporting Verticals</span>
            </div>
            <div className="flex items-center p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="font-semibold text-gray-700 w-24">Channels:</span>
              <span className="text-gray-600">All CS Channels (started in, ended in)</span>
            </div>
          </div>
        </div>

        {/* Key Definitions Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out transform hover:scale-[1.02]">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Key Definitions</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50/50 rounded-lg border border-green-100/50">
              <span className="font-semibold text-gray-700">Repeat Interaction:</span>
              <p className="text-gray-600 mt-2 leading-relaxed">An authenticated customer interacting ≥2 times within a trailing 7-day window.</p>
            </div>
            <div className="p-4 bg-green-50/50 rounded-lg border border-green-100/50">
              <span className="font-semibold text-gray-700">No-Repeat Interaction:</span>
              <p className="text-gray-600 mt-2 leading-relaxed">An authenticated customer interacting 1 time within a trailing 7-day window.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Channel Flow - Primary */}
      <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 rounded-2xl border-2 border-blue-200/50 p-8 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 ease-out">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-xl mr-4 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            Contact Channel Flow
          </h2>
          <div className="bg-gradient-to-r from-blue-100/80 to-blue-200/60 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
            <p className="text-blue-900 font-bold">
              <span className="text-blue-700">Primary Focus:</span> This flow generates transcripts, allowing for deep analysis of customer intent and pain points.
            </p>
          </div>
        </div>

        {/* Improved Flow Diagram */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ease-out">
          <div className="flex flex-col items-center space-y-8">
            {/* Venn Diagram - Top */}
            <div className="text-center">
              <div className="relative w-96 h-48 mb-4">
                {/* Customer ID Circle - Left (Larger) */}
                <div className="absolute left-0 top-8 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-blue-500/20 border-3 border-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-base font-bold text-blue-700 text-center">Customer ID</span>
                </div>
                {/* Overlap Area - This IS the Contact ID overlap */}
                <div className="absolute left-20 top-8 w-36 h-36 bg-gradient-to-br from-blue-500/70 to-blue-600/60 border-3 border-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white text-center leading-tight">Contact ID<br/>Overlap</span>
                </div>
              </div>
              <p className="text-sm text-blue-700 font-medium">Customer ID with Contact ID Overlap</p>
            </div>

            {/* Arrow - Down */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Result Split - Bottom */}
            <div className="flex space-x-16">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400/30 to-blue-500/20 border-3 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-sm font-bold text-blue-700">No Repeat</span>
                </div>
                <p className="text-sm text-blue-700 font-medium">Single Contact</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400/30 to-blue-500/20 border-3 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-sm font-bold text-blue-700">Repeat</span>
                </div>
                <p className="text-sm text-blue-700 font-medium">Multiple Contacts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Further Analysis Dimensions */}
        <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 rounded-2xl p-6 border-2 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 ease-out">
          <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            Further Analysis Dimensions
          </h3>
          <div className="space-y-3">
            {analysisDimensions.map((dimension) => (
              <div key={dimension.id} className="border-2 border-blue-200/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-out bg-white/90">
                <button
                  onClick={() => toggleDimension(dimension.id)}
                  className={`w-full px-6 py-5 text-left flex items-center justify-between transition-all duration-300 ease-out ${
                    expandedDimensions.has(dimension.id)
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg ring-2 ring-blue-400/30'
                      : 'bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      expandedDimensions.has(dimension.id) ? 'bg-white' : 'bg-blue-600'
                    }`}></div>
                    <span className={`font-bold text-lg ${
                      expandedDimensions.has(dimension.id) ? 'text-white' : 'text-blue-900'
                    }`}>
                      {dimension.title}
                    </span>
                  </div>
                                           <svg
                           className={`w-6 h-6 transition-all duration-300 ease-out ${
                             expandedDimensions.has(dimension.id)
                               ? 'rotate-180 text-white'
                               : 'text-blue-600'
                           }`}
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                         </svg>
                </button>
                {expandedDimensions.has(dimension.id) && (
                  <div className="px-6 py-5 bg-gradient-to-br from-blue-50/90 to-blue-100/50 border-t-2 border-blue-300/50">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0 shadow-sm"></div>
                      <p className="text-blue-900 leading-relaxed text-base font-medium">{dimension.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visit Channel Flow - Secondary */}
      <div className="bg-gradient-to-br from-gray-50/60 to-gray-100/30 rounded-2xl border-2 border-gray-200/50 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Channel Flow</h2>
          <div className="bg-gray-100/50 border-l-4 border-gray-500 p-4 rounded-r-lg">
            <p className="text-gray-900 font-semibold">
              <span className="text-gray-700">Secondary Focus:</span> While this flow has no transcripts, it's key for understanding self-service patterns and user journey optimization.
            </p>
          </div>
        </div>

        {/* Improved Flow Diagram */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/30 shadow-lg hover:shadow-xl transition-all duration-300 ease-out">
          <div className="flex flex-col items-center space-y-8">
            {/* Venn Diagram - Top */}
            <div className="text-center">
              <div className="relative w-96 h-48 mb-4">
                {/* Customer ID Circle - Left (Larger) */}
                <div className="absolute left-0 top-8 w-40 h-40 bg-gradient-to-br from-green-400/30 to-green-500/20 border-3 border-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-base font-bold text-green-700 text-center">Customer ID</span>
                </div>
                {/* Overlap Area - This IS the Visit ID overlap */}
                <div className="absolute left-20 top-8 w-36 h-36 bg-gradient-to-br from-green-500/70 to-green-600/60 border-3 border-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white text-center leading-tight">Visit ID<br/>Overlap</span>
                </div>
              </div>
              <p className="text-sm text-green-700 font-medium">Customer ID with Visit ID Overlap</p>
            </div>

            {/* Arrow - Down */}
            <div className="flex flex-col items-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Result Split - Bottom */}
            <div className="flex space-x-16">
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500/20 border-3 border-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-bold text-green-700">No Repeat</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Single Visit</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-green-500/20 border-3 border-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-sm font-bold text-green-700">Repeat</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Multiple Visits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Self-service behavior patterns and user journey optimization</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Website usability and content effectiveness metrics</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Customer engagement and retention indicators</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <p className="text-gray-700">Conversion funnel optimization opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200/50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Methodology Summary</h3>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
          This narrative-driven approach ensures that complex segmentation logic is presented in a logical, 
          step-by-step manner. By leading users from high-level context to granular details, we create 
          a comprehensive understanding of how customer interactions are analyzed and categorized for 
          actionable insights.
        </p>
      </div>
    </div>
  );
};

export default Methodology;
