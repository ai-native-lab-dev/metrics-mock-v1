import React from "react";
import HowWeCountInteractions from "../components/HowWeCountInteractions";

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
        <HowWeCountInteractions className="mb-8" showExamples={true} />
        
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
