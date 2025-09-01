import React, { useState } from 'react';
import Controls from '../components/Controls';
import MetricsTable from '../components/MetricsTable';

// Helper function to generate 52 weeks of realistic data
const generateWeeklyData = (baseValue: number, variance: number = 0.2): number[] => {
  const data = [];
  for (let week = 1; week <= 52; week++) {
    // Add some seasonal variation and random fluctuation
    const seasonalFactor = 1 + 0.1 * Math.sin((week / 52) * 2 * Math.PI);
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const value = Math.round(baseValue * seasonalFactor * randomFactor);
    data.push(value);
  }
  return data;
};

interface CXImpactProps {
  metricGroup: 'cx-impact-p95' | 'cx-impact-p90';
}

interface TranscriptSample {
  id: number;
  customer: string;
  issue: string;
  transcript: string;
  sentiment: string;
  resolution: string;
  period?: string;
  metricValue?: number;
}

// Mock data for the metrics (same as MetricsOverview but filtered)
const mockMetricGroups = [
  {
    name: 'Potential Egregious & High-Volume (P95)',
    metrics: [
      {
        metricName: 'Potential Egregious & High-Volume Repeat (P95)',
        question: 'What share of customers had egregious repeat contacts (≥3) and up to high-volume contacts (≤34 at P95)?',
        definition: 'The percentage of repeat customers who contact us 3-34 times within 7 days. This range covers the 95th percentile of repeat behavior, excluding extreme outliers.',
        isP90P95: true,
        fullDefinition: 'Scope: Customers whose repeat interactions started in any CS channel and ended in any CS channel (chat, voice, email, etc.).\n\nNumerator: Count of repeat customers with 3 to 34 contacts in the trailing 7-day window.\n\n≥3 = Egregious: Customers who contacted us at least 3 times, signaling breakdowns in resolution.\n≤34 = P95 Cutoff: This represents the 95th percentile of repeat distribution. The top 5% of extreme outliers are excluded to avoid distortion.\n\nDenominator: Total repeat customers in the same period.\n\nUnit of Measure: Contact volumes, shown as weekly and monthly trends.',
        data2025: generateWeeklyData(42, 0.1),
        data2024: generateWeeklyData(57, 0.1)
      }
    ]
  },
  {
    name: 'Potential Egregious & High-Volume (P90)',
    metrics: [
      {
        metricName: 'Potential Egregious & High-Volume Repeat (P90)',
        question: 'What share of customers had egregious repeat contacts (≥3) and up to high-volume contacts (≤34 at P90)?',
        definition: 'The percentage of repeat customers who contact us 3-34 times within 7 days. This range covers the 90th percentile of repeat behavior, excluding extreme outliers.',
        isP90P95: true,
        fullDefinition: 'Scope: Customers whose repeat interactions started in any CS channel and ended in any CS channel (chat, voice, email, etc.).\n\nNumerator: Count of repeat customers with 3 to 34 contacts in the trailing 7-day window.\n\n≥3 = Egregious: Customers who contacted us at least 3 times, signaling breakdowns in resolution.\n≤34 = P90 Cutoff: This represents the 90th percentile of repeat distribution. The top 10% of extreme outliers are excluded to avoid distortion.\n\nDenominator: Total repeat customers in the same period.\n\nUnit of Measure: Contact volumes, shown as weekly and monthly trends.',
        data2025: generateWeeklyData(30, 0.1),
        data2024: generateWeeklyData(42, 0.1)
      }
    ]
  }
];

// Mock transcript samples
const mockTranscriptSamples: TranscriptSample[] = [
  {
    id: 1,
    customer: "Customer A",
    issue: "Product return request",
    transcript: "Customer requested return due to damaged item. Agent provided return label and refund process explanation.",
    sentiment: "Neutral",
    resolution: "Return label provided, refund initiated"
  },
  {
    id: 2,
    customer: "Customer B", 
    issue: "Billing dispute",
    transcript: "Customer disputed unexpected charges. Agent reviewed account and explained charges were legitimate.",
    sentiment: "Frustrated",
    resolution: "Charges explained, customer satisfied"
  },
  {
    id: 3,
    customer: "Customer C",
    issue: "Technical support",
    transcript: "Customer needed help with app login. Agent guided through password reset process.",
    sentiment: "Confused",
    resolution: "Password reset completed successfully"
  }
];

