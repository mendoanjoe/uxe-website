// components/MediaPressRelease.tsx
import { getPressReleases } from 'lib/api';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const MediaPressRelease = () => {
    // Correct typing for useState
    const [pressReleases, setPressReleases] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // useEffect to fetch press releases
    useEffect(() => {
        async function fetchPressReleases() {
            try {
                const pressReleases = await getPressReleases("DESC", '', 10, ''); // Adjust the parameters as needed
                setPressReleases(pressReleases.edges);
                setLoading(false); // Set loading to false after fetching is done
            } catch (err) {
                setError(err as Error); // Set the error if something goes wrong
                setLoading(false); // Ensure loading is false in case of an error
            }
        }
        fetchPressReleases(); // Call the async function
    }, []); // Empty dependency array to call this effect on mount

    // Conditional rendering for loading and error states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold mb-4">Media & Press Release</h2>
            <p className="text-lg text-gray-500 mb-6">
                Explore the latest media and press updates from the UXE team
            </p>

            {/* Search and Filter Options */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-md py-2 px-4 w-1/3"
                />
                <div className="flex space-x-4">
                    <button className="border py-2 px-4 rounded-md">Date</button>
                    <button className="border py-2 px-4 rounded-md">
                        All Media & Press Release
                    </button>
                </div>
            </div>

            {/* Article List */}
            <div className="grid grid-cols-1 gap-6">
                {pressReleases.map((article, index) => (
                    <div
                        key={index}
                        className="bg-[#F7F7F7] shadow-md rounded-lg overflow-hidden grid grid-cols-3 gap-6"

                    >
                        {/* Column 1: Image */}
                        <div className="col-span-1 relative" style={{ width: '300px', height: '200px' }}>
                            <img
                                src={article.image_url}
                                alt={article.title}
                                // layout="fill" // Ensures the image fills the container
                                // objectFit="cover" // Ensures the image maintains aspect ratio and covers the container
                            />
                        </div>
                        {/* Column 2: Date, Title, Author */}
                        <div className="col-span-1 flex flex-col justify-between p-6">
                            {/* Top: Date */}
                            <p className="text-sm text-gray-500">
                                {article.created_at}
                            </p>
                            {/* Middle: Title */}
                            <a href="#" className="text-xl font-semibold text-blue-600 hover:underline">
                                {article.title}
                            </a>
                            {/* Bottom: Author */}
                            <p className="text-sm text-gray-500">
                                By <span className="font-semibold">{article.added_by}</span>
                            </p>
                        </div>
                        {/* Column 3: Description */}
                        <div className="col-span-1 flex items-center justify-center p-6">
                            <p className="text-gray-700">{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default MediaPressRelease;

