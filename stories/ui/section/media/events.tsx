import { getEvents, getNews } from 'lib/api';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatToReadableDate } from 'utils/dateformatter';
import { TitleMedium } from '@/ui/title/title-medium/TitleMedium';
import { TextSmall } from '@/ui/text/text-small/TextSmall';
import { TextLarge } from '@/ui/text/text-large/TextLarge';



const NewsList = () => {
  const [events, setEvents] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [endCursor, setEndCursor] = useState('');
  const [startCursor, setStartCursor] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All News');
  const categories = ['All News', 'Aviation', 'Awards', 'Technology', 'Business'];


  const fetchMoreEvents = async (direction = 'next', term = '', category = '') => {
    setLoading(true);

    const cursor = direction === 'next' ? endCursor : startCursor;
    const data = await getEvents(10, cursor, term, category); // Pass category to getNews function
    console.log(data);

    setEvents(data.edges.map(edge => edge.node));
    setHasNextPage(data.pageInfo.hasNextPage);
    setHasPreviousPage(data.pageInfo.hasPreviousPage);
    setEndCursor(data.pageInfo.endCursor);
    setStartCursor(data.pageInfo.startCursor);

    setLoading(false);
  };

  useEffect(() => {
    fetchMoreEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    fetchMoreEvents('next', searchInput, selectedCategory);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);


    if (category !== "All News") {
      fetchMoreEvents('next', searchTerm, category);
    } else {
      fetchMoreEvents('next', searchTerm);
    }
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className='space-y-3'>
          <TitleMedium label='Event'/>
          <TextLarge label='Explore the latest event updates from the UXE team' cls='opacity-50'/>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border px-4 py-2 rounded-full text-sm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)} // Simpan input pengguna
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </button>
          </form>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="border px-4 py-2 text-blue-600 bg-white rounded-full hover:bg-gray-100 flex items-center space-x-2"
            >
              <span>{selectedCategory}</span>
              <span>▼</span>
            </button>

            {/* Dropdown content */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => selectCategory(category)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-8">
          {events.map((post, index) => (
            <div key={index} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Thumbnail Image */}
              <div className="w-full md:w-1/3">
                <div className="relative w-full h-32 md:h-40 lg:h-48">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl
                      ? `https://api.uxe.ai${post.featuredImage.node.sourceUrl}`
                      : '/images/placeholder.jpg'}
                    alt="Event thumbnail"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg md:rounded-none"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                {/* Category */}

                <div className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-1 mb-2 inline-block border border-gray-300 max-w-max">
                  {post.tags && post.tags.edges.length > 0
                    ? post.tags.edges[0].node.name
                    : post.category || "Category"}
                </div>




                {/* Headline */}
                <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>

                {/* Bottom Section */}
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <p className="text-sm text-gray-600">{formatToReadableDate(post.date)}</p>
                    <p className="text-sm text-gray-600">Dubai Tower Internationale</p>
                  </div>

                  {/* Read Post Button */}
                  <a href="#" className="text-blue-500 hover:underline flex items-center space-x-2">
                    <span>Read post</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      <div className="flex justify-center mt-6">
        <nav className="inline-flex">
          {hasPreviousPage && (
            <button
              onClick={() => fetchMoreEvents('previous', searchTerm)}
              className="px-3 py-2 text-sm text-gray-500 border rounded-l-lg"
            >
              &larr; Previous
            </button>
          )}
          {hasNextPage && (
            <button
              onClick={() => fetchMoreEvents('next', searchTerm)}
              className="px-3 py-2 text-sm text-gray-500 border rounded-r-lg"
            >
              Next &rarr;
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NewsList;
