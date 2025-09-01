// Channel Matrix Rules - Valid combinations based on business rules
export interface ChannelCombination {
  start: string;
  end: string;
}

// All valid channel combinations based on Channel Matrix Rules
export const VALID_CHANNEL_COMBINATIONS: ChannelCombination[] = [
  // CS Landing Page can end in: CS Landing Page, Help Pages, CS Chatbot, CS Voicebot, AI-enabled Email, Legacy Chatbot, Legacy Voicebot, CSA Chat, CSA Voice, CSA Email
  { start: 'CS Landing Page', end: 'CS Landing Page' },
  { start: 'CS Landing Page', end: 'Help Pages' },
  { start: 'CS Landing Page', end: 'CS Chatbot' },
  { start: 'CS Landing Page', end: 'CS Voicebot' },
  { start: 'CS Landing Page', end: 'AI-enabled Email' },
  { start: 'CS Landing Page', end: 'Legacy Chatbot' },
  { start: 'CS Landing Page', end: 'Legacy Voicebot' },
  { start: 'CS Landing Page', end: 'CSA Chat' },
  { start: 'CS Landing Page', end: 'CSA Voice' },
  { start: 'CS Landing Page', end: 'CSA Email' },

  // CS Homepage can end in: CS Homepage, Help Pages, CS Chatbot, CS Voicebot, AI-enabled Email, Legacy Chatbot, Legacy Voicebot, CSA Chat, CSA Voice, CSA Email
  { start: 'CS Homepage', end: 'CS Homepage' },
  { start: 'CS Homepage', end: 'Help Pages' },
  { start: 'CS Homepage', end: 'CS Chatbot' },
  { start: 'CS Homepage', end: 'CS Voicebot' },
  { start: 'CS Homepage', end: 'AI-enabled Email' },
  { start: 'CS Homepage', end: 'Legacy Chatbot' },
  { start: 'CS Homepage', end: 'Legacy Voicebot' },
  { start: 'CS Homepage', end: 'CSA Chat' },
  { start: 'CS Homepage', end: 'CSA Voice' },
  { start: 'CS Homepage', end: 'CSA Email' },

  // Help Pages can end in: CS Landing Page, CS Homepage, Help Pages, CS Chatbot, CS Voicebot, AI-enabled Email, Legacy Chatbot, Legacy Voicebot, CSA Chat, CSA Voice, CSA Email
  { start: 'Help Pages', end: 'CS Landing Page' },
  { start: 'Help Pages', end: 'CS Homepage' },
  { start: 'Help Pages', end: 'Help Pages' },
  { start: 'Help Pages', end: 'CS Chatbot' },
  { start: 'Help Pages', end: 'CS Voicebot' },
  { start: 'Help Pages', end: 'AI-enabled Email' },
  { start: 'Help Pages', end: 'Legacy Chatbot' },
  { start: 'Help Pages', end: 'Legacy Voicebot' },
  { start: 'Help Pages', end: 'CSA Chat' },
  { start: 'Help Pages', end: 'CSA Voice' },
  { start: 'Help Pages', end: 'CSA Email' },

  // Bot channels can end in: CS Chatbot, CS Voicebot, AI-enabled Email, Legacy Chatbot, Legacy Voicebot, CSA Chat, CSA Voice, CSA Email
  { start: 'CS Chatbot', end: 'CS Chatbot' },
  { start: 'CS Chatbot', end: 'CS Voicebot' },
  { start: 'CS Chatbot', end: 'AI-enabled Email' },
  { start: 'CS Chatbot', end: 'Legacy Chatbot' },
  { start: 'CS Chatbot', end: 'Legacy Voicebot' },
  { start: 'CS Chatbot', end: 'CSA Chat' },
  { start: 'CS Chatbot', end: 'CSA Voice' },
  { start: 'CS Chatbot', end: 'CSA Email' },

  { start: 'CS Voicebot', end: 'CS Chatbot' },
  { start: 'CS Voicebot', end: 'CS Voicebot' },
  { start: 'CS Voicebot', end: 'AI-enabled Email' },
  { start: 'CS Voicebot', end: 'Legacy Chatbot' },
  { start: 'CS Voicebot', end: 'Legacy Voicebot' },
  { start: 'CS Voicebot', end: 'CSA Chat' },
  { start: 'CS Voicebot', end: 'CSA Voice' },
  { start: 'CS Voicebot', end: 'CSA Email' },

  { start: 'AI-enabled Email', end: 'CS Chatbot' },
  { start: 'AI-enabled Email', end: 'CS Voicebot' },
  { start: 'AI-enabled Email', end: 'AI-enabled Email' },
  { start: 'AI-enabled Email', end: 'Legacy Chatbot' },
  { start: 'AI-enabled Email', end: 'Legacy Voicebot' },
  { start: 'AI-enabled Email', end: 'CSA Chat' },
  { start: 'AI-enabled Email', end: 'CSA Voice' },
  { start: 'AI-enabled Email', end: 'CSA Email' },

  { start: 'Legacy Chatbot', end: 'CS Chatbot' },
  { start: 'Legacy Chatbot', end: 'CS Voicebot' },
  { start: 'Legacy Chatbot', end: 'AI-enabled Email' },
  { start: 'Legacy Chatbot', end: 'Legacy Chatbot' },
  { start: 'Legacy Chatbot', end: 'Legacy Voicebot' },
  { start: 'Legacy Chatbot', end: 'CSA Chat' },
  { start: 'Legacy Chatbot', end: 'CSA Voice' },
  { start: 'Legacy Chatbot', end: 'CSA Email' },

  { start: 'Legacy Voicebot', end: 'CS Chatbot' },
  { start: 'Legacy Voicebot', end: 'CS Voicebot' },
  { start: 'Legacy Voicebot', end: 'AI-enabled Email' },
  { start: 'Legacy Voicebot', end: 'Legacy Chatbot' },
  { start: 'Legacy Voicebot', end: 'Legacy Voicebot' },
  { start: 'Legacy Voicebot', end: 'CSA Chat' },
  { start: 'Legacy Voicebot', end: 'CSA Voice' },
  { start: 'Legacy Voicebot', end: 'CSA Email' },

  // CSA channels can only end in: CSA Chat, CSA Voice, CSA Email
  { start: 'CSA Chat', end: 'CSA Chat' },
  { start: 'CSA Chat', end: 'CSA Voice' },
  { start: 'CSA Chat', end: 'CSA Email' },

  { start: 'CSA Voice', end: 'CSA Chat' },
  { start: 'CSA Voice', end: 'CSA Voice' },
  { start: 'CSA Voice', end: 'CSA Email' },

  { start: 'CSA Email', end: 'CSA Chat' },
  { start: 'CSA Email', end: 'CSA Voice' },
  { start: 'CSA Email', end: 'CSA Email' }
];

