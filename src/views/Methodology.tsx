import React from 'react';

// -- UI Components (would live in a 'components/ui' folder) --

/**
 * A generic, single-line SVG icon component.
 * In a real project, this would likely be handled by a library like Lucide or Radix Icons.
 */
const LineIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  const icons: { [key: string]: React.ReactNode } = {
    target: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />,
    book: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
    'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    'refresh-cw': <><polyline points="23 4 23 10 17 10" /><polyline points="1 4 1 10 7 10" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64M3.51 15A9 9 0 0 0 18.36 18.36" /></>,
    'thumbs-up': <path d="M7 11v8a1 1 0 0 0 1 1h7c.6 0 1.1-.4 1.3-.9l3.2-6.4c.1-.2.1-.5 0-.7a1 1 0 0 0-.8-.4H14V5c0-1.1-.9-2-2-2h0a2 2 0 0 0-2 2v6Z" />,
    'thumbs-down': <path d="M17 13v-8a1 1 0 0 0-1-1h-7c-.6 0-1.1.4-1.3.9L4.5 9.6a1 1 0 0 0 0 .7c.2.5.7.7.8.7H10v6c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2Z" />,
    'alert-triangle': <><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></>,
  };
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {icons[name] || null}
    </svg>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <section className={`w-full max-w-5xl mx-auto px-6 py-20 md:py-28 ${className}`} style={style}>
    {children}
  </section>
);

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">{title}</h2>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{subtitle}</p>
  </div>
);

// -- Page Section Components --

const HeroSection: React.FC = () => (
  <header className="text-center py-24 md:py-32 bg-black">
    <div className="max-w-5xl mx-auto px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
        Objective & Exhaustive Measurement
      </h1>
    </div>
  </header>
);

