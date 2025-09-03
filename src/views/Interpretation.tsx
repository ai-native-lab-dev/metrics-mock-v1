import React from 'react';

// -- UI Components --

const LineIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-6 h-6" }) => {
  const icons: { [key: string]: React.ReactNode } = {
    target: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />,
    book: <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />,
    'check-circle': <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    'refresh-cw': <><polyline points="23 4 23 10 17 10" /><polyline points="1 4 1 10 7 10" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64M3.51 15A9 9 0 0 0 18.36 18.36" /></>,
    'thumbs-up': <path d="M7 11v8a1 1 0 0 0 1 1h7c.6 0 1.1-.4 1.3-.9l3.2-6.4c.1-.2.1-.5 0-.7a1 1 0 0 0-.8-.4H14V5c0-1.1-.9-2-2-2h0a2 2 0 0 0-2 2v6Z" />,
    'thumbs-down': <path d="M17 13v-8a1 1 0 0 0-1-1h-7c-.6 0-1.1.4-1.3.9L4.5 9.6a1 1 0 0 0 0 .7c.2.5.7.7.8.7H10v6c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2Z" />,
    'alert-triangle': <><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></>,
    'brain': <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-6.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />,
    'trending-up': <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>,
    'search': <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
    'bar-chart': <><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></>
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

// -- Page Section Components --

const HeroSection: React.FC = () => (
  <header className="text-center py-24 md:py-32 bg-black">
    <div className="max-w-5xl mx-auto px-6">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-8">
        <span className="text-sm font-medium text-purple-700">Interpretation</span>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
        From Measurement to Drivers
      </h1>
    </div>
  </header>
);

const IntroductionSection: React.FC = () => (
  <Section className="!py-0 bg-white">
    <div className="bg-white border border-gray-100 rounded-2xl p-12 md:p-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Foundation Question</h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Measuring whether customers interacted once or more within 7 days gives us a clear baseline. But that only tells us <span className="text-purple-600 font-semibold">what happened</span>.
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Harder Question</h3>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              <span className="text-purple-700 font-bold">Why did it happen?</span>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            To uncover the drivers behind repeat and no-repeat, we use a structured set of approaches and then apply them to the areas most likely to explain customer behavior.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

const ApproachesSection: React.FC = () => (
  <Section className="bg-white">
    <div className="bg-teal-50 border border-teal-200 rounded-2xl p-12 md:p-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          How We Identify Drivers
        </h2>

      </div>
      
      <div className="max-w-5xl mx-auto space-y-8">
        {[
          {
            title: "Gut-Sense (Judgment)",
            description: "→ \"I think this is why…\"",
            example: "Suspected refunds were confusing based on CSA feedback."
          },
          {
            title: "Heuristic (Rules-Based)",
            description: "→ \"Rule of thumb…\"",
            example: "Flagging repeat rates >20% as a problem."
          },
          {
            title: "Anomaly-Based (Spot Check)",
            description: "→ \"That looks odd…\"",
            example: "Noticing a sudden spike in bot-only repeats."
          },
          {
            title: "AI-Based (Model Inference)",
            description: "→ \"AI spots the trends…\"",
            example: "Models linking late deliveries to higher repeat contacts."
          },
          {
            title: "Econ-Based (Causal Inference)",
            description: "→ \"Cause and effect was tested…\"",
            example: "Regression or HTE analysis showing a new policy reduced repeats more for non-Prime vs. Prime customers."
          }
        ].map((approach, index) => (
          <div key={index} className="bg-black rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4">{approach.title}</h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">{approach.description}</p>
            <details className="bg-gray-800 rounded-xl border border-gray-700">
              <summary className="p-4 cursor-pointer text-sm font-medium text-gray-400 hover:text-gray-300">
                Example
              </summary>
              <div className="px-4 pb-4">
                <p className="text-gray-200 font-medium">{approach.example}</p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const FocusAreasSection: React.FC = () => (
  <Section className="bg-white">
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-12 md:p-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Our Initial Focus: Where We Looked
        </h2>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-8">
        {[
          {
            title: "Egregious (3+) & High-Volume (P95)",
            description: "Customers with 3+ contacts in 7 days, where volume spikes at the 95th percentile.",
            note: undefined
          },
          {
            title: "Egregious (3+) & High-Volume (P90)",
            description: "Similar definition but at the 90th percentile, capturing a broader set of repeat customers.",
            note: undefined
          },
          {
            title: "CS Channel Trends",
            description: "Heatmaps comparing:",
            details: [
              "Repeats by start and end channel.",
              "No-repeats by end channel."
            ],
            note: undefined
          },
          {
            title: "Pareto of Customer-Perceived Reasons",
            description: "Transcript analysis (using LLMs) identified the small set of reasons customers themselves gave that accounted for most repeats.",
            note: undefined
          },
          {
            title: "Silent Dissatisfaction",
            description: "Some \"no-repeat\" transcripts still showed negative sentiment. These customers didn't come back, but their dissatisfaction signaled hidden problems affecting trust.",
            note: undefined
          }
        ].map((area, index) => (
          <div key={index} className="bg-amber-200 rounded-2xl p-8 border border-amber-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{area.title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{area.description}</p>
            {area.details && (
              <div className="mb-6">
                {area.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start space-x-3 mb-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{detail}</p>
                  </div>
                ))}
              </div>
            )}
            {area.note && (
              <div className="bg-amber-100 rounded-xl p-4 border border-amber-200">
                <p className="text-sm font-medium text-gray-600">{area.note}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </Section>
);

// -- Main Page Component --

const InterpretationPage: React.FC = () => {
  return (
    <main className="antialiased" style={{backgroundColor: '#FEFCFB'}}>
      <HeroSection />
      <IntroductionSection />
      <ApproachesSection />
      <FocusAreasSection />
    </main>
  );
};

export default InterpretationPage;
