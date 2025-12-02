import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status) => {
        try {
            await axios.post(
                BASE_URL + "/request/send/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeUserFromFeed(_id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={photoUrl} alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4">
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("ignored")}
                    >
                        Ignore
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSendRequest("interested")}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
