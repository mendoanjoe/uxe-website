import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export const PressReleaseCard = ({ event }) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md p-6 mb-6 hover:bg-gray-50 transition duration-200">
      <div className="w-1/4">
        <img
          src={event.image_url}
          alt={event.title}
          width={300}
          height={200}
          className="rounded-md object-cover"
        />
      </div>
      
      <div className="flex-1 ml-6 flex flex-col justify-between">
        {/* <p className="text-sm text-gray-500 mt-1">
          {event.date} ({formatDistanceToNow(new Date(event.date))} ago)
        </p> */}
        <Link href={event.url} passHref>
          <p
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {event.title}
          </p>
        </Link>
        <div className="flex items-center mt-2">
          <img
            src={event.authorImage}
            alt={event.author}
            width={24}
            height={24}
            className="rounded-full"
          />
          <p className="ml-2 text-sm text-gray-500">By {event.author}</p>
        </div>
       
      </div>

      <div className="w-1/3 ml-6 flex justify-center items-center">
        <p className="text-sm body3-regular ">
          {event.description}
        </p>
      </div>
    </div>
  );
};