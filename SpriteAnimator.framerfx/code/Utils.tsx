export const distance = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(dx * dx + dy * dy);
};

export const angle = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return degrees(Math.atan2(dy, dx));
};

export const radians = a => a * (Math.PI / 180);

export const degrees = a => a * (180 / Math.PI);
