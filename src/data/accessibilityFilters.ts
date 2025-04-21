export const accessibilityFilters = {
  visual: {
    category: 'Visual',
    features: [
      {
        name: 'Colorblind Mode',
        key: 'colorblind_mode',
        levels: ['basic', 'advanced', 'customizable'],
      },
      {
        name: 'Subtitles',
        key: 'subtitles',
        levels: ['basic', 'advanced', 'customizable'],
      },
    ],
  },
  controls: {
    category: 'Controls',
    features: [
      {
        name: 'Remappable Controls',
        key: 'remappable_controls',
        levels: ['basic', 'advanced', 'customizable'],
      },
      {
        name: 'One-Handed Mode',
        key: 'one_handed_mode',
        levels: ['basic', 'advanced', 'customizable'],
      },
    ],
  },
  audio: {
    category: 'Audio',
    features: [
      {
        name: 'Narration',
        key: 'narration',
        levels: ['basic', 'advanced', 'customizable'],
      },
    ],
  },
  gameplay: {
    category: 'Gameplay',
    features: [
      {
        name: 'Difficulty Options',
        key: 'difficulty_options',
        levels: ['basic', 'advanced', 'customizable'],
      },
      {
        name: 'QTE Toggle',
        key: 'qte_toggle',
        levels: ['basic', 'advanced', 'customizable'],
      },
    ],
  },
};
