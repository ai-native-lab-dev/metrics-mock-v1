import { VALID_CHANNEL_COMBINATIONS } from '../utils/channelMatrix';

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

// Interface for individual metric data
export interface MetricData {
  metricName: string;
  question: string;
  definition: string;
  data2025: number[]; // Data for 2025 (12 months or 52 weeks)
  data2024: number[]; // Data for 2024 (12 months or 52 weeks)
}

// Interface for a group of related metrics
export interface MetricGroup {
  name: string;
  metrics: MetricData[];
}

// Use valid channel combinations from the channel matrix utility
const validCombinations = VALID_CHANNEL_COMBINATIONS;

// Generate metrics for each valid combination
const generateMetricsForCombination = (combination: { start: string; end: string }) => {
  const baseValue = Math.floor(Math.random() * 200000) + 50000; // Random base value between 50K-250K
  
  return [
    // Repeat Interaction
    {
      metricName: `Repeat Interaction Started in ${combination.start} and Ended in ${combination.end}`,
      question: `How many repeat interactions started in ${combination.start} and ended in ${combination.end}?`,
      definition: `Count of repeat interactions that started in ${combination.start} and ended in ${combination.end}.`,
      data2025: generateWeeklyData(baseValue, 0.1),
      data2024: generateWeeklyData(baseValue * 1.1, 0.1)
    },
    // No Repeat Interaction
    {
      metricName: `No Repeat Interaction Started in ${combination.start} and Ended in ${combination.end}`,
      question: `How many no-repeat interactions started in ${combination.start} and ended in ${combination.end}?`,
      definition: `Count of no-repeat interactions that started in ${combination.start} and ended in ${combination.end}.`,
      data2025: generateWeeklyData(baseValue * 0.7, 0.1),
      data2024: generateWeeklyData(baseValue * 0.8, 0.1)
    },
    // Rate metrics
    {
      metricName: `${combination.start} to ${combination.end} Share of Repeat`,
      question: `What percentage of repeat interactions are ${combination.start} to ${combination.end}?`,
      definition: `${combination.start} to ${combination.end} repeat interactions ÷ Total repeat interactions.`,
      data2025: generateWeeklyData(Math.floor(Math.random() * 10) + 1, 0.05),
      data2024: generateWeeklyData(Math.floor(Math.random() * 10) + 1, 0.05)
    },
    {
      metricName: `${combination.start} to ${combination.end} Share of No-Repeat`,
      question: `What percentage of no-repeat interactions are ${combination.start} to ${combination.end}?`,
      definition: `${combination.start} to ${combination.end} no-repeat interactions ÷ Total no-repeat interactions.`,
      data2025: generateWeeklyData(Math.floor(Math.random() * 8) + 1, 0.05),
      data2024: generateWeeklyData(Math.floor(Math.random() * 8) + 1, 0.05)
    },
    {
      metricName: `${combination.start} to ${combination.end} Share of Total`,
      question: `What percentage of all interactions are ${combination.start} to ${combination.end}?`,
      definition: `${combination.start} to ${combination.end} interactions ÷ Total interactions.`,
      data2025: generateWeeklyData(Math.floor(Math.random() * 5) + 1, 0.05),
      data2024: generateWeeklyData(Math.floor(Math.random() * 5) + 1, 0.05)
    }
  ];
};

// Generate all metrics
const allMetrics = validCombinations.flatMap(generateMetricsForCombination);

// Helper function to filter metrics by ending channel type
const filterMetricsByEndingChannelType = (metrics: MetricData[], channelType: 'visit' | 'bot' | 'csa' | 'all') => {
  if (channelType === 'all') return metrics;
  
  return metrics.filter(metric => {
    const name = metric.metricName.toLowerCase();
    switch (channelType) {
      case 'visit':
        // Only include metrics that END in visit channels
        return name.includes('ended in cs landing page') || 
               name.includes('ended in cs homepage') || 
               name.includes('ended in help pages');
      case 'bot':
        // Only include metrics that END in bot channels
        return name.includes('ended in cs chatbot') || 
               name.includes('ended in cs voicebot') || 
               name.includes('ended in ai-enabled email') || 
               name.includes('ended in legacy chatbot') || 
               name.includes('ended in legacy voicebot');
      case 'csa':
        // Only include metrics that END in CSA channels
        return name.includes('ended in csa chat') || 
               name.includes('ended in csa voice') || 
               name.includes('ended in csa email');
      default:
        return true;
    }
  });
};

// Mock data for the metrics based strictly on Channel Matrix Rules
export const mockMetricGroups: MetricGroup[] = [
  {
    name: 'Total Interactions',
    metrics: allMetrics
  },
  {
    name: 'Self-Service: Bot Channels',
    metrics: filterMetricsByEndingChannelType(allMetrics, 'bot')
  },
  {
    name: 'Human-Led: CSA Channels',
    metrics: filterMetricsByEndingChannelType(allMetrics, 'csa')
  },
  {
    name: 'Self-Guided: Visit Channels',
    metrics: filterMetricsByEndingChannelType(allMetrics, 'visit')
  }
];