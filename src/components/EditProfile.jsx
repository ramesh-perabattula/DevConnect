import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills ? user.skills.join(", ") : "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    setIsSaving(true);
    try {
      const skillsArray = skills
        ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
        : [];
      
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age: age ? parseInt(age) : undefined,
          gender,
          about,
          skills: skillsArray,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        if (onClose) {
          onClose();
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Last Name</span>
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </label>
        </div>

        <label className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Photo URL</span>
          </div>
          <input
            type="url"
            value={photoUrl}
            className="input input-bordered w-full"
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Age</span>
            </div>
            <input
              type="number"
              value={age}
              className="input input-bordered w-full"
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              min="18"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold">Gender</span>
            </div>
            <select
              value={gender}
              className="select select-bordered w-full"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>

        <label className="form-control">
          <div className="label">
            <span className="label-text font-semibold">About</span>
          </div>
          <textarea
            value={about}
            className="textarea textarea-bordered w-full h-24"
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text font-semibold">Skills (comma separated)</span>
          </div>
          <input
            type="text"
            value={skills}
            className="input input-bordered w-full"
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </label>

        {error && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-4">
          {onClose && (
            <button
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={saveProfile}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
