
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getImageUrl } from '../../helper/isImage';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/.netlify/functions/reddit-proxy'
  : '/reddit-api';

// Async thunk for fetching popular posts
export const fetchRedditPopular = createAsyncThunk(
  'reddit/fetchRedditPopular',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // First, get search results from all of Reddit
      const searchResponse = await axios.get(`${API_BASE_URL}/r/popular.json`, {
        params: {
          limit: 25,   
      }
        });

      const posts = searchResponse.data.data.children;
      console.log('Search posts:', posts);

      // Extract post data we need
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
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