const CXImpact: React.FC<CXImpactProps> = ({ metricGroup }) => {
  const [viewType, setViewType] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedTranscripts, setSelectedTranscripts] = useState<TranscriptSample[]>(mockTranscriptSamples);

  const handleDataCellClick = (metricName: string, period: string, value: number) => {
    // In a real app, this would fetch relevant transcript samples based on the clicked data
    // For now, we'll just update the selected transcripts with mock data
    const newTranscripts = mockTranscriptSamples.map(sample => ({
      ...sample,
      period: period,
      metricValue: value
    }));
    setSelectedTranscripts(newTranscripts);
  };

  const getGroupName = () => {
    return metricGroup === 'cx-impact-p95' 
      ? 'Potential Egregious & High-Volume (P95)'
      : 'Potential Egregious & High-Volume (P90)';
  };



  return (
    <div>
      <Controls 
        viewType={viewType} 
        onViewTypeChange={setViewType} 
      />
      
      <MetricsTable 
        viewType={viewType} 
        metricGroups={mockMetricGroups}
        onDataCellClick={handleDataCellClick}
        showOnlyGroup={getGroupName()}
      />

      {/* Deep Dive Section */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Curated Insights */}
        <div className="bg-gradient-to-br from-blue-50/80 to-blue-100/40 rounded-2xl border-2 border-blue-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-blue-900">Curated Insights</h3>
          </div>
          
          <div className="space-y-6 text-blue-800 leading-relaxed">
            <p>
              Analysis of {metricGroup === 'cx-impact-p95' ? 'P95' : 'P90'} response times reveals several key factors contributing to egregious customer contacts. 
              Complex billing disputes and technical issues requiring escalation account for the majority of extended response times, 
              often stemming from incomplete initial problem documentation or insufficient first-tier resolution capabilities.
            </p>
            
            <p>
              Repeat contacts frequently occur due to unresolved root causes in the initial interaction. Customers experiencing 
              product defects or service outages often require multiple touchpoints before reaching a satisfactory resolution, 
              particularly when the issue spans multiple departments or requires specialized technical expertise.
            </p>
            
            <p>
              Seasonal patterns show increased contact volume during product launches and holiday periods, where customer 
              expectations are heightened and support resources may be stretched thin. This correlation suggests that 
              proactive communication and enhanced self-service options during peak periods could significantly reduce 
              the need for extended support interactions.
            </p>
            
            <p>
              The data indicates that customers with premium service tiers tend to have lower repeat contact rates, 
              suggesting that enhanced service levels and dedicated support channels effectively address issues 
              more comprehensively on the first interaction.
            </p>
          </div>
        </div>

        {/* Filtered Transcript Samples */}
        <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/40 rounded-2xl border-2 border-gray-200/50 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Customer Interactions</h3>
          </div>
          
          <div className="space-y-4">
            {selectedTranscripts.map((transcript) => (
              <div key={transcript.id} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:border-gray-300/70 hover:shadow-md transition-all duration-300 ease-out">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{transcript.customer.charAt(transcript.customer.length - 1)}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{transcript.customer}</span>
                  </div>
                  <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                    transcript.sentiment === 'Frustrated' ? 'bg-red-100 text-red-800 border border-red-200' :
                    transcript.sentiment === 'Confused' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                    'bg-green-100 text-green-800 border border-green-200'
                  }`}>
                    {transcript.sentiment}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100/50">
                    <div className="text-sm font-bold text-blue-800 mb-2">Issue</div>
                    <p className="text-blue-700">{transcript.issue}</p>
                  </div>
                  
                  <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-100/50">
                    <div className="text-sm font-bold text-gray-800 mb-2">Conversation</div>
                    <p className="text-gray-700 leading-relaxed">{transcript.transcript}</p>
                  </div>
                  
                  <div className="bg-green-50/50 rounded-lg p-4 border border-green-100/50">
                    <div className="text-sm font-bold text-green-800 mb-2">Resolution</div>
                    <p className="text-green-700">{transcript.resolution}</p>
                  </div>
                </div>
                
                {transcript.period && (
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-gray-600">Period: {transcript.period}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-600">Value: {transcript.metricValue?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CXImpact;
