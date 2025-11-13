import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRedditSearch } from './../store/thunks/searchThunks';
import { fetchRedditPopular } from './../store/thunks/popularThunks';
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
    dispatch(fetchRedditPopular());
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              className='w-full px-5 py-3 pr-12 border-2 border-gray-300 rounded-full focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-200 shadow-sm'
            />
            <svg className='absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-3'>
            <button 
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className='group relative px-8 py-3.5 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden'
            >
              <span className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></span>
              <span className='relative flex items-center gap-2'>
                {loading ? (
                  <>
                    <svg className='animate-spin h-5 w-5' fill="none" viewBox="0 0 24 24">
                      <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </>
                )}
              </span>
            </button>

            <button 
              type='button'
              disabled={loading} 
              onClick={onClickPopular}
              className='group relative px-8 py-3.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:via-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden'
            >
              <span className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></span>
              <span className='relative flex items-center gap-2'>
                {loading ? (
                  'Loading...'
                ) : (
                  <>
                    <svg className='w-5 h-5' fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    Popular
                  </>
                )}
              </span>
            </button>
            
            <button 
              type="button" 
              onClick={() => dispatch(clearResults())}
              className='group relative px-8 py-3.5 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white font-bold rounded-xl hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-400 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 overflow-hidden'
            >
              <span className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></span>
              <span className='relative flex items-center gap-2'>
                <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </span>
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