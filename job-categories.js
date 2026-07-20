// Job Urgency Categories Configuration
// Edit these to customize how jobs are categorized based on hours since posting

const JOB_CATEGORIES = [
  {
    name: '🆕 Fresh Outta HR',
    emoji: '🆕',
    min: 0,
    max: 1,
    tag: 'NEW',
    tagColor: 'green' // CSS class suffix
  },
  {
    name: '🔥 Recruiters Are Watching',
    emoji: '🔥',
    min: 2,
    max: 7,
    tag: 'HOT',
    tagColor: 'hot'
  },
  {
    name: '😎 Still Up for Grabs',
    emoji: '😎',
    min: 8,
    max: 19,
    tag: null,
    tagColor: null
  },
  {
    name: '⏰ Don\'t Ghost This Job',
    emoji: '⏰',
    min: 20,
    max: 23,
    tag: 'COLD',
    tagColor: 'cold'
  },
  {
    name: '🚨 Apply Before It Ghosts You! 👻',
    emoji: '🚨',
    min: 24,
    max: 27,
    tag: 'URGENT',
    tagColor: 'urgent'
  }
];

// Helper function to get category by hours
function getCategoryByHours(hoursOld) {
  for (let i = 0; i < JOB_CATEGORIES.length; i++) {
    const cat = JOB_CATEGORIES[i];
    if (hoursOld >= cat.min && hoursOld <= cat.max) {
      return { ...cat, index: i };
    }
  }
  return { ...JOB_CATEGORIES[JOB_CATEGORIES.length - 1], index: JOB_CATEGORIES.length - 1 };
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JOB_CATEGORIES, getCategoryByHours };
}
