import React from "react";

export default function ChannelMatrixRules() {
  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Channel Matrix Rules</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          This matrix illustrates which channel start–end combinations are valid and which are not. Customers can begin in either the <strong>CS Landing Page</strong> or the <strong>CS Homepage</strong> (depending on rollout of the legacy experience). Any other path either generates a new contact ID or falls outside the definition of how we measure an interaction ended in a channel.
        </p>
      </div>

      {/* Channel Transition Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Channel Transition Matrix</h2>
        <div className="mb-8 space-y-6">
          {/* Main explanation */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How We Count Interactions</h3>
            <p className="text-blue-800 leading-relaxed">
              Customer interactions can start and end in any CS channel, with valid paths defined in the CS Channel Matrix. The value we count is the number of times authenticated customers interacted with us — measured as <strong>page visits</strong> for Visit channels, and as <strong>contacts</strong> for Bot and CSA channels — always classified by the channel where the interaction <strong>ended</strong>.
            </p>
          </div>

          {/* Examples section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-blue-500">🔹</span>
              Examples
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Example 1 */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cross-Channel Escalation</h4>
                    <p className="text-sm text-gray-600 font-medium mb-1">Started in: <span className="text-purple-700">CS Landing Page</span></p>
                    <p className="text-sm text-gray-600 font-medium">Ended in: <span className="text-orange-700">CSA Chat</span></p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">A customer browses the CS Landing Page 100 times, then escalates into CSA Chat.</p>
                  <div className="bg-white rounded-md p-3 border-l-4 border-orange-400">
                    <p className="text-sm font-medium text-orange-800">Counted as: <strong>one interaction ended in CSA Chat</strong></p>
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Same-Channel Resolution</h4>
                    <p className="text-sm text-gray-600 font-medium mb-1">Started in: <span className="text-blue-700">CS Chatbot</span></p>
                    <p className="text-sm text-gray-600 font-medium">Ended in: <span className="text-blue-700">CS Chatbot</span></p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">A customer authenticates and engages multiple times with CS Chatbot, staying there until resolution.</p>
                  <div className="bg-white rounded-md p-3 border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800">Counted as: <strong>one interaction ended in CS Chatbot</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-gray-100" rowSpan={2}>
                  Started In
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-blue-100" colSpan={3}>
                  Ended in Visit?
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-orange-100" colSpan={5}>
                  Ended in Bot?
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-green-100" colSpan={3}>
                  Ended in CSA?
                </th>
              </tr>
              <tr>
                {/* Visit columns */}
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-blue-50">CS Landing Page</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-blue-50">CS Homepage</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-blue-50">Help Pages</th>
                {/* Bot columns */}
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-orange-50">CS Chatbot</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-orange-50">CS Voicebot</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-orange-50">AI-enabled Email*</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-orange-50">Legacy Chatbot</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-orange-50">Legacy Voicebot</th>
                {/* CSA columns */}
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-green-50">CSA Chat</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-green-50">CSA Voice</th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 bg-green-50">CSA Email</th>
              </tr>
            </thead>
            <tbody>
              {/* Visit Rows */}
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CS Landing Page</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CS Homepage</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">Help Pages</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              
              {/* Bot Rows */}
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CS Chatbot</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CS Voicebot</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">AI-enabled Email*</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">Legacy Chatbot</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">Legacy Voicebot</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              
              {/* CSA Rows */}
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CSA Chat</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CSA Voice</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-2 py-2 font-medium text-gray-700">CSA Email</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-red-100 text-red-800 font-medium">Not possible</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
                <td className="border border-gray-300 px-2 py-2 text-center bg-green-100 text-green-800 font-medium">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
