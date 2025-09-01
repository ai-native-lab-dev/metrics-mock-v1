import React, { useState } from 'react';

interface HowWeCountInteractionsProps {
  className?: string;
  showExamples?: boolean;
  type?: 'repeat' | 'no-repeat' | 'general';
}

const HowWeCountInteractions: React.FC<HowWeCountInteractionsProps> = ({ 
  className = "", 
  showExamples = false,
  type = 'general'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTitle = () => {
    switch (type) {
      case 'repeat':
        return 'How We Count Repeat Interactions';
      case 'no-repeat':
        return 'How We Count No-Repeat Interactions';
      default:
        return 'How We Count Interactions';
    }
  };

  const getDescription = () => {
    const baseText = "Customer interactions can start and end in any CS channel, with valid paths defined in the CS Channel Matrix. The value we count is the number of times authenticated customers interacted with us — measured as page visits for Visit channels, and as contacts for Bot and CSA channels — always classified by the channel where the interaction ended.";
    
    switch (type) {
      case 'repeat':
        return `${baseText} For repeat interactions, we track customers who visited pages or contacted us 2 or more times within the 7-day trailing window.`;
      case 'no-repeat':
        return `${baseText} For no-repeat interactions, we track customers who visited pages or contacted us only 1 time within the 7-day trailing window.`;
      default:
        return baseText;
    }
  };

  return (
    <div className={`bg-blue-50 rounded-xl border border-blue-200 ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-blue-100 transition-colors rounded-xl"
        aria-expanded={isExpanded}
      >
        <h3 className="text-lg font-semibold text-blue-900">{getTitle()}</h3>
        <svg
          className={`w-5 h-5 text-blue-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6">
          <p className="text-blue-800 leading-relaxed mb-4">
            {getDescription()}
          </p>
          
          {showExamples && (
            <div className="mt-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-blue-500">🔹</span>
                Examples
              </h4>
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Example 1 */}
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Cross-Channel Escalation</h5>
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        Started in: <span className="text-purple-700">CS Landing Page</span>
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        Ended in: <span className="text-orange-700">CSA Chat</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700 text-sm">
                      A customer browses the CS Landing Page 100 times, then escalates into CSA Chat.
                    </p>
                    <div className="bg-orange-50 rounded-md p-3 border-l-4 border-orange-400">
                      <p className="text-sm font-medium text-orange-800">
                        Counted as: <strong>one interaction ended in CSA Chat</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">Same-Channel Resolution</h5>
                      <p className="text-sm text-gray-600 font-medium mb-1">
                        Started in: <span className="text-blue-700">CS Chatbot</span>
                      </p>
                      <p className="text-sm text-gray-600 font-medium">
                        Ended in: <span className="text-blue-700">CS Chatbot</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-700 text-sm">
                      A customer authenticates and engages multiple times with CS Chatbot, staying there until resolution.
                    </p>
                    <div className="bg-blue-50 rounded-md p-3 border-l-4 border-blue-400">
                      <p className="text-sm font-medium text-blue-800">
                        Counted as: <strong>one interaction ended in CS Chatbot</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HowWeCountInteractions;