const IntroductionSection: React.FC = () => (
  <Section className="!py-0 bg-white">
    <div className="bg-white border border-gray-100 rounded-2xl p-12 md:p-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-xl text-gray-700 leading-relaxed mb-12 text-center">
          Customers don't think in terms of "channels" — they're simply trying to get something done, their job-to-be-done. "I need to know when my order will arrive." "I want to return an item that isn't what I expected." "I need help troubleshooting something that isn't working."
        </p>
        
        <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
          A single experience might span multiple steps: browsing Help Pages, trying the CS Chatbot, and then ending with a CSA over chat or voice. From the customer's point of view, these hand-offs are invisible — they just see one journey.
        </p>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          To improve those experiences, we need a system that measures interactions in a way that is:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Objective</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Capture what happened, without assumptions.
            </p>
          </div>
          
          <div className="bg-black rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Exhaustive</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Include every customer path, with no gaps or double counting.
            </p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const MeasurementFlowSection: React.FC = () => (
  <Section className="bg-gradient-to-b from-gray-50 to-white">
    {/* Step 1 */}
    <div className="bg-white border border-gray-100 rounded-2xl p-12 md:p-16 mb-12">
              <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Total Customer Interaction
        </h3>
          </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            We start with one simple question:
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mb-8 font-semibold">
            Did the customer start interacting with us through a self-guided page visit, a self-service contact, or a human-led, AI-assisted contact?
          </p>
          

          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <h4 className="text-xl font-bold text-green-800 mb-4">A Visit</h4>
              <p className="text-green-700 leading-relaxed text-lg">happens when a customer browses our help content, such as the CS Landing Page, CS Homepage, or Help Pages.</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="text-xl font-bold text-blue-800 mb-4">A Contact</h4>
              <p className="text-blue-700 leading-relaxed text-lg">happens when a customer engages directly — through the CS Chatbot, CS Voicebot, or with a CSA (chat, email, or voice).</p>
            </div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Sometimes a customer only visits, sometimes they only contact, and often they do both, resulting in multiple interactions for the same issue. Visits and Contacts together make up the Total Customer Interactions. Sometimes both visits and contacts appear together during one interaction — for example, a customer starts on the CS Landing Page (Visit) and ends in CSA Chat (Contact).
          </p>
          
          
          {/* Customer ID Illustration */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-purple-100 rounded-full border-2 border-purple-200 flex items-center justify-center mx-auto mb-4">
              <span className="text-lg font-bold text-purple-800 text-center">Customer ID</span>
            </div>
            <p className="text-sm text-gray-600">The foundation that connects all interactions</p>
          </div>
          

        </div>

                        


        
        




                </div>

            {/* Main Venn Diagram */}
      <div className="mt-12">
        <div className="flex flex-col items-center mb-12">
          <div className="flex justify-center items-center h-64">
            <div className="relative w-[500px] h-[350px]">
              {/* Customer ID Circle (Center) - Base circle - Purple, Bigger */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100 rounded-full border-2 border-purple-200"></div>
              
              {/* Visit ID Circle - Staggered left - Green */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-20 w-56 h-56 bg-green-100 rounded-full border-2 border-green-200"></div>
              
              {/* Contact ID Circle - Staggered right - Blue */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-36 w-56 h-56 bg-blue-100 rounded-full border-2 border-blue-200"></div>
                </div>
              </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 rounded-full border border-purple-200"></div>
              <span className="text-sm font-medium text-gray-700">Customer ID</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 rounded-full border border-green-200"></div>
              <span className="text-sm font-medium text-gray-700">Visit ID</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 rounded-full border border-blue-200"></div>
              <span className="text-sm font-medium text-gray-700">Contact ID</span>
          </div>
        </div>
      </div>

        {/* Flow Arrow */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col items-center">
            <div className="w-1 h-8 bg-gray-400"></div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-gray-400"></div>
            </div>
          </div>
        </div>

        {/* Individual ID Relationships */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Customer ID + Visit ID */}
            <div className="text-center">
              <h5 className="text-lg font-medium text-gray-800 mb-4">Customer ID + Visit ID</h5>
              <div className="flex justify-center items-center h-40">
                <div className="relative w-[200px] h-[200px]">
                  {/* Customer ID Circle (Center) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-100 rounded-full border-2 border-purple-200"></div>
                  {/* Visit ID Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-8 w-28 h-28 bg-green-100 rounded-full border-2 border-green-200"></div>
                </div>
              </div>
            </div>

            {/* Customer ID + Contact ID */}
            <div className="text-center">
              <h5 className="text-lg font-medium text-gray-800 mb-4">Customer ID + Contact ID</h5>
              <div className="flex justify-center items-center h-40">
                <div className="relative w-[200px] h-[200px]">
                  {/* Customer ID Circle (Center) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-100 rounded-full border-2 border-purple-200"></div>
                  {/* Contact ID Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-6 w-28 h-28 bg-blue-100 rounded-full border-2 border-blue-200"></div>
                </div>
              </div>
            </div>

            {/* Customer ID + Visit ID + Contact ID */}
              <div className="text-center">
              <h5 className="text-lg font-medium text-gray-800 mb-4">All Three Combined</h5>
              <div className="flex justify-center items-center h-40">
                <div className="relative w-[200px] h-[200px]">
                  {/* Customer ID Circle (Center) */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-100 rounded-full border-2 border-purple-200"></div>
                  {/* Visit ID Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-8 w-28 h-28 bg-green-100 rounded-full border-2 border-green-200"></div>
                  {/* Contact ID Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-6 w-28 h-28 bg-blue-100 rounded-full border-2 border-blue-200"></div>
              </div>
            </div>
          </div>
        </div>

          {/* Legend */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 rounded-full border border-purple-200"></div>
              <span className="text-sm font-medium text-gray-700">Customer ID</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 rounded-full border border-green-200"></div>
              <span className="text-sm font-medium text-gray-700">Visit ID</span>
                  </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 rounded-full border border-blue-200"></div>
              <span className="text-sm font-medium text-gray-700">Contact ID</span>
              </div>
          </div>
        </div>

        {/* ID Anchoring Details */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Every CS Landing Page, CS Homepage, and Help Pages visit (Session ID, etc.) is tied to an authenticated Customer ID. Every self-service contact (CS Chatbots, CS Voicebots, Legacy Chatbot, Legacy Voicebot) and human-led contact (CSA) with available Comm_ID (Contact ID) is also tied to an authenticated Customer ID.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>Why Objective:</strong> Because every Visit and every Contact is anchored to an authenticated Customer ID. That removes ambiguity — we're not guessing or sampling. We're measuring exactly what happened, grounded in system-generated IDs like Session ID and Comm_ID.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>Why Exhaustive:</strong> Because the framework covers every possible path a customer can take. That means:
            </p>
            
            <ul className="text-lg text-gray-700 leading-relaxed mb-8 ml-6 space-y-2">
              <li>• Every type of visit (landing page, homepage, help pages)</li>
              <li>• Every type of self-service contact (chatbots, voicebots, legacy)</li>
              <li>• Every type of human-led contact (CSA chat, voice, email)</li>
              <li>• All of these are tied back to the Customer ID</li>
            </ul>
          </div>
        </div>
      </div>

    {/* Step 2 */}
    <div className="bg-white border border-gray-100 rounded-2xl p-12 md:p-16">
        <div className="text-center mb-16">
        </div>

                <div className="max-w-5xl mx-auto">
          
                    {/* How We Count Interactions */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-3xl font-bold text-gray-900 mb-4">How We Count Interactions</h4>
              <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Customer interactions can start and end in any CS channel, with valid paths defined in the CS Channel Matrix. The question is how we count interaction volume. At this stage, the framework is simple: it measures what happened — whether a customer interacted once or multiple times within a trailing 7-day window — without assuming why.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <h5 className="text-xl font-bold text-gray-900 mb-4">Total Customer Interactions =</h5>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Self-Guided Visit (Page Visits)</li>
                  <li>Self-Service Contact (Bot)</li>
                  <li>Human-Led Contact (CSA)</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Single (No-Repeat) Interactions */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h5 className="text-xl font-bold text-gray-900 mb-4">Single (No-Repeat) Interaction</h5>
                  <p className="text-gray-700 mb-4">
                    <strong>Definition:</strong> Exactly one interaction within the trailing 7-day window.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Metric Form:</strong> No-Repeat Interaction Started in Any CS Channel and Ended in {`{Specific CS Channel}`}.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <p><strong>Visit</strong> = one Visit ID (Session ID + Marketplace ID) for an authenticated customer.</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>A visit session ends after 60 minutes of inactivity.</li>
                      <li>Continuous activity (e.g., 100+ clicks over 3 hours with no 60-min gap) = one visit.</li>
                    </ul>
                    
                    <p><strong>Contact</strong> = one (Comm_ID + Customer_ID) for Bot or CSA.</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Always classified by the ending channel (e.g., CS Homepage, CS Chatbot, CSA Voice).</li>
                    </ul>
                  </div>
                </div>

                {/* Multiple (Repeat) Interactions */}
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h5 className="text-xl font-bold text-gray-900 mb-4">Multiple (Repeat) Interactions</h5>
                  <p className="text-gray-700 mb-4">
                    <strong>Definition:</strong> Two or more distinct interactions within the trailing 7-day window.
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Metric Form:</strong> Repeat Interaction Started in Any CS Channel and Ended in {`{Specific CS Channel}`}.
                  </p>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Requires ≥2 distinct Visit IDs or Contact IDs.</li>
                      <li>Valid paths are defined by the CS Channel Matrix.</li>
                      <li>Always classified by the ending channel (e.g., Help Pages, Legacy Chatbot, CSA Email).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Key Inclusions and Exclusions */}
            <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h5 className="text-2xl font-bold text-gray-900 mb-6">Current Key Inclusions and Exclusions</h5>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h6 className="text-xl font-bold text-green-800 mb-4">Inclusions</h6>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">Reporting Verticals Covered</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li>Amazon CS</li>
                        <li>Stores Rollup = (Stores + AB + SDS Recipients + CAP)</li>
                        <li>Stores</li>
                        <li>D2 (Device & Digital)</li>
                        <li>SDS Driver Delivery</li>
                        <li>SDS Driver Non-Delivery</li>
                        <li>SDS Recipient</li>
                        <li>Amazon Business (AB)</li>
                        <li>CAP</li>
                        <li>Social Media (only Email contacts handled in AC3)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">Time Coverage</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li>Data for 2024</li>
                        <li>Data for 2025 YTD</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-gray-900 mb-2">Marketplace</div>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        <li>US Marketplace only</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Exclusions */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h6 className="text-xl font-bold text-red-800 mb-4">Exclusions</h6>
                  
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Outbound contacts</li>
                    <li>Records without a Comm ID</li>
                    <li>Records without a Customer ID (unauthenticated customers)</li>
                    <li>CSA → CSA Dart contacts</li>
                    <li>Social Media not handled in AC3 Email (e.g., Sprinklr data)</li>
                  </ul>
                </div>
              </div>

              {/* Further Opportunities / Extensions */}
              <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h6 className="text-xl font-bold text-blue-800 mb-4">Further Opportunities / Extensions</h6>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">Partitioning within existing categories</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>AI-enabled IVA (currently grouped within CS Voicebot)</li>
                      <li>Small population of AC3-handled social media email (currently grouped under CSA email)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">Potential New Inclusions</div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>CS on Rufus</li>
                      <li>CS on Alexa</li>
                      <li>For Digital (D2): possible subdivision by device type or by "cantilever" → splitting Digital interactions into sub-dimensions based on device form factor and usage context (e.g., Echo devices vs. Fire Tablets vs. Kindle).</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Currently Excluded (Reconfirmation) */}
              <div className="mt-6 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <h6 className="text-xl font-bold text-yellow-800 mb-4">Currently Excluded (Reconfirmation)</h6>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Outbound contacts</li>
                  <li>Dart: CSA → CSA transitions</li>
                  <li>Unauthenticated customers</li>
                  <li>Contacts without available Comm_ID (e.g., due to backfilling gaps)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why We Measure in a 7-Day Window */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Why We Measure in a 7-Day Window</h4>
              <p className="text-lg text-gray-600 italic">A time frame that matches the rhythm of customer experiences</p>
              <div className="w-16 h-1 bg-gray-300 mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Many customer needs play out over several days — deliveries, returns, and refunds don't resolve overnight. A 7-day trailing window gives us the right balance:
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-3">Reflects customer reality</h5>
                  <p className="text-gray-700 leading-relaxed">
                    Delivery questions often resolve in 2–3 days, returns may take 4–5, and refunds can run close to a week. A seven-day span keeps these connected interactions part of the same experience.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-3">Keeps the signal clean</h5>
                  <p className="text-gray-700 leading-relaxed">
                    A week is long enough to capture true repeats without pulling in unrelated events. It smooths out daily spikes — like weekend delivery peaks or weekday billing issues — so we see the underlying pattern, not noise.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h5 className="text-lg font-bold text-gray-900 mb-3">Works with how teams operate</h5>
                  <p className="text-gray-700 leading-relaxed">
                    Most CS and business reviews run on weekly cycles. Using the same time frame makes metrics easier to compare, align, and act on across reports and teams.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed text-center mt-8 font-medium">
                Seven days is long enough to capture what matters to customers, and short enough to keep the focus clear.
              </p>
            </div>
          </div>

                    {/* Classification Flow */}
          <div className="mb-12">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-gray-900 mb-4">How We Classify Single and Multiple Interactions</h4>
              <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>
            
            {/* Simple Flow Diagram */}
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm mb-8">
              <div className="text-center">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-black rounded-2xl p-8 border border-gray-800 shadow-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-gray-700">1</span>
                      </div>
                      <h6 className="text-xl font-bold text-white mb-4">No-Repeat</h6>
                      <p className="text-gray-300 leading-relaxed">
                        When an authenticated customer has only one interaction (Visit ID or Contact ID) within a 7-day trailing window.
                      </p>
                    </div>
                  </div>
                  <div className="bg-black rounded-2xl p-8 border border-gray-800 shadow-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-gray-800">2+</span>
                      </div>
                      <h6 className="text-xl font-bold text-white mb-4">Repeat</h6>
                      <p className="text-gray-300 leading-relaxed">
                        When an authenticated customer has two or more interactions (Visit ID or Contact ID) within a 7-day trailing window.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Principle */}
            <div className="text-center mb-6">
              <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-200 max-w-5xl mx-auto shadow-sm">
                <p className="text-2xl text-gray-800 font-bold mb-4">
                  Repeat doesn't tell us good or bad — it's just an indicator of single or multiple customer interactions within trailing 7 days.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
  </Section>
);

const faqData = [
  {
    question: "Are all no-repeats good? (1 interaction in 7 days)",
    answer: "Not always. A no-repeat only shows that the customer didn't return.",
    details: [
      { title: "Good no-repeat", text: "The customer got what they needed the first time." },
      { title: "Unhealthy no-repeat", text: "The customer gave up after a poor experience and chose not to try again." },
    ]
  },
  {
    question: "Are all repeats bad? (2+ interactions in 7 days)",
    answer: "Not always. A repeat only shows that the customer came back.",
     details: [
      { title: "Good repeat", text: "Valid reasons to return, like a driver contacting a CSA to speed up delivery, or adding details to prevent misdelivery." },
      { title: "Unhealthy repeat", text: "Issue not solved the first time, e.g., following up after a failed promise or re-explaining the same issue to multiple CSAs." },
    ]
  },
   {
    question: "What about egregious repeats? (3+ in 7 days)",
    answer: "Egregious repeats are a severe form of unhealthy repeats. By the third attempt, the customer has already put in reasonable effort. More returns almost always mean frustration and a broken experience.",
    details: [
        { title: "Example", text: `Unhealthy repeat (2): "I had to call back because the first solution didn't work."` },
        { title: "Egregious repeat (3+)", text: `"I contacted support three times about the same refund, and it's still not fixed."` }
    ]
  }
];

const FaqSection: React.FC = () => (
  <Section className="bg-white">
    <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">FAQs on Measurement</h2>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((item, index) => {
          return (
            <div key={index} className="bg-teal-50 rounded-2xl p-8 border border-teal-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">{item.question}</h4>
              <p className="text-gray-700 leading-relaxed mb-6">{item.answer}</p>
              {item.details && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {item.details.map((detail, detailIndex) => {
                    return (
                      <div key={detail.title} className="bg-teal-100 p-6 rounded-xl border border-teal-200">
                        <p className="font-semibold text-gray-900 mb-2">{detail.title}</p>
                        <p className="text-gray-600 leading-relaxed text-sm">{detail.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </Section>
);

// -- Main Page Component --

const MethodologyPage: React.FC = () => {
  return (
    <main className="antialiased" style={{backgroundColor: '#FEFCFB'}}>
      <HeroSection />
      <IntroductionSection />
      <MeasurementFlowSection />
      <FaqSection />
    </main>
  );
};

export default MethodologyPage;