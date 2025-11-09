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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  const { firstName, lastName, photoUrl, age, gender, about, skills, emailId, isPremium } = user;

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-lg mb-4 sm:mb-8 overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-white overflow-hidden">
                  <img 
                    src={photoUrl} 
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left w-full min-w-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 truncate w-full">
                    {firstName} {lastName}
                  </h1>
                  {isPremium && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-semibold whitespace-nowrap">
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
                  <p className="text-sm sm:text-base text-gray-600 mb-1">
                    {age && `${age} years old`}
                    {age && gender && " • "}
                    {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-gray-500 break-all">{emailId}</p>
              </div>
              <button
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg font-semibold text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                onClick={() => setShowEditModal(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About</h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {about || "No about information available."}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            {skills && skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Connection Requests Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden lg:sticky lg:top-4">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Connection Requests
                  </h2>
                  {requests && requests.length > 0 && (
                    <span className="px-2.5 py-1 rounded-full bg-blue-500 text-white text-xs sm:text-sm font-semibold">
                      {requests.length}
                    </span>
                  )}
                </div>
                {!requests || requests.length === 0 ? (
                  <div className="text-center py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-300 mb-4"
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
                    <p className="text-sm text-gray-500">No pending requests</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
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
                          className="bg-gray-50 rounded-lg shadow-sm overflow-hidden"
                        >
                          <div className="p-3 sm:p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50">
                                  <img 
                                    src={photoUrl} 
                                    alt={`${firstName} ${lastName}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                                  {firstName} {lastName}
                                </h3>
                                {(age || gender) && (
                                  <p className="text-xs sm:text-sm text-gray-500">
                                    {age && `${age} years`}
                                    {age && gender && " • "}
                                    {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
                                  </p>
                                )}
                              </div>
                            </div>
                            {about && (
                              <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                                {about}
                              </p>
                            )}
                            <div className="flex gap-2">
                              <button
                                className="flex-1 px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm text-white bg-red-500 hover:bg-red-600 transition-colors"
                                onClick={() => reviewRequest("rejected", request._id)}
                              >
                                Reject
                              </button>
                              <button
                                className="flex-1 px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm text-white bg-green-500 hover:bg-green-600 transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-xl sm:text-2xl text-gray-900">Edit Profile</h3>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                onClick={() => setShowEditModal(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <EditProfile user={user} onClose={() => setShowEditModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
