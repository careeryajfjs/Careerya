// Job Urgency Tags Configuration
// Edit these to customize how jobs are tagged based on days since posting
// Tags are shown inline on job rows for quick visual scanning

const JOB_TAGS = [
  {
    name: 'FRESH',
    emoji: '🆕',
    min: 0,
    max: 1,
    label: 'Just dropped!',
    color: 'fresh'
  },
  {
    name: 'HEATING UP',
    emoji: '🔥',
    min: 2,
    max: 7,
    label: 'Getting hot 🔥',
    color: 'hot'
  },
  {
    name: 'CHILL',
    emoji: '😎',
    min: 8,
    max: 19,
    label: 'Still cool',
    color: 'chill'
  },
  {
    name: 'TICKING',
    emoji: '⏰',
    min: 20,
    max: 23,
    label: 'Clock\'s ticking',
    color: 'ticking'
  },
  {
    name: 'EXPIRE SOON',
    emoji: '🚨',
    min: 24,
    max: 999,
    label: 'Ghost incoming 👻',
    color: 'expire'
  }
];

// Helper function to get tag by days old
function getTagByDays(daysOld) {
  for (let i = 0; i < JOB_TAGS.length; i++) {
    const tag = JOB_TAGS[i];
    if (daysOld >= tag.min && daysOld <= tag.max) {
      return { ...tag, index: i };
    }
  }
  // Default to last tag if beyond range
  return { ...JOB_TAGS[JOB_TAGS.length - 1], index: JOB_TAGS.length - 1 };
}

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { JOB_TAGS, getTagByDays };
}
