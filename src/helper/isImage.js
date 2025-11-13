

const isImageUrl = (url) => {
  if (!url || url === 'self' || url === 'default' || url === 'nsfw' || url === 'spoiler') {
    return false;
  }
  // Check for image file extensions or known image hosts
  return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url) || 
         url.includes('i.redd.it') || 
         url.includes('i.imgur.com');
};

// Helper function to get the best image URL
export const getImageUrl = (post) => {
  const { url, preview, thumbnail } = post.data;
  
  // Priority 1: Direct image URL
  if (isImageUrl(url)) {
    return url;
  }
  
  // Priority 2: Preview images (high quality)
  if (preview?.images?.[0]?.source?.url) {
    return preview.images[0].source.url.replace(/&amp;/g, '&');
  }
  
  // Priority 3: Thumbnail (if it's a valid image)
  if (isImageUrl(thumbnail)) {
    return thumbnail;
  }
  
  return null;
};