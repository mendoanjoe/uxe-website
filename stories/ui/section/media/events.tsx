import { getEvents, getNews } from 'lib/api';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatToReadableDate } from 'utils/dateformatter';
import { TitleMedium } from '@/ui/title/title-medium/TitleMedium';
import { TextSmall } from '@/ui/text/text-small/TextSmall';
import { TextLarge } from '@/ui/text/text-large/TextLarge';
import { TitleSmall } from '@/ui/title/title-small/TitleSmall';
import { TextMedium } from '@/ui/text/text-medium/TextMedium';



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
    <div className="max-w-[1440px] mx-auto flex flex-col gap-10 min-h-screen">
      <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-8 max-md:gap-6 max-sm:gap-4">
        <div className="flex justify-between items-end mb-6 max-md:flex-col max-md:items-start max-md:gap-4 max-md:mb-0">
          <div className='space-y-3 max-md:space-y-2'>
            <TitleMedium label='Event' el='h2'/>
            <TextLarge label='Explore the latest event updates from the UXE team' cls='opacity-50'/>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border boder-[#19191B3D] px-4 py-2.5 rounded-full text-sm font-medium text-[#19191B] focus:outline-none placeholder:text-[#19191B] min-w-72 max-sm:w-full"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Simpan input pengguna
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.9996 13.9996L11.0996 11.0996" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </p>
                <p className="hidden">Search</p>
              </button>
            </form>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="border boder-[#19191B3D] px-4 py-2.5 rounded-full text-sm font-medium text-[#19191B] focus:outline-none placeholder:text-[#19191B] flex items-center gap-2.5"
              >
                <span>{selectedCategory}</span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12.5 5.75L8 10.25L3.5 5.75" stroke="#19191B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="square"/>
                  </svg>
                </span>
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
          <div className="space-y-5">
            {events.map((post, index) => (
              <div key={index} className="flex flex-col gap-6 max-md:gap-4 md:flex-row bg-[#F7F7F7] p-6 max-md:p-4 rounded-xl overflow-hidden">
                {/* Thumbnail Image */}
                <div className="w-full md:w-1/3">
                  <div className="relative w-full h-full min-h-44 rounded-xl overflow-hidden">
                    <Image
                      src={post.featuredImage?.node?.sourceUrl
                        ? `https://api.uxe.ai${post.featuredImage.node.sourceUrl}`
                        : '/images/placeholder.jpg'}
                      alt="Event thumbnail"
                      fill={true}
                      style={{objectFit: "cover"}}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  </div>
                </div>

                <div className='flex justify-between w-full'>
                  {/* Headline */}
                  <div className='flex-1 flex flex-col justify-between max-w-md py-5 max-md:py-0 max-md:gap-2'>
                    <TitleSmall label={post.title} el='a' href={"/event/" + post.slug} cls='line-clamp-2' />
                    <div>
                      <TextMedium label={formatToReadableDate(post?.eventDate)} cls='text-[#3F3F3F]' />
                      <TextMedium label={post?.eventLocation} cls='text-[#3F3F3F]' />
                    </div>
                  </div>

                  {/* Read Post Button */}
                  <a href={"/event/" + post.slug} className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] font-medium leading-[132%] -tracking-[.16px] mt-auto flex gap-1">
                    Read post
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                        <path d="M5.8335 14.6673L14.1668 6.33398M14.1668 6.33398H5.8335M14.1668 6.33398V14.6673" stroke="#19191B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            ))}

          </div>
        )}

        {hasPreviousPage || hasNextPage && (
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
        )}
      </div>
    </div>
  );
};

export default NewsList;
