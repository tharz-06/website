// Placeholder images for each gear category
export const categoryPlaceholders = {
  cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200',
  lenses: 'https://images.unsplash.com/photo-1546443046-ed1ce6ffd1a9?auto=format&fit=crop&q=80&w=1200',
  gimbals: 'https://images.unsplash.com/photo-1502920917128-1aa500764ce7?auto=format&fit=crop&q=80&w=1200',
  lighting: 'https://images.unsplash.com/photo-1560179707-f14e90ef1de6?auto=format&fit=crop&q=80&w=1200',
  audio: 'https://images.unsplash.com/photo-1492534535094-742b89fdc2f5?auto=format&fit=crop&q=80&w=1200',
  tripods: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=1200',
  drones: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&q=80&w=1200',
  default: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200'
};

export const getImageForItem = (item) => {
  if (item?.image && item.image.trim().length > 0) return item.image;
  const cat = (item?.category || 'default').toLowerCase();
  return categoryPlaceholders[cat] || categoryPlaceholders.default;
};


