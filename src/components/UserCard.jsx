import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      setIsProcessing(true);
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl w-full max-w-md overflow-hidden">
      {/* Profile Image */}
      <figure className="relative h-80 overflow-hidden">
        <img 
          src={photoUrl} 
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-3xl font-bold mb-1">{firstName} {lastName}</h2>
          {(age || gender) && (
            <p className="text-white/90 text-sm">
              {age && `${age} years old`}
              {age && gender && " • "}
              {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          )}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-6">
        {/* About Section */}
        {about && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-base-content/70 mb-2">About</h3>
            <p className="text-base-content/80 leading-relaxed">{about}</p>
          </div>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-base-content/70 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="badge badge-outline badge-lg">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-center gap-3 mt-4">
          <button
            className="btn btn-outline btn-error flex-1 gap-2"
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Pass
              </>
            )}
          </button>
          <button
            className="btn btn-primary flex-1 gap-2"
            onClick={() => handleSendRequest("interested", _id)}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                Connect
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
