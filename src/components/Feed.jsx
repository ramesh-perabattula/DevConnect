import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update index when feed changes (user removed)
  useEffect(() => {
    if (feed && feed.length > 0 && currentIndex >= feed.length) {
      setCurrentIndex(Math.max(0, feed.length - 1));
    }
  }, [feed, currentIndex]);

  const getFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-base-content/30 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold mb-2">No More Users</h2>
              <p className="text-base-content/60">
                You've seen all available developers. Check back later for new connections!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentUser = feed[currentIndex];
  const remainingCount = feed.length - currentIndex - 1;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Discover Developers</h1>
          {remainingCount > 0 && (
            <p className="text-base-content/70">
              {remainingCount} {remainingCount === 1 ? "developer" : "developers"} remaining
            </p>
          )}
        </div>

        {/* User Card */}
        <div className="flex justify-center">
          <UserCard user={currentUser} />
        </div>

        {/* Navigation Dots */}
        {feed.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {feed.slice(0, Math.min(feed.length, 10)).map((_, index) => (
              <button
                key={index}
                className={`btn btn-sm btn-circle ${
                  index === currentIndex ? "btn-primary" : "btn-ghost"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </button>
            ))}
            {feed.length > 10 && (
              <span className="flex items-center px-2 text-base-content/60">
                +{feed.length - 10}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Feed;