// All available channels
export const ALL_CHANNELS = [
  'CS Landing Page',
  'CS Homepage', 
  'Help Pages',
  'CS Chatbot',
  'CS Voicebot',
  'AI-enabled Email',
  'Legacy Chatbot',
  'Legacy Voicebot',
  'CSA Chat',
  'CSA Voice',
  'CSA Email'
];

// Get valid end channels for a given start channel
export const getValidEndChannels = (startChannel: string): string[] => {
  if (startChannel === 'all') return ALL_CHANNELS;
  
  return VALID_CHANNEL_COMBINATIONS
    .filter(combo => combo.start === startChannel)
    .map(combo => combo.end);
};

// Get valid start channels for a given end channel
export const getValidStartChannels = (endChannel: string): string[] => {
  if (endChannel === 'all') return ALL_CHANNELS;
  
  return VALID_CHANNEL_COMBINATIONS
    .filter(combo => combo.end === endChannel)
    .map(combo => combo.start);
};

// Check if a channel combination is valid
export const isValidCombination = (startChannel: string, endChannel: string): boolean => {
  if (startChannel === 'all' || endChannel === 'all') return true;
  
  return VALID_CHANNEL_COMBINATIONS.some(
    combo => combo.start === startChannel && combo.end === endChannel
  );
};
