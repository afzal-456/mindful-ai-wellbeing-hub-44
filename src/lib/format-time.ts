
export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  // Format as M:SS
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
