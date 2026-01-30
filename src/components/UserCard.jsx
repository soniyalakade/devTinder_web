import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm my-10">
      <figure>
        <img src={photoUrl} alt="Photo"/>
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {age && gender && <p>{age}, {gender}</p>}
        <p>{about}</p>

        {showActions && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
