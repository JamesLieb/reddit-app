/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchRedditPopular } from "./popularThunks";
import axios from 'axios';
import { getImageUrl } from '../../helper/isImage';

// Mock axios
vi.mock('axios');

// Mock the helper function
vi.mock('../../helper/isImage', () => ({
  getImageUrl: vi.fn()
}));

describe('fetchRedditPopular thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(fetchRedditPopular).toBeDefined();
  });

  it('should create the correct action type', () => {
    expect(fetchRedditPopular.typePrefix).toBe('reddit/fetchRedditPopular');
  });

  it('should handle successful API call and return formatted posts', async () => {
    const mockApiResponse = {
      data: {
        data: {
          children: [
            {
              data: {
                id: '1',
                title: 'Post 1',
                subreddit: 'sub1',
                permalink: '/r/sub1/post1',
                author: 'author1',
                media: null
              }
            },
            {
              data: {
                id: '2',
                title: 'Post 2',
                subreddit: 'sub2',
                permalink: '/r/sub2/post2',
                author: 'author2',
                media: {
                  reddit_video: {
                    fallback_url: 'https://video.url'
                  }
                }
              }
            }
          ]
        }
      }
    };

    const expectedPosts = [
      {
        id: '1',
        title: 'Post 1',
        subreddit: 'sub1',
        url: 'mocked-image-url-1',
        media: null,
        permalink: '/r/sub1/post1',
        author: 'author1'
      },
      {
        id: '2',
        title: 'Post 2',
        subreddit: 'sub2',
        url: 'mocked-image-url-2',
        media: 'https://video.url',
        permalink: '/r/sub2/post2',
        author: 'author2'
      }
    ];

    axios.get.mockResolvedValue(mockApiResponse);
    getImageUrl
      .mockReturnValueOnce('mocked-image-url-1')
      .mockReturnValueOnce('mocked-image-url-2');

    const dispatch = vi.fn();
    const getState = vi.fn();
    
    const result = await fetchRedditPopular()(dispatch, getState, undefined);

    expect(axios.get).toHaveBeenCalledWith('/reddit-api/r/popular.json', {
      params: { limit: 25 }
    });
    expect(result.type).toBe('reddit/fetchRedditPopular/fulfilled');
    expect(result.payload).toEqual(expectedPosts);
  });

  it('should handle API errors correctly', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue({
      response: {
        data: {
          message: errorMessage
        }
      }
    });

    const dispatch = vi.fn();
    const getState = vi.fn();
    
    const result = await fetchRedditPopular()(dispatch, getState, undefined);

    expect(result.type).toBe('reddit/fetchRedditPopular/rejected');
    expect(result.payload).toBe(errorMessage);
  });

  it('should handle errors without response data', async () => {
    const errorMessage = 'Network failure';
    axios.get.mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const getState = vi.fn();
    
    const result = await fetchRedditPopular()(dispatch, getState, undefined);

    expect(result.type).toBe('reddit/fetchRedditPopular/rejected');
    expect(result.payload).toBe(errorMessage);
  });

  it('should call getImageUrl for each post', async () => {
    const mockApiResponse = {
      data: {
        data: {
          children: [
            { data: { id: '1', title: 'Post 1', subreddit: 'sub1', permalink: '/r/sub1/post1', author: 'author1' } }
          ]
        }
      }
    };

    axios.get.mockResolvedValue(mockApiResponse);
    getImageUrl.mockReturnValue('image-url');

    const dispatch = vi.fn();
    const getState = vi.fn();
    
    await fetchRedditPopular()(dispatch, getState, undefined);

    expect(getImageUrl).toHaveBeenCalledTimes(1);
    expect(getImageUrl).toHaveBeenCalledWith(mockApiResponse.data.data.children[0]);
  });

  it('should handle posts with reddit video media', async () => {
    const mockApiResponse = {
      data: {
        data: {
          children: [
            {
              data: {
                id: '1',
                title: 'Video Post',
                subreddit: 'videos',
                permalink: '/r/videos/post1',
                author: 'videoauthor',
                media: {
                  reddit_video: {
                    fallback_url: 'https://v.redd.it/video123'
                  }
                }
              }
            }
          ]
        }
      }
    };

    axios.get.mockResolvedValue(mockApiResponse);
    getImageUrl.mockReturnValue('image-url');

    const dispatch = vi.fn();
    const getState = vi.fn();
    
    const result = await fetchRedditPopular()(dispatch, getState, undefined);

    expect(result.payload[0].media).toBe('https://v.redd.it/video123');
  });
});