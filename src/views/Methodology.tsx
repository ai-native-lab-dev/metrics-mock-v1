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
          Customers don't think in terms of "channels" — they just try to solve their issue. A single experience might include browsing Help Pages, trying the CS Chatbot, and then ending with a CSA over chat or voice. To improve those experiences, we need a system that measures interactions in a way that is:
        </p>
        
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
            Sometimes a customer only visits, sometimes they only contact, and often they do both in the same issue. Together, these make up the Total Customer Interaction. Sometimes both appear together — for example, a customer starts on the CS Landing Page (Visit) and ends in CSA Chat (Contact).
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Every visit and contact is tied to a Customer ID, so we measure effort at the customer level
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
      </div>

    {/* Step 2 */}
    <div className="bg-white border border-gray-100 rounded-2xl p-12 md:p-16">
        <div className="text-center mb-16">
        </div>

                <div className="max-w-5xl mx-auto">
          
                    {/* Classification Flow */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h4 className="text-3xl font-bold text-gray-900 mb-4">How We Classify Single and Multiple Interactions</h4>
              <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>
            
            {/* Simple Flow Diagram */}
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm mb-12">
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
            <div className="text-center mb-12">
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
    question: "Why 7 days?",
    answer: "Many issues take a few days to play out (deliveries, returns, refunds). A week also aligns with how teams review and report. The same 7-day rule keeps results consistent and smooths out daily spikes. Seven days is long enough to capture real repeats, short enough to separate unrelated problems."
  },
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