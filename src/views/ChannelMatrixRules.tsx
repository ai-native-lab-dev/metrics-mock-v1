import React from "react";

const STARTS = [
  "CS Landing Page","CS Homepage","Help Pages",
  "CS Chatbot","CS Voicebot","AI-enabled Email","Legacy Chatbot","Legacy Voicebot",
  "CSA Chat","CSA Voice","CSA Email",
];

const ENDS = [...STARTS];
const BOTS = new Set(["CS Chatbot","CS Voicebot","AI-enabled Email","Legacy Chatbot","Legacy Voicebot"]);
const CSAS = new Set(["CSA Chat","CSA Voice","CSA Email"]);
const VISITS = new Set(["CS Landing Page","CS Homepage","Help Pages"]);

function isAllowed(start: string, end: string) {
  if (start === "CS Landing Page" && end === "CS Homepage") return false;
  if (start === "CS Homepage" && end === "CS Landing Page") return false;
  if (CSAS.has(start) && BOTS.has(end)) return false;
  return true;
}

function endCategory(end: string) {
  if (VISITS.has(end)) return "Visit";
  if (BOTS.has(end)) return "Bot";
  return "CSA";
}

export default function ChannelMatrixRules() {
  const allCombinations = STARTS.flatMap(start => 
    ENDS.map(end => ({ start, end, allowed: isAllowed(start, end), endCat: endCategory(end) }))
  );

  const allowedCombinations = allCombinations.filter(c => c.allowed);
  const blockedCombinations = allCombinations.filter(c => !c.allowed);

  const groupedAllowed = {
    Bot: allowedCombinations.filter(c => c.endCat === "Bot"),
    CSA: allowedCombinations.filter(c => c.endCat === "CSA"),
    Visit: allowedCombinations.filter(c => c.endCat === "Visit"),
  };

  return (
    <div className="w-full p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Channel Matrix Rules</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Understanding the business logic behind customer service channel interactions. 
          This matrix shows what combinations are <strong>possible</strong> vs. <strong>not possible</strong> 
          based on our customer journey design.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{allowedCombinations.length}</div>
          <div className="text-sm text-gray-600 mt-1">Possible Combinations</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-red-600">{blockedCombinations.length}</div>
          <div className="text-sm text-gray-600 mt-1">Blocked Combinations</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{groupedAllowed.Bot.length}</div>
          <div className="text-sm text-gray-600 mt-1">Bot Endpoints</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-orange-600">{groupedAllowed.CSA.length}</div>
          <div className="text-sm text-gray-600 mt-1">CSA Endpoints</div>
        </div>
      </div>

      {/* Business Rules */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Rules</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-600 text-sm font-bold">✕</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">No Circular Navigation</h3>
              <p className="text-gray-600 text-sm">CS Landing Page ↔ CS Homepage transitions are blocked to prevent infinite loops.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-600 text-sm font-bold">✕</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">No CSA → Bot Escalation</h3>
              <p className="text-gray-600 text-sm">Human agents cannot escalate to automated systems. Once a human is involved, the interaction stays human-led.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-red-600 text-sm font-bold">✕</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Contact ID Constraint</h3>
              <p className="text-gray-600 text-sm">Customers can only use either CS Landing Page OR CS Homepage within the same contact ID. Other paths create a new contact ID or don't conform with the definition of an interaction ending with the same contact ID.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Visit → Bot/CSA Escalation</h3>
              <p className="text-gray-600 text-sm">Self-guided users can escalate to automated or human assistance as needed.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Bot → CSA Escalation</h3>
              <p className="text-gray-600 text-sm">Automated systems can escalate to human agents when complexity exceeds bot capabilities.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400"></span>
            Bot Channels
          </h3>
          <div className="space-y-2">
            {Array.from(BOTS).map(channel => (
              <div key={channel} className="text-sm text-blue-800 bg-blue-100 rounded-lg px-3 py-2">
                {channel}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-blue-700">
            <strong>{groupedAllowed.Bot.length}</strong> possible combinations
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-400"></span>
            CSA Channels
          </h3>
          <div className="space-y-2">
            {Array.from(CSAS).map(channel => (
              <div key={channel} className="text-sm text-orange-800 bg-orange-100 rounded-lg px-3 py-2">
                {channel}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-orange-700">
            <strong>{groupedAllowed.CSA.length}</strong> possible combinations
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl border border-purple-200 p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-400"></span>
            Visit Channels
          </h3>
          <div className="space-y-2">
            {Array.from(VISITS).map(channel => (
              <div key={channel} className="text-sm text-purple-800 bg-purple-100 rounded-lg px-3 py-2">
                {channel}
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-purple-700">
            <strong>{groupedAllowed.Visit.length}</strong> possible combinations
          </div>
        </div>
      </div>

      {/* Blocked Combinations Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Blocked Combinations Matrix</h2>
        <p className="text-gray-600 mb-6">This matrix shows all channel combinations that are NOT possible due to business rules and contact ID constraints.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Started In</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Ended In</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Reason</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Business Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Landing Page</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Homepage</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Circular Navigation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Prevents infinite loops</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Homepage</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Landing Page</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Circular Navigation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Prevents infinite loops</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Chat</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Chatbot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Chat</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Voicebot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Chat</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">AI-enabled Email</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Chat</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">Legacy Chatbot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Chat</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">Legacy Voicebot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Voice</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Chatbot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Voice</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Voicebot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Voice</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">AI-enabled Email</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Voice</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">Legacy Chatbot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Voice</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">Legacy Voicebot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Email</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Chatbot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Email</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CS Voicebot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Email</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">AI-enabled Email</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Email</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">Legacy Chatbot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
              <tr className="bg-red-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">CSA Email</td>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-700">Legacy Voicebot</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">CSA → Bot Escalation</td>
                <td className="border border-gray-300 px-4 py-3 text-red-600">Human can't escalate to bot</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Contact ID Constraint Explanation</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            Customers can only use either <strong>CS Landing Page</strong> OR <strong>CS Homepage</strong> within the same contact ID. 
            Other paths create a new contact ID or don't conform with the definition of an interaction ending with the same contact ID. 
            This ensures that multiple channels within the same customer journey are properly tracked and analyzed as a single interaction.
          </p>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Implementation Note</h2>
        <p className="text-blue-800 text-sm leading-relaxed">
          The CS Channel Trends view shows only the <strong>possible combinations</strong> based on these business rules. 
          This ensures that our analytics reflect real customer journey patterns and prevents misleading insights from 
          impossible channel transitions. The matrix is designed to optimize customer experience by guiding users through 
          logical escalation paths while maintaining data integrity.
        </p>
      </div>
    </div>
  );
}
