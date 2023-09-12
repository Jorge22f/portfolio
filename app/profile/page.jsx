'use client';

import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Profile} from '@components/Profile';
import {setAll} from '@store/reducers/user';

const MyProfile = (props) => {
  const router = useRouter();
  const {data: session, status} = useSession();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
      if (data) setLoading(false);
    }

    if (session?.user.id) {
      fetchPosts();
      if (!user.id) dispatch(setAll(session.user));
    }
    else {
      if (status === "unauthenticated") router.push('/');
    }
  }, [session, status]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      loading={loading}
    />
  );
};

export default MyProfile;