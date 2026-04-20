/**
 * Extracts the YouTube video ID from a YouTube URL
 * Supports various YouTube URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
export const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle youtu.be URLs
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split(/[?&#]/)[0];
  }
  
  // Handle youtube.com URLs
  if (url.includes('youtube.com/')) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  }
  
  // Handle YouTube Shorts
  if (url.includes('youtube.com/shorts/')) {
    return url.split('youtube.com/shorts/')[1].split('?')[0];
  }
  
  return null;
};

/**
 * Generates a YouTube thumbnail URL
 * @param videoId - The YouTube video ID
 * @param quality - Thumbnail quality: 'default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'
 * @returns URL to the thumbnail image
 */
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Checks if a URL is a YouTube URL
 */
export const isYouTubeUrl = (url: string): boolean => {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
};
