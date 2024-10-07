// components/MediaPressRelease.tsx
import { TextLarge } from "@/ui/text/text-large/TextLarge";
import { TextMedium } from "@/ui/text/text-medium/TextMedium";
import { TitleMedium } from "@/ui/title/title-medium/TitleMedium";
import { TitleSmall } from "@/ui/title/title-small/TitleSmall";
import { getPressReleases } from "lib/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  formatDateWithRelativeTime,
  formatToReadableDate,
} from "utils/dateformatter";

const MediaPressRelease = () => {
  // Correct typing for useState
  const [pressReleases, setPressReleases] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    "All Media & Press Release"
  );
  const [selectedDate, setSelectedDate] = useState("Date");

  const categories = [
    "All Media & Press Release",
    "Aviation",
    "Awards",
    "Technology",
    "Business",
  ];

  const fetchMoreEvents = async () => {
    setLoading(true);
    const data = await getPressReleases("DESC");
    setPressReleases(data.edges);
    if (searchTerm != null && searchTerm != "") {
      setPressReleases(
        pressReleases.filter((item) => item.title.includes(searchTerm))
      );
    }

    if (
      selectedCategory != null &&
      selectedCategory != "All Media & Press Release" &&
      selectedCategory != ""
    ) {
      setPressReleases(
        pressReleases.filter((item) => item.category == selectedCategory)
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMoreEvents();
  }, []);

  useEffect(() => {
    setSearchTerm(searchInput);
    fetchMoreEvents();
  }, [searchInput]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    fetchMoreEvents();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDateDropdown = () => {
    setIsDateDropdownOpen(!isDateDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);

    if (category !== "All Media & Press Release") {
      fetchMoreEvents();
    } else {
      fetchMoreEvents();
    }
  };

  // Conditional rendering for loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
      <div className="p-[max(32px,_min(calc(100vw_*_(80_/_1440)),_80px))_max(20px,_min(calc(100vw_*_(178_/_1440)),_178px))] max-xl:px-[max(20px,_min(calc(100vw_*_(70_/_1440)),_70px))] flex flex-col gap-8 max-md:gap-6 max-sm:gap-4">
        <div className="flex flex-col gap-8">
          <div className="space-y-3 max-md:space-y-2">
            <TitleMedium label="Media & Press Release" el="h2" />
            <TextLarge
              label="Explore the latest media and press updates from the UXE team"
              cls="opacity-50 max-w-xl"
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border boder-[#19191B3D] px-4 py-2.5 rounded-full text-sm font-medium text-[#19191B] focus:outline-none placeholder:text-[#19191B] min-w-72"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Simpan input pengguna
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                      stroke="black"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.9996 13.9996L11.0996 11.0996"
                      stroke="black"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
                <p className="hidden">Search</p>
              </button>
            </form>

            <div className="flex items-center space-x-3">
              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDateDropdown}
                  className="border boder-[#19191B3D] px-4 py-2.5 rounded-full text-sm font-medium text-[#19191B] focus:outline-none placeholder:text-[#19191B] flex items-center gap-2.5"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12.6667 2.66602H3.33333C2.59695 2.66602 2 3.26297 2 3.99935V13.3327C2 14.0691 2.59695 14.666 3.33333 14.666H12.6667C13.403 14.666 14 14.0691 14 13.3327V3.99935C14 3.26297 13.403 2.66602 12.6667 2.66602Z"
                        stroke="black"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.6665 1.33398V4.00065"
                        stroke="black"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.3335 1.33398V4.00065"
                        stroke="black"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2 6.66602H14"
                        stroke="black"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{selectedDate}</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12.5 5.75L8 10.25L3.5 5.75"
                        stroke="#19191B"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      />
                    </svg>
                  </span>
                </button>

                {/* Dropdown content */}
                {isDateDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    {categories.map((category) => (
                      <div
                        key={category}
                        onClick={() => setSelectedDate(category)}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="border boder-[#19191B3D] px-4 py-2.5 rounded-full text-sm font-medium text-[#19191B] focus:outline-none placeholder:text-[#19191B] flex items-center gap-2.5"
                >
                  <span>{selectedCategory}</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12.5 5.75L8 10.25L3.5 5.75"
                        stroke="#19191B"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      />
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
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-5">
            {pressReleases.map((post, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 max-md:gap-4 md:flex-row bg-[#F7F7F7] p-6 max-md:p-4 rounded-xl overflow-hidden"
              >
                {/* Thumbnail Image */}
                <div className="w-full md:w-1/3">
                  <div className="relative w-full h-full min-h-44 rounded-xl overflow-hidden">
                    <img
                      src={
                        post.image_url
                          ? post.image_url
                          : "/images/placeholder.jpg"
                      }
                      alt="Event thumbnail"
                      className="w-full h-full"
                      // layout="fill"
                      // objectFit="cover"
                      // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  </div>
                </div>

                <div className="flex justify-between w-full">
                  {/* Headline */}
                  <div className="flex-1 flex flex-col justify-between max-w-md py-5 max-md:py-0 max-md:gap-2">
                    <TextMedium
                      label={formatDateWithRelativeTime(new Date(post.date))}
                      cls="text-[#3F3F3F]"
                    />
                    <TitleSmall
                      label={post.title}
                      el="a"
                      href={post.url}
                      cls="line-clamp-2 underline hover:text-[#365EFF]"
                    />
                    <TextMedium label="By Wesley Luiten" cls="text-[#3F3F3F]" />
                  </div>

                  {/* Read Post Button */}
                  <div className="flex items-center">
                    <TextLarge
                      label={post.description.replaceAll("\n", "") + ""}
                      cls="line-clamp-3"
                    />
                  </div>

                  {/* <a
                    href={post.url}
                    className="text-[max(14px,_min(calc(100vw_*_(16_/_1440)),_16px))] font-medium leading-[132%] -tracking-[.16px] mt-auto flex gap-1"
                  >
                    Read post
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M5.8335 14.6673L14.1668 6.33398M14.1668 6.33398H5.8335M14.1668 6.33398V14.6673"
                          stroke="#19191B"
                          stroke-width="1.67"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </a> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    // <div className="container mx-auto px-4 py-8">
    //   <h2 className="text-3xl font-semibold mb-4">Media & Press Release</h2>
    //   <p className="text-lg text-gray-500 mb-6">
    //     Explore the latest media and press updates from the UXE team
    //   </p>

    //   {/* Search and Filter Options */}
    //   <div className="flex justify-between items-center mb-6">
    //     <input
    //       type="text"
    //       placeholder="Search"
    //       className="border rounded-md py-2 px-4 w-1/3"
    //     />
    //     <div className="flex space-x-4">
    //       <button className="border py-2 px-4 rounded-md">Date</button>
    //       <button className="border py-2 px-4 rounded-md">
    //         All Media & Press Release
    //       </button>
    //     </div>
    //   </div>

    //   {/* Article List */}
    //   <div className="grid grid-cols-1 gap-6">
    //     {pressReleases.map((article, index) => (
    //       <div
    //         key={index}
    //         className="bg-[#F7F7F7] shadow-md rounded-lg overflow-hidden grid grid-cols-3 gap-6"
    //       >
    //         {/* Column 1: Image */}
    //         <div
    //           className="col-span-1 relative"
    //           style={{ width: "300px", height: "200px" }}
    //         >
    //           <img
    //             src={article.image_url}
    //             alt={article.title}
    //             // layout="fill" // Ensures the image fills the container
    //             // objectFit="cover" // Ensures the image maintains aspect ratio and covers the container
    //           />
    //         </div>
    //         {/* Column 2: Date, Title, Author */}
    //         <div className="col-span-1 flex flex-col justify-between p-6">
    //           {/* Top: Date */}
    //           <p className="text-sm text-gray-500">{article.created_at}</p>
    //           {/* Middle: Title */}
    //           <a
    //             href="#"
    //             className="text-xl font-semibold text-blue-600 hover:underline"
    //           >
    //             {article.title}
    //           </a>
    //           {/* Bottom: Author */}
    //           <p className="text-sm text-gray-500">
    //             By <span className="font-semibold">{article.added_by}</span>
    //           </p>
    //         </div>
    //         {/* Column 3: Description */}
    //         <div className="col-span-1 flex items-center justify-center p-6">
    //           <p className="text-gray-700">{article.description}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default MediaPressRelease;
