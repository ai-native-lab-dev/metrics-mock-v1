import React from "react";
import HowWeCountInteractions from "../components/HowWeCountInteractions";

export default function ChannelMatrixRules() {
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="text-center space-y-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Channel Matrix Rules</h1>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          This matrix shows which channel start–end combinations are valid and which are not. Customers can begin in either the <strong>CS Landing Page</strong> or the <strong>CS Homepage</strong>. Any other path either generates a new contact ID or falls outside the definition of how we measure an interaction ended in a channel.
        </p>
      </div>

      {/* Channel Transition Matrix */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Channel Transition Matrix</h2>
        <HowWeCountInteractions className="mb-6" showExamples={true} />
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="border border-gray-200 px-2 py-1 text-center font-medium text-gray-700 bg-gray-50" rowSpan={2}>
                  Started In
                </th>
                <th className="border border-gray-200 px-2 py-1 text-center font-medium text-gray-700 bg-blue-50" colSpan={3}>
                  Ended in Visit?
                </th>
                <th className="border border-gray-200 px-2 py-1 text-center font-medium text-gray-700 bg-orange-50" colSpan={5}>
                  Ended in Bot?
                </th>
                <th className="border border-gray-200 px-2 py-1 text-center font-medium text-gray-700 bg-green-50" colSpan={3}>
                  Ended in CSA?
                </th>
              </tr>
              <tr>
                {/* Visit columns */}
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-blue-50">CS Landing Page</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-blue-50">CS Homepage</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-blue-50">Help Pages</th>
                {/* Bot columns */}
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-orange-50">CS Chatbot</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-orange-50">CS Voicebot</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-orange-50">AI-enabled Email*</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-orange-50">Legacy Chatbot</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-orange-50">Legacy Voicebot</th>
                {/* CSA columns */}
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-green-50">CSA Chat</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-green-50">CSA Voice</th>
                <th className="border border-gray-200 px-1 py-1 text-center font-medium text-gray-600 bg-green-50">CSA Email</th>
              </tr>
            </thead>
            <tbody>
              {/* Visit Rows */}
              <tr className="bg-blue-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CS Landing Page</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CS Homepage</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">Help Pages</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              
              {/* Bot Rows */}
              <tr className="bg-orange-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CS Chatbot</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CS Voicebot</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">AI-enabled Email*</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">Legacy Chatbot</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">Legacy Voicebot</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              
              {/* CSA Rows */}
              <tr className="bg-green-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CSA Chat</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CSA Voice</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-200 px-2 py-1 font-medium text-gray-700">CSA Email</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-red-50 text-red-700 text-xs">✗</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
                <td className="border border-gray-200 px-1 py-1 text-center bg-green-50 text-green-700 text-xs">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">✓</span>
            <span className="text-gray-700">Possible</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-semibold">✗</span>
            <span className="text-gray-700">Not Possible</span>
          </div>
        </div>
      </div>
    </div>
  );
}
