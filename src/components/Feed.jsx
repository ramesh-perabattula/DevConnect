import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      dispatch(addFeed(res.data.users));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!Array.isArray(feed)) return null;

  if (feed.length === 0) return <h1>No new users found</h1>;

  return (
    <div className='flex justify-center my-12'>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
