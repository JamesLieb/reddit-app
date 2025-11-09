
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching search results and all subreddit headers
export const fetchRedditSearch = createAsyncThunk(
  'reddit/fetchRedditSearch',
  async (searchTerm, { rejectWithValue }) => {
    try {
      // First, get search results from all of Reddit
      const searchResponse = await axios.get('/reddit-api/search.json', {
        params: {
          q: searchTerm,
          limit: 25
        }
      });

      const posts = searchResponse.data.data.children;
      console.log('Search posts:', posts);

      // Extract post data we need
      const postsData = posts.map(post => ({
        id: post.data.id,
        title: post.data.title,
        subreddit: post.data.subreddit,
        url: post.data.url || post.data.thumbnail,
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
