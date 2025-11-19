/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi} from "vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import subredditsReducer, { clearResults } from './subbredditsSlice.js';
import { fetchRedditSearch } from '../thunks/searchThunks';
import { fetchRedditPopular } from '../thunks/popularThunks';

// Mock Redux hooks
vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn(),
    useSelector: () => ({
        posts: [],
        loading: false,
        error: null
    })
}));

// Mock the thunks
vi.mock('./../store/thunks/searchThunks', () => ({
    fetchRedditSearch: vi.fn()
}));

vi.mock('./../store/thunks/popularThunks', () => ({
    fetchRedditPopular: vi.fn()
}));

vi.mock('./../store/slices/subbredditsSlice', () => ({
    clearResults: vi.fn()
}));


describe('subredditsSlice', () => {
  const initialState = {
    posts: [],
    loading: false,
    error: null,
    searchTerm: ''
  };

  describe('initial state', () => {
    it('should return the initial state when passed undefined', () => {
      const result = subredditsReducer(undefined, { type: 'unknown' });
      expect(result).toEqual(initialState);
    });
  });

  describe('clearResults reducer', () => {
    it('should clear posts, error, and searchTerm', () => {
      const stateWithData = {
        posts: [{ id: 1, title: 'Test Post' }],
        loading: false,
        error: 'Some error',
        searchTerm: 'test'
      };

      const result = subredditsReducer(stateWithData, clearResults());
      
      expect(result.posts).toEqual([]);
      expect(result.error).toBeNull();
      expect(result.searchTerm).toBe('');
      expect(result.loading).toBe(false);
    });
  });

  describe('fetchRedditSearch async thunk', () => {
    it('should set loading to true when fetchRedditSearch is pending', () => {
      const action = { type: fetchRedditSearch.pending.type };
      const result = subredditsReducer(initialState, action);
      
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set posts and loading to false when fetchRedditSearch is fulfilled', () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', author: 'user1' },
        { id: 2, title: 'Post 2', author: 'user2' }
      ];
      
      const action = { 
        type: fetchRedditSearch.fulfilled.type, 
        payload: mockPosts 
      };
      
      const stateWithLoading = { ...initialState, loading: true };
      const result = subredditsReducer(stateWithLoading, action);
      
      expect(result.loading).toBe(false);
      expect(result.posts).toEqual(mockPosts);
      expect(result.error).toBeNull();
    });

    it('should set error and loading to false when fetchRedditSearch is rejected', () => {
      const errorMessage = 'Failed to fetch search results';
      const action = { 
        type: fetchRedditSearch.rejected.type, 
        payload: errorMessage 
      };
      
      const stateWithLoading = { ...initialState, loading: true };
      const result = subredditsReducer(stateWithLoading, action);
      
      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.posts).toEqual([]);
    });
  });

  describe('fetchRedditPopular async thunk', () => {
    it('should set loading to true when fetchRedditPopular is pending', () => {
      const action = { type: fetchRedditPopular.pending.type };
      const result = subredditsReducer(initialState, action);
      
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set posts and loading to false when fetchRedditPopular is fulfilled', () => {
      const mockPosts = [
        { id: 3, title: 'Popular Post 1', author: 'user3' },
        { id: 4, title: 'Popular Post 2', author: 'user4' }
      ];
      
      const action = { 
        type: fetchRedditPopular.fulfilled.type, 
        payload: mockPosts 
      };
      
      const stateWithLoading = { ...initialState, loading: true };
      const result = subredditsReducer(stateWithLoading, action);
      
      expect(result.loading).toBe(false);
      expect(result.posts).toEqual(mockPosts);
      expect(result.error).toBeNull();
    });

    it('should set error and loading to false when fetchRedditPopular is rejected', () => {
      const errorMessage = 'Failed to fetch popular posts';
      const action = { 
        type: fetchRedditPopular.rejected.type, 
        payload: errorMessage 
      };
      
      const stateWithLoading = { ...initialState, loading: true };
      const result = subredditsReducer(stateWithLoading, action);
      
      expect(result.loading).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(result.posts).toEqual([]);
    });
  });

  describe('state transitions', () => {
    it('should handle multiple state transitions correctly', () => {
      // Start with initial state
      let state = subredditsReducer(undefined, { type: 'unknown' });
      expect(state).toEqual(initialState);

      // Trigger search pending
      state = subredditsReducer(state, { type: fetchRedditSearch.pending.type });
      expect(state.loading).toBe(true);

      // Search fulfilled with results
      const mockPosts = [{ id: 1, title: 'Test' }];
      state = subredditsReducer(state, { 
        type: fetchRedditSearch.fulfilled.type, 
        payload: mockPosts 
      });
      expect(state.loading).toBe(false);
      expect(state.posts).toEqual(mockPosts);

      // Clear results
      state = subredditsReducer(state, clearResults());
      expect(state.posts).toEqual([]);
      expect(state.searchTerm).toBe('');
    });

    it('should replace existing posts when new search is fulfilled', () => {
      const oldPosts = [{ id: 1, title: 'Old Post' }];
      const newPosts = [{ id: 2, title: 'New Post' }];
      
      let state = { ...initialState, posts: oldPosts };
      
      state = subredditsReducer(state, { 
        type: fetchRedditSearch.fulfilled.type, 
        payload: newPosts 
      });
      
      expect(state.posts).toEqual(newPosts);
      expect(state.posts).not.toEqual(oldPosts);
    });
  });
});
