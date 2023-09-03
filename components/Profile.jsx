import {useSession} from 'next-auth/react';
import {useContext, useEffect, useState} from "react";

import PromptCard from './PromptCard';
import {Filecontext} from '@utils/filecontext';

export function Profile({data, handleEdit, handleDelete, loading}) {
  const {data: session} = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const {user, setUser} = useContext(Filecontext);

  const save = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/users`, {
        method: 'PATCH',
        body: JSON.stringify(user)
      });

      if (response.ok) {
        setEditing(false);
        session.user = user;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading]);

  return (
    <section className="my-20 mx-20">
      {isLoading && <div className="loader"><div></div></div>}
      <h1 className="head_text text-left mb-8 justify-items">
        <span className="blue_gradient">My Profile </span>
        {!editing && <button className="green_btn relative bottom-2" onClick={() => setEditing(true)}>
          Edit
        </button>}
        {editing && <button className="green_btn relative bottom-2" onClick={() => save()}>
          Save
        </button>}
        {editing && <button className="red_btn relative bottom-2 ml-2" onClick={() => setEditing(false)}>
          Cancel
        </button>}
      </h1>

      <div className="profile_row">
        <div className="profile_data font-semibold">
          <p>Name:</p>
        </div>
        <div className="profile_data">
          {!editing && <p>{user?.name}</p>}
          {editing && <form>
            <input
              type="text"
              value={user?.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
          </form>}
        </div>
      </div>

      <div className="profile_row">
        <div className="profile_data font-semibold">
          <p>Email:</p>
        </div>
        <div className="profile_data">
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile_row">
        <div className="profile_data font-semibold">
          <p>Username:</p>
        </div>
        <div className="profile_data">
          {!editing && <p>{user?.username}</p>}
          {editing && <form>
            <input
              type="text"
              value={user?.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
            />
          </form>}
        </div>
      </div>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

