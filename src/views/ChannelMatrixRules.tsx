import React from "react";
import ExportButton from "../components/ExportButton";

export default function ChannelMatrixRules() {
  const matrixData = [
    {
      channel: "CS Landing Page",
      type: "visit",
      values: [true, false, false, true, true, true, true, true, true, true, true]
    },
    {
      channel: "CS Homepage", 
      type: "visit",
      values: [false, true, false, true, true, true, true, true, true, true, true]
    },
    {
      channel: "Help Pages",
      type: "visit", 
      values: [true, false, true, true, true, true, true, true, true, true, true]
    },
    {
      channel: "CS Chatbot",
      type: "contact",
      values: [false, false, false, true, false, false, false, false, true, false, false]
    },
    {
      channel: "CS Voicebot",
      type: "contact",
      values: [false, false, false, false, true, false, false, false, false, true, false]
    },
    {
      channel: "AI-enabled Email*",
      type: "contact",
      values: [false, false, false, false, false, true, false, false, false, false, true]
    },
    {
      channel: "Legacy Chatbot",
      type: "contact",
      values: [false, false, false, false, false, false, true, false, true, false, false]
    },
    {
      channel: "Legacy Voicebot",
      type: "contact",
      values: [false, false, false, false, false, false, false, true, false, true, false]
    },
    {
      channel: "CSA Chat",
      type: "csa",
      values: [false, false, false, false, false, false, false, false, true, false, false]
    },
    {
      channel: "CSA Voice",
      type: "csa",
      values: [false, false, false, false, false, false, false, false, false, true, false]
    },
    {
      channel: "CSA Email",
      type: "csa",
      values: [false, false, false, false, false, false, false, false, false, false, true]
    }
  ];

  const columnHeaders = [
    "CS Landing Page", "CS Homepage", "Help Pages", "CS Chatbot", "CS Voicebot", 
    "AI-enabled Email*", "Legacy Chatbot", "Legacy Voicebot", "CSA Chat", "CSA Voice", "CSA Email"
  ];

  const getChannelTypeColor = (type: string) => {
    switch (type) {
      case 'visit': return 'bg-green-50 border-green-200';
      case 'contact': return 'bg-blue-50 border-blue-200';
      case 'csa': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getHeaderColor = (type: string) => {
    switch (type) {
      case 'visit': return 'bg-green-600 text-white';
      case 'contact': return 'bg-blue-600 text-white';
      case 'csa': return 'bg-purple-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      {/* Header with Export */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
        <div className="bg-black text-white py-8 px-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">Channel Matrix</h1>
            <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              This matrix shows which channel combinations are valid for customer interactions. 
              Customers can start in any CS channel and end in specific channels within our measurement framework.
            </p>
          </div>
        </div>
        
        {/* Export Controls */}
        <div className="bg-white px-8 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Last updated:</span> {new Date().toLocaleDateString()}
            </div>
            <ExportButton 
              elementId="channel-matrix-content" 
              filename="channel-matrix.pdf"
            />
          </div>
        </div>
      </div>

      {/* Channel Transition Matrix */}
      <div id="channel-matrix-content" className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-6 py-4 text-center font-bold text-gray-900 bg-gray-100" rowSpan={2}>
                  Started In
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center font-bold text-white bg-green-600" colSpan={3}>
                  Visit Channels
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center font-bold text-white bg-blue-600" colSpan={5}>
                  Contact Channels
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center font-bold text-white bg-purple-600" colSpan={3}>
                  CSA Channels
                </th>
              </tr>
              <tr className="bg-gray-50">
                {columnHeaders.map((header, index) => (
                  <th 
                    key={index}
                    className={`border border-gray-200 px-3 py-3 text-center font-semibold text-gray-700 ${
                      index < 3 ? 'bg-green-50' : index < 8 ? 'bg-blue-50' : 'bg-purple-50'
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className={`border border-gray-200 px-6 py-4 font-semibold text-gray-900 ${getChannelTypeColor(row.type)}`}>
                    {row.channel}
                  </td>
                  {row.values.map((value, colIndex) => (
                    <td key={colIndex} className="border border-gray-200 px-3 py-3 text-center">
                      {value ? (
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-green-50 text-green-600 text-xs">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-red-50 text-red-500 text-xs">
                          ✗
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Legend */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-4 h-4 bg-green-50 text-green-600 text-xs">✓</span>
              <span className="text-gray-700 font-medium">Possible</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-4 h-4 bg-red-50 text-red-500 text-xs">✗</span>
              <span className="text-gray-700 font-medium">Not Possible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}