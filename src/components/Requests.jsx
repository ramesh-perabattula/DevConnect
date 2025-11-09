import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const reviewRequest = async (status, requestId) => {
    try {
      setProcessingId(requestId);
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Error reviewing request:", err);
      alert("Failed to process request. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Connection Requests</h1>
            <p className="text-base-content/70">Review and manage your connection requests</p>
          </div>
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold mb-2">No Pending Requests</h2>
              <p className="text-base-content/60">
                You're all caught up! New connection requests will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Connection Requests</h1>
          <p className="text-base-content/70">
            {requests.length} {requests.length === 1 ? "pending request" : "pending requests"}
          </p>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
              request.fromUserId;

            const isProcessing = processingId === request._id;

            return (
              <div
                key={request._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* User Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="avatar">
                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold mb-1">
                          {firstName} {lastName}
                        </h2>
                        {(age || gender) && (
                          <p className="text-base-content/60 mb-2">
                            {age && `${age} years old`}
                            {age && gender && " • "}
                            {gender && gender.charAt(0).toUpperCase() + gender.slice(1)}
                          </p>
                        )}
                        {about && (
                          <p className="text-base-content/70 mb-3 line-clamp-2">
                            {about}
                          </p>
                        )}
                        {skills && skills.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {skills.slice(0, 4).map((skill, index) => (
                              <div key={index} className="badge badge-outline badge-sm">
                                {skill}
                              </div>
                            ))}
                            {skills.length > 4 && (
                              <div className="badge badge-outline badge-sm">
                                +{skills.length - 4}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 md:justify-center">
                      <button
                        className="btn btn-success gap-2"
                        onClick={() => reviewRequest("accepted", request._id)}
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
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Accept
                          </>
                        )}
                      </button>
                      <button
                        className="btn btn-error gap-2"
                        onClick={() => reviewRequest("rejected", request._id)}
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
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Requests;
