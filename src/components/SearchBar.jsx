import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRedditSearch } from './../store/thunks/searchThunks';
import { clearResults } from './../store/slices/subbredditsSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.subreddits);
  
  const [searchTerm, setSearchTerm] = useState('');

 
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchRedditSearch(searchTerm));
    }
  };

  const onClickPopular = () => {
    dispatch(fetchRedditSearch('popular'));
  };

  return (
    <div className='mx-auto p-20px my-0 flex-col items-center justify-center' style={{ maxWidth: '800px' }}>
      <form onSubmit={handleSearch} className='mb-30px flex items-center justify-between'>
        <div>
          <input
          type="text"
          placeholder="Search Reddit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-20px w-300px mr-10px border border-gray-300 rounded-4px text-center'
        />
        <button type="submit" disabled={loading} className='p-10px-20px ml-10px border border-blue-500 bg-blue-500 text-white rounded-4px'>
          {loading ? 'Searching...' : 'Search'}
        </button>
        </div>

        <div>
          <button type='submit' disabled={loading} className='p-10px-20px ml-10px border border-blue-500 bg-blue-500 text-white rounded-4px' onClick={onClickPopular}>
          {loading ? 'Searching...' : 'Popular Posts'}
          </button>
        </div>
        
        <button 
          type="button" 
          onClick={() => dispatch(clearResults())}
          className='p-20px w-100px ml-30px border border-red-500 bg-red-500 text-white rounded-4px'
        >
          Clear
        </button>
      </form>

      {error && (
        <div className='text-red-500 mb-20px'>
          Error: {error}
        </div>
      )}

      <div className='grid gap-20px'>
        {posts.map((post) => (
          <div 
            key={post.id} 
            className='border border-gray-300 rounded-8px p-15px bg-f9f9f9'
          >
            

            <h3 className='my-10px'>{post.title}</h3>

            {post.url && post.url !== 'self' && post.url !== 'default' && (
              <img 
                src={post.url} 
                alt="Post media"
                className='max-w-400px max-h-400px rounded-4px mb-10px'
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}

            {post.media ? (
              <div className='relative max-w-300px rounded-4px mb-10px'>
                <video className='w-full rounded-4px'>
                  <source src={post.media} type="video/mp4" />
                </video>
                <a 
                  href={`https://reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg hover:bg-opacity-60'
                >
                  ▶ Watch with audio on Reddit
                </a>
              </div>
            ) : null}

            <div className='text-gray-600 text-sm'>
              <p>By u/{post.author}</p>
              <a 
                href={`https://reddit.com${post.permalink}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className='text-blue-500'
              >
                View on Reddit →
              </a>
            </div>
          </div>
        ))}
      </div>

      {!loading && posts.length === 0 && searchTerm && (
        <p className='text-center text-gray-600'>
          No results found. Try a different search term.
        </p>
      )}
    </div>
  );
}
