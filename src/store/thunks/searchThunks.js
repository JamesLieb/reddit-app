import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getImageUrl } from '../../helper/isImage';
// Helper function to check if URL is a direct image

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/.netlify/functions/reddit-proxy'
  : '/reddit-api';


export const fetchRedditSearch = createAsyncThunk(
  'reddit/fetchRedditSearch',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const searchResponse = await axios.get(API_BASE_URL, {
        params: {
          endpoint: 'search.json',
          q: searchTerm,
          limit: 25
        }
      });

      console.log('Full response:', searchResponse.data);
      
      // Check if response has expected structure
      if (!searchResponse.data || !searchResponse.data.data || !searchResponse.data.data.children) {
        console.error('Unexpected response structure:', searchResponse.data);
        throw new Error('Invalid response from Reddit API');
      }

      const posts = searchResponse.data.data.children;
      console.log('Search posts:', posts);

      const postsData = posts.map(post => ({
        id: post.data.id,
        title: post.data.title,
        subreddit: post.data.subreddit,
        url: getImageUrl(post),
        media: post.data.media?.reddit_video?.fallback_url || null,
        permalink: post.data.permalink,
        author: post.data.author
      }));
      
      return postsData;
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);