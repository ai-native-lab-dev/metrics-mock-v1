import React from 'react';

export default function InteractionFramework() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Customer Interaction Framework</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Comprehensive guide to understanding customer interactions, measurement units, and metric definitions.
        </p>
      </div>

      {/* Framework Sections */}
      <div className="space-y-8">
        {/* 1. Interaction Framework */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Interaction Framework</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Customer interactions can start and end in any CS channel.
            </p>
            <p>
              Valid flows are defined in the <strong>CS Channel Matrix</strong>.
            </p>
            <p>
              The end channel determines how the interaction is classified ("Ended in X").
            </p>
          </div>
        </div>

        {/* 2. Units of Measure */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Units of Measure</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Visit channels</h3>
              <p className="text-blue-800">(Landing Page, Homepage, Help Pages): measured as page visits.</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Bot & CSA channels</h3>
              <p className="text-orange-800">measured as contacts.</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Unit</h3>
              <p className="text-gray-800">Count (MM).</p>
            </div>
          </div>
        </div>

        {/* 3. Repeat vs No-Repeat */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Repeat vs No-Repeat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">Repeat Interaction</h3>
              <p className="text-green-800">
                Authenticated customers who visited/contacted <strong>≥2 times</strong> within a trailing 7-day window.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">No-Repeat Interaction</h3>
              <p className="text-blue-800">
                Authenticated customers who visited/contacted <strong>only once</strong> within a trailing 7-day window.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Counting Rule */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Counting Rule</h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Multiple clicks or actions before escalation = counted once in the channel where the interaction ended.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Examples:</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Customer browses Landing Page 100 times, then escalates to CSA Chat</strong> → one interaction ended in CSA Chat.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Customer interacts multiple times with Chatbot, stays in Chatbot</strong> → one interaction ended in CS Chatbot.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-800">
                  <strong>Customer starts in Help Pages, escalates to Voicebot</strong> → one interaction ended in CS Voicebot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Rate Metrics */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Rate Metrics</h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Each base metric can be expressed as a share under different denominators:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Share of Repeat / Total Repeat</h3>
                <p className="text-purple-800 text-sm">proportion of repeat interactions for this flow.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Share of Repeat / (Repeat + No-Repeat)</h3>
                <p className="text-purple-800 text-sm">proportion against all interactions.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Share within Sub-Total (Containment)</h3>
                <p className="text-purple-800 text-sm">share within the same end category (Visit, Bot, CSA).</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Share of Total (All Interactions)</h3>
                <p className="text-purple-800 text-sm">share of all interactions across all channels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Better Direction */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Better Direction (Caveat)</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-2">Lower is better</h3>
                  <p className="text-yellow-800">fewer repeat touchpoints, less CSA escalation.</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">Higher can be better</h3>
                  <p className="text-green-800">in self-service (Bot/Visit), if it means more successful containment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
