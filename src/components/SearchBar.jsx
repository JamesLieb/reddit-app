import { useState } from 'react';
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
    <div className='mx-auto px-4 max-w-5xl'>
      {/* Search Controls */}
      <div className='mb-8'>
        <div className='flex flex-wrap gap-3 items-center justify-center'>
          {/* Search Input */}
          <div className='relative flex-1 min-w-[250px] max-w-[400px]'>
            <input
              type="text"
              placeholder="Search Reddit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className='w-full px-5 py-3 pr-12 border-2 border-gray-300 rounded-full focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200 shadow-sm'
            />
            <svg className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2'>
            <button 
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className='px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            >
              {loading ? (
                <span className='flex items-center gap-2'>
                  <svg className='animate-spin h-4 w-4' fill="none" viewBox="0 0 24 24">
                    <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search'}
            </button>

            <button 
              type='button'
              disabled={loading} 
              onClick={onClickPopular}
              className='px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            >
              {loading ? 'Loading...' : '🔥 Popular'}
            </button>
            
            <button 
              type="button" 
              onClick={() => dispatch(clearResults())}
              className='px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className='mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg'>
          <div className='flex items-center gap-2'>
            <svg className='w-5 h-5 text-red-500' fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className='text-red-700 font-medium'>Error: {error}</span>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-1'>
        {posts.map((post) => (
          <div 
            key={post.id} 
            className='bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300'
          >
            <h3 className='text-xl font-bold text-gray-800 mb-4 hover:text-orange-600 transition-colors'>
              {post.title}
            </h3>

            {/* Image */}
            {post.url && post.url !== 'self' && post.url !== 'default' && (
              <img 
                src={post.url} 
                alt="Post media"
                className='w-full max-w-2xl h-auto rounded-xl mb-4 object-cover'
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}

            {/* Video with Overlay */}
            {post.media ? (
              <div className='relative max-w-2xl rounded-xl overflow-hidden mb-4 shadow-lg'>
                <video className='w-full rounded-xl'>
                  <source src={post.media} type="video/mp4" />
                </video>
                <a 
                  href={`https://reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 hover:bg-opacity-70 transition-all duration-200 group'
                >
                  <div className='bg-white rounded-full p-5 mb-3 group-hover:scale-110 transition-transform duration-200'>
                    <svg className='w-8 h-8 text-orange-500' fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                  </div>
                  <span className='text-white font-semibold text-lg'>Watch with audio on Reddit</span>
                </a>
              </div>
            ) : null}

            {/* Post Info */}
            <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
              <p className='text-sm text-gray-600'>
                By <span className='font-semibold text-orange-600'>u/{post.author}</span>
              </p>
              <a 
                href={`https://reddit.com${post.permalink}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className='inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors'
              >
                View on Reddit
                <svg className='w-4 h-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {!loading && posts.length === 0 && searchTerm && (
        <div className='text-center py-12'>
          <svg className='w-16 h-16 mx-auto text-gray-300 mb-4' fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className='text-gray-500 text-lg font-medium'>No results found</p>
          <p className='text-gray-400 text-sm mt-2'>Try a different search term</p>
        </div>
      )}
    </div>
  );
}