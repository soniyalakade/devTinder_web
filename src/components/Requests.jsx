import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) =>{
    try{

        const res = await axios.post(BASE_URL+"/request/review/" +status+"/"+_id, {}, {withCredentials: true});

        dispatch(removeRequest(_id));

    }catch(err){

    };
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0) {
    return <h1 className="flex justify-center my-10">No Requests Received</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">
        Connection Requests
      </h1>

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
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <img
              src={photoUrl}
              className="w-20 h-20 rounded-full"
              alt="profile"
            />
            <div className="mx-4 text-left">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age}, {gender}</p>}
              <p>{about}</p>
            </div>
            <div>
                <button className="btn btn-primary mx-2" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Requests;