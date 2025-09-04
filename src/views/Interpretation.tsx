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
  <header className="text-center py-16 bg-black">
    <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
        From Measurement to Drivers
      </h1>
    </div>
  </header>
);

const IntroductionSection: React.FC = () => (
  <Section className="!py-0 bg-white">
    <div className="bg-white border border-gray-100 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The Foundation Question</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Measuring customer interactions gives us a baseline, but that only tells us <span className="text-purple-600 font-semibold">what happened</span>.
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">The Harder Question</h3>
            <p className="text-lg text-gray-700 font-medium">
              <span className="text-purple-700 font-bold">Why did it happen?</span>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-base text-gray-700 leading-relaxed">
            We identify drivers through five approaches: gut-sense, heuristics, anomaly detection, AI models, and causal inference.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

const ApproachesSection: React.FC = () => (
  <Section className="bg-white">
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How We Identify Drivers
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {[
          {
            title: "Gut-Sense (Judgment)",
            description: "→ \"I think this is why…\""
          },
          {
            title: "Heuristic (Rules-Based)",
            description: "→ \"Rule of thumb…\""
          },
          {
            title: "Anomaly-Based (Spot Check)",
            description: "→ \"That looks odd…\""
          },
          {
            title: "AI-Based (Model Inference)",
            description: "→ \"AI spots the trends…\""
          },
          {
            title: "Econ-Based (Causal Inference)",
            description: "→ \"Cause and effect was tested…\""
          }
        ].map((approach, index) => (
          <div key={index} className="bg-indigo-200 rounded-xl p-4 border border-indigo-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{approach.title}</h3>
            <p className="text-base text-gray-700">{approach.description}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const FocusAreasSection: React.FC = () => (
  <Section className="bg-white">
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Our Initial Focus Areas
        </h2>
      </div>
      
      <div className="max-w-4xl mx-auto space-y-4">
        {[
          {
            title: "Egregious (3+) & High-Volume Repeats",
            description: "Customers with 3+ contacts in 7 days, focusing on P90 percentile."
          },
          {
            title: "CS Channel Trends",
            description: "Heatmaps comparing repeats and no-repeats by channel."
          },
          {
            title: "Customer-Perceived Reasons",
            description: "Transcript analysis identifying key reasons for repeats."
          },
          {
            title: "Silent Dissatisfaction",
            description: "No-repeat customers with negative sentiment signals."
          }
        ].map((area, index) => (
          <div key={index} className="bg-rose-200 rounded-xl p-4 border border-rose-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{area.title}</h3>
            <p className="text-base text-gray-700">{area.description}</p>
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
