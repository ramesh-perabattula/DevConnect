// UserCard.js
import React from 'react'
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-100 w-80 max-h-[80vh] shadow-md rounded-2xl overflow-hidden">
      {/* image */}
      <figure className="h-48 overflow-hidden">
        <img
          src={photoUrl}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* body */}
      <div className="card-body overflow-y-auto p-4">
        <h2 className="card-title text-lg font-semibold">
          {firstName} {lastName}
        </h2>
        {gender && age && (
          <p className="text-sm text-gray-600">Gender: {gender} | Age: {age}</p>
        )}
        {about && <p className="text-sm text-gray-700">{about}</p>}
        {skills && (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Skills:</span> {skills}
          </p>
        )}

        {/* actions */}
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
