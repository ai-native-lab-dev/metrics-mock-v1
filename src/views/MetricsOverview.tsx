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

// Mock data for the metrics organized under 4 clear sub-navigations
const mockMetricGroups = [
  {
    name: 'Total Interactions',
    metrics: [
      {
        metricName: 'Total Number of Repeat Interactions Across All Channels',
        question: 'How many total repeat interactions occurred across all channels?',
        definition: 'Count of all repeat interactions (≥2 contacts in 7-day window) across Bot, CSA, and Visit.',
        data2025: generateWeeklyData(3500000, 0.1),
        data2024: generateWeeklyData(3800000, 0.1)
      },
      {
        metricName: 'Percentage of Interactions That Are Repeats Across All Channels',
        question: 'What % of all interactions are from repeat customers?',
        definition: 'Repeat interactions ÷ Total interactions.',
        data2025: generateWeeklyData(18, 0.05),
        data2024: generateWeeklyData(20, 0.05)
      },
      {
        metricName: 'Percentage of Repeat Customers Who Contacted Between 3 and 23 Times Across All Channels',
        question: 'What % of repeat customers contacted 3–23 times?',
        definition: 'Repeat customers with 3–23 interactions ÷ Total repeat customers.',
        data2025: generateWeeklyData(72, 0.05),
        data2024: generateWeeklyData(70, 0.05)
      },
      {
        metricName: 'Percentage of Repeat Customers Who Contacted 24 or More Times Across All Channels',
        question: 'What % of repeats are extreme (24+)?',
        definition: 'Repeat customers with ≥24 interactions ÷ Total repeat customers.',
        data2025: generateWeeklyData(3, 0.1),
        data2024: generateWeeklyData(4, 0.1)
      },
      {
        metricName: 'Total Number of Repeat Interactions That Started in One Channel and Ended in a Different Channel',
        question: 'How many repeat interactions moved between channel types?',
        definition: 'Count of repeat interactions where Start≠End (e.g., Bot→CSA).',
        data2025: generateWeeklyData(1100000, 0.1),
        data2024: generateWeeklyData(1300000, 0.1)
      },
      {
        metricName: 'Total Number of Repeat Interactions That Started and Ended in the Same Channel',
        question: 'What share of repeats stayed within the same channel?',
        definition: 'Count of repeat interactions where Start=End.',
        data2025: generateWeeklyData(2400000, 0.1),
        data2024: generateWeeklyData(2500000, 0.1)
      },
      {
        metricName: 'Average Number of Repeat Interactions per Repeat Customer Across All Channels',
        question: 'On average, how many times did repeat customers come back?',
        definition: 'Total repeat interactions ÷ Repeat customers.',
        data2025: generateWeeklyData(3.4, 0.05),
        data2024: generateWeeklyData(3.6, 0.05)
      },
      {
        metricName: 'Percentage of Repeat Customers Who Escalated to a Different Channel on Their Second Interaction',
        question: 'What % of repeats escalated on the 2nd interaction?',
        definition: 'Repeat customers where escalation happened on 2nd contact ÷ All repeat customers.',
        data2025: generateWeeklyData(21, 0.05),
        data2024: generateWeeklyData(23, 0.05)
      },
      {
        metricName: 'Distribution of Repeat Interactions Across Channel Combinations',
        question: 'What is the breakdown of repeats moving between channel groups?',
        definition: 'Proportion of Bot→CSA, Visit→Bot, Visit→CSA, etc.',
        data2025: generateWeeklyData(25, 0.05),
        data2024: generateWeeklyData(30, 0.05)
      },
      {
        metricName: 'Year-over-Year Growth in Total Repeat Interactions Across All Channels',
        question: 'How is total repeat volume trending YoY?',
        definition: 'YoY % change in repeat customers across all channels.',
        data2025: generateWeeklyData(-7, 0.1),
        data2024: generateWeeklyData(-5, 0.1)
      }
    ]
  },
  {
    name: 'Self-Service: Bot Only',
    metrics: [
      {
        metricName: 'Total Bot Interactions',
        question: 'How many total interactions occurred with the bot?',
        definition: 'Count of all bot interactions across all customer sessions.',
        data2025: generateWeeklyData(100000, 0.15),
        data2024: generateWeeklyData(90000, 0.15)
      },
      {
        metricName: 'Bot Resolution Rate',
        question: 'What percentage of bot interactions were successfully resolved?',
        definition: 'The percentage of chatbot interactions that resulted in a successful resolution.',
        data2025: generateWeeklyData(82, 0.08),
        data2024: generateWeeklyData(77, 0.08)
      },
      {
        metricName: 'Bot Response Time',
        question: 'How quickly does the chatbot respond to user queries?',
        definition: 'The average time it takes for the chatbot to respond to user queries.',
        data2025: generateWeeklyData(1.1, 0.1),
        data2024: generateWeeklyData(1.7, 0.1)
      },
      {
        metricName: 'Bot Escalation Rate',
        question: 'What percentage of bot interactions escalated to human agents?',
        definition: 'Bot interactions that required human intervention ÷ Total bot interactions.',
        data2025: generateWeeklyData(15, 0.1),
        data2024: generateWeeklyData(18, 0.1)
      },
      {
        metricName: 'Bot User Satisfaction Score',
        question: 'How satisfied are users with bot interactions?',
        definition: 'Average satisfaction rating for bot interactions (1-5 scale).',
        data2025: generateWeeklyData(3.8, 0.05),
        data2024: generateWeeklyData(3.6, 0.05)
      },
      {
        metricName: 'Bot Session Duration',
        question: 'How long do users typically interact with the bot?',
        definition: 'Average time users spend in bot conversations.',
        data2025: generateWeeklyData(4.2, 0.1),
        data2024: generateWeeklyData(4.8, 0.1)
      },
      {
        metricName: 'Bot Intent Recognition Accuracy',
        question: 'How accurately does the bot understand user intent?',
        definition: 'Correctly identified intents ÷ Total intents processed.',
        data2025: generateWeeklyData(89, 0.05),
        data2024: generateWeeklyData(85, 0.05)
      },
      {
        metricName: 'Bot Fallback Rate',
        question: 'How often does the bot need to use fallback responses?',
        definition: 'Fallback responses ÷ Total bot responses.',
        data2025: generateWeeklyData(8, 0.1),
        data2024: generateWeeklyData(12, 0.1)
      },
      {
        metricName: 'Bot Multi-Turn Conversation Rate',
        question: 'What percentage of bot interactions involve multiple exchanges?',
        definition: 'Multi-turn conversations ÷ Total bot conversations.',
        data2025: generateWeeklyData(65, 0.05),
        data2024: generateWeeklyData(62, 0.05)
      },
      {
        metricName: 'Bot Repeat Interaction Rate',
        question: 'What percentage of bot interactions are from repeat users?',
        definition: 'Repeat bot interactions ÷ Total bot interactions.',
        data2025: generateWeeklyData(22, 0.05),
        data2024: generateWeeklyData(25, 0.05)
      }
    ]
  },
  {
    name: 'Human-Led: CSA Only',
    metrics: [
      {
        metricName: 'Total CSA Interactions',
        question: 'How many total interactions occurred with human agents?',
        definition: 'Count of all customer service agent interactions.',
        data2025: generateWeeklyData(80000, 0.15),
        data2024: generateWeeklyData(85000, 0.15)
      },
      {
        metricName: 'CSA Resolution Rate',
        question: 'What percentage of CSA interactions were successfully resolved?',
        definition: 'CSA interactions that resulted in resolution ÷ Total CSA interactions.',
        data2025: generateWeeklyData(88, 0.05),
        data2024: generateWeeklyData(85, 0.05)
      },
      {
        metricName: 'CSA Average Handle Time',
        question: 'How long does it take CSAs to handle interactions on average?',
        definition: 'Total CSA interaction time ÷ Number of CSA interactions.',
        data2025: generateWeeklyData(12.5, 0.1),
        data2024: generateWeeklyData(14.2, 0.1)
      },
      {
        metricName: 'CSA First Contact Resolution Rate',
        question: 'What percentage of issues are resolved on first contact?',
        definition: 'Issues resolved on first contact ÷ Total CSA interactions.',
        data2025: generateWeeklyData(75, 0.05),
        data2024: generateWeeklyData(72, 0.05)
      },
      {
        metricName: 'CSA Customer Satisfaction Score',
        question: 'How satisfied are customers with CSA interactions?',
        definition: 'Average satisfaction rating for CSA interactions (1-5 scale).',
        data2025: generateWeeklyData(4.2, 0.05),
        data2024: generateWeeklyData(4.0, 0.05)
      },
      {
        metricName: 'CSA Escalation Rate',
        question: 'What percentage of CSA interactions require escalation?',
        definition: 'CSA interactions escalated to supervisors ÷ Total CSA interactions.',
        data2025: generateWeeklyData(5, 0.1),
        data2024: generateWeeklyData(7, 0.1)
      },
      {
        metricName: 'CSA Queue Time',
        question: 'How long do customers wait before connecting to a CSA?',
        definition: 'Average time customers spend in queue before CSA connection.',
        data2025: generateWeeklyData(2.8, 0.1),
        data2024: generateWeeklyData(3.5, 0.1)
      },
      {
        metricName: 'CSA Transfer Rate',
        question: 'What percentage of CSA interactions are transferred to other agents?',
        definition: 'CSA interactions transferred ÷ Total CSA interactions.',
        data2025: generateWeeklyData(12, 0.1),
        data2024: generateWeeklyData(15, 0.1)
      },
      {
        metricName: 'CSA Repeat Interaction Rate',
        question: 'What percentage of CSA interactions are from repeat customers?',
        definition: 'Repeat CSA interactions ÷ Total CSA interactions.',
        data2025: generateWeeklyData(28, 0.05),
        data2024: generateWeeklyData(32, 0.05)
      },
      {
        metricName: 'CSA Productivity Score',
        question: 'How productive are CSAs in handling customer interactions?',
        definition: 'Resolved interactions per hour per CSA.',
        data2025: generateWeeklyData(4.8, 0.1),
        data2024: generateWeeklyData(4.5, 0.1)
      }
    ]
  },
  {
    name: 'Self-Guided: Page Visits',
    metrics: [
      {
        metricName: 'Total Page Views',
        question: 'How many pages did users view across the platform?',
        definition: 'The total number of page views across all user sessions.',
        data2025: generateWeeklyData(120000, 0.15),
        data2024: generateWeeklyData(115000, 0.15)
      },
      {
        metricName: 'Unique Visitors',
        question: 'How many unique users visited the platform?',
        definition: 'The count of distinct users who visited the platform during the specified period.',
        data2025: generateWeeklyData(50000, 0.15),
        data2024: generateWeeklyData(45000, 0.15)
      },
      {
        metricName: 'Session Duration',
        question: 'How long do users typically stay on the platform?',
        definition: 'The average time users spend on the platform per session.',
        data2025: generateWeeklyData(9.5, 0.1),
        data2024: generateWeeklyData(8.5, 0.1)
      },
      {
        metricName: 'Bounce Rate',
        question: 'What percentage of users leave after viewing only one page?',
        definition: 'Single-page sessions ÷ Total sessions.',
        data2025: generateWeeklyData(35, 0.05),
        data2024: generateWeeklyData(38, 0.05)
      },
      {
        metricName: 'Pages per Session',
        question: 'How many pages do users view on average per session?',
        definition: 'Total page views ÷ Total sessions.',
        data2025: generateWeeklyData(3.2, 0.1),
        data2024: generateWeeklyData(2.9, 0.1)
      },
      {
        metricName: 'Return Visitor Rate',
        question: 'What percentage of visitors are returning users?',
        definition: 'Returning visitors ÷ Total visitors.',
        data2025: generateWeeklyData(42, 0.05),
        data2024: generateWeeklyData(38, 0.05)
      },
      {
        metricName: 'Help Center Page Views',
        question: 'How many times were help center pages viewed?',
        definition: 'Total page views of help center and documentation pages.',
        data2025: generateWeeklyData(25000, 0.15),
        data2024: generateWeeklyData(22000, 0.15)
      },
      {
        metricName: 'Search Usage Rate',
        question: 'What percentage of users use the search functionality?',
        definition: 'Sessions with search usage ÷ Total sessions.',
        data2025: generateWeeklyData(28, 0.05),
        data2024: generateWeeklyData(25, 0.05)
      },
      {
        metricName: 'FAQ Page Views',
        question: 'How many times were FAQ pages viewed?',
        definition: 'Total page views of frequently asked questions.',
        data2025: generateWeeklyData(18000, 0.15),
        data2024: generateWeeklyData(16000, 0.15)
      },
      {
        metricName: 'Self-Service Completion Rate',
        question: 'What percentage of users complete self-service tasks?',
        definition: 'Completed self-service actions ÷ Total self-service attempts.',
        data2025: generateWeeklyData(68, 0.05),
        data2024: generateWeeklyData(65, 0.05)
      }
    ]
  }
];

const MetricsOverview: React.FC = () => {
  const [viewType, setViewType] = useState<'monthly' | 'weekly'>('monthly');

  return (
    <div>
      <Controls 
        viewType={viewType} 
        onViewTypeChange={setViewType} 
      />
      
      <MetricsTable 
        viewType={viewType} 
        metricGroups={mockMetricGroups}
      />
    </div>
  );
};

export default MetricsOverview;
