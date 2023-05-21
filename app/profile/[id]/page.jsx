'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = ({ params }) => {
  const username = useSearchParams().get('username');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data); 
    }

    fetchPosts();
  }, []);

  return (
    <Profile
      name={username + "'s"}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={posts}
    />
  )
}

export default ProfilePage;