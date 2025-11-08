import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { firstName, lastName, photoUrl, age, gender, about, skills, emailId, isPremium } = user;

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div className="card bg-base-100 shadow-2xl mb-8">
          <div className="card-body">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                  <img src={photoUrl} alt={`${firstName} ${lastName}`} />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-base-content">
                    {firstName} {lastName}
                  </h1>
                  {isPremium && (
                    <div className="badge badge-warning gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Premium
                    </div>
                  )}
                </div>
                {(age || gender) && (
                  <p className="text-lg text-base-content/70 mb-2">
                    {age && `${age} years old`}
                    {age && gender && " • "}
                    {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </p>
                )}
                <p className="text-base-content/60">{emailId}</p>
              </div>
              <button
                className="btn btn-primary gap-2"
                onClick={() => setShowEditModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">About</h2>
                <p className="text-base-content/80 leading-relaxed">
                  {about || "No about information available."}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div key={index} className="badge badge-outline badge-lg p-3">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Connection Requests Section */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-4">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">
                  Connection Requests
                  {requests && requests.length > 0 && (
                    <div className="badge badge-primary badge-lg">
                      {requests.length}
                    </div>
                  )}
                </h2>
                {!requests || requests.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-base-content/30 mb-4"
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
                    <p className="text-base-content/60">No pending requests</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {requests.map((request) => {
                      const {
                        _id,
                        firstName,
                        lastName,
                        photoUrl,
                        age,
                        gender,
                        about,
                      } = request.fromUserId;

                      return (
                        <div
                          key={request._id}
                          className="card bg-base-200 shadow-md"
                        >
                          <div className="card-body p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="avatar">
                                <div className="w-12 rounded-full">
                                  <img src={photoUrl} alt={`${firstName} ${lastName}`} />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base truncate">
                                  {firstName} {lastName}
                                </h3>
                                {(age || gender) && (
                                  <p className="text-sm text-base-content/60">
                                    {age && `${age} years`}
                                    {age && gender && " • "}
                                    {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
                                  </p>
                                )}
                              </div>
                            </div>
                            {about && (
                              <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
                                {about}
                              </p>
                            )}
                            <div className="flex gap-2">
                              <button
                                className="btn btn-sm btn-error flex-1"
                                onClick={() => reviewRequest("rejected", request._id)}
                              >
                                Reject
                              </button>
                              <button
                                className="btn btn-sm btn-success flex-1"
                                onClick={() => reviewRequest("accepted", request._id)}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-2xl">Edit Profile</h3>
              <button
                className="btn btn-sm btn-circle"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            <EditProfile user={user} onClose={() => setShowEditModal(false)} />
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowEditModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Profile;
