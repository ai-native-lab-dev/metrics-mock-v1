// Chart colors used across the application
export const CHART_COLORS = {
  visit: '#a855f7',    // Purple
  bot: '#3b82f6',      // Blue  
  csa: '#f97316',      // Orange
} as const;

// Channel group colors for UI components
export const getChannelGroupColors = (groupName: string) => {
  const name = groupName.toLowerCase();
  
  if (name.includes('total') || name.includes('interaction')) {
    return { 
      bg: 'bg-teal-50', 
      border: 'border-teal-200', 
      header: 'bg-teal-100', 
      dot: 'bg-teal-400',
      text: 'text-teal-700'
    };
  } else if (name.includes('bot')) {
    return { 
      bg: 'bg-blue-50', 
      border: 'border-blue-200', 
      header: 'bg-blue-100', 
      dot: 'bg-blue-400',
      text: 'text-blue-700'
    };
  } else if (name.includes('csa') || name.includes('human')) {
    return { 
      bg: 'bg-orange-50', 
      border: 'border-orange-200', 
      header: 'bg-orange-100', 
      dot: 'bg-orange-400',
      text: 'text-orange-700'
    };
  } else if (name.includes('visit') || name.includes('page')) {
    return { 
      bg: 'bg-purple-50', 
      border: 'border-purple-200', 
      header: 'bg-purple-100', 
      dot: 'bg-purple-400',
      text: 'text-purple-700'
    };
  }
  
  return { 
    bg: 'bg-gray-50', 
    border: 'border-gray-200', 
    header: 'bg-gray-100', 
    dot: 'bg-gray-400',
    text: 'text-gray-700'
  };
};

// Type-specific colors
export const getTypeColors = (type: 'repeat' | 'no-repeat') => ({
  dot: type === 'repeat' ? 'bg-orange-400' : 'bg-blue-400',
  text: type === 'repeat' ? 'text-orange-700' : 'text-blue-700',
});
