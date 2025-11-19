import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getImageUrl } from '../../helper/IsImage';
// Helper function to check if URL is a direct image


export const fetchRedditSearch = createAsyncThunk(
  'reddit/fetchRedditSearch',
  async (searchTerm, { rejectWithValue }) => {
    try {
      const searchResponse = await axios.get('/reddit-api/search.json', {
        params: {
          q: searchTerm,
          limit: 25
        }
      });

      const posts = searchResponse.data.data.children;
      console.log('Search posts:', posts);

      const postsData = posts.map(post => ({
        id: post.data.id,
        title: post.data.title,
        subreddit: post.data.subreddit,
        url: getImageUrl(post), // Use helper function
        media: post.data.media?.reddit_video?.fallback_url || null,
        permalink: post.data.permalink,
        author: post.data.author
      }));
      
      return postsData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);