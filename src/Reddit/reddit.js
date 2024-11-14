export const API_ROOT = 'https://www.reddit.com';

/**
 * Fetches posts from a specified subreddit
 * @param {string} subreddit - The subreddit path (e.g., "/r/javascript")
 * @returns {Promise<Array<Object>>} Array of post objects
 * @throws {Error} If the fetch fails or response is invalid
 */
export const getSubredditPosts = async (subreddit) => {
  try {
    if (!subreddit) {
      throw new Error('Subreddit parameter is required');
    }

    const response = await fetch(`${API_ROOT}${subreddit}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    
    if (!json.data?.children) {
      throw new Error('Invalid API response format');
    }

    return json.data.children.map((post) => ({
      id: post.data.id,
      title: post.data.title,
      author: post.data.author,
      created: post.data.created_utc,
      score: post.data.score,
      numComments: post.data.num_comments,
      permalink: post.data.permalink,
      url: post.data.url,
      selfText: post.data.selftext,
      thumbnail: post.data.thumbnail
    }));
  } catch (error) {
    console.error('Error fetching subreddit posts:', error);
    throw error;
  }
};

/**
 * Fetches list of popular subreddits
 * @returns {Promise<Array<Object>>} Array of subreddit objects
 * @throws {Error} If the fetch fails or response is invalid
 */
export const getSubreddits = async () => {
  try {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    
    if (!json.data?.children) {
      throw new Error('Invalid API response format');
    }

    return json.data.children.map((subreddit) => ({
      id: subreddit.data.id,
      name: subreddit.data.display_name,
      title: subreddit.data.title,
      description: subreddit.data.public_description,
      subscribers: subreddit.data.subscribers,
      url: subreddit.data.url,
      icon: subreddit.data.icon_img
    }));
  } catch (error) {
    console.error('Error fetching subreddits:', error);
    throw error;
  }
};

/**
 * Fetches comments for a specific post
 * @param {string} permalink - The post's permalink
 * @returns {Promise<Array<Object>>} Array of comment objects
 * @throws {Error} If the fetch fails or response is invalid
 */
export const getPostComments = async (permalink) => {
  try {
    if (!permalink) {
      throw new Error('Permalink parameter is required');
    }

    const response = await fetch(`${API_ROOT}${permalink}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    
    if (!Array.isArray(json) || !json[1]?.data?.children) {
      throw new Error('Invalid API response format');
    }

    return json[1].data.children.map((comment) => ({
      id: comment.data.id,
      author: comment.data.author,
      body: comment.data.body,
      created: comment.data.created_utc,
      score: comment.data.score,
      replies: comment.data.replies ? processReplies(comment.data.replies) : []
    }));
  } catch (error) {
    console.error('Error fetching post comments:', error);
    throw error;
  }
};

/**
 * Helper function to process nested comment replies
 * @param {Object} replies - The replies object from Reddit API
 * @returns {Array<Object>} Array of processed reply objects
 */
const processReplies = (replies) => {
  if (!replies.data?.children) {
    return [];
  }

  return replies.data.children
    .filter(reply => reply.kind !== 'more')
    .map(reply => ({
      id: reply.data.id,
      author: reply.data.author,
      body: reply.data.body,
      created: reply.data.created_utc,
      score: reply.data.score,
      replies: reply.data.replies ? processReplies(reply.data.replies) : []
    }));
};