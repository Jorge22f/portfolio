import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';

import PromptCard from './PromptCard';
import {updateName, updateUsername} from '@store/reducers/user';

export function Profile({data, handleEdit, handleDelete, loading}) {
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading]);

  const save = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/users`, {
        method: 'PATCH',
        body: JSON.stringify(user)
      });

      if (response.ok) {
        setError([]);
        setEditing(false);
      }
      else if (response.status === 400) {
        const text = await response.text();
        setError([
          text.substring(0, text.indexOf(' ')),
          text.substring(text.indexOf(' ') + 1),
        ]);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

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

      {error.length > 0 && <div role="alert">
        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
          {error[0]}
        </div>
        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>{error[1]}</p>
        </div>
      </div>}

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
              onChange={(e) => dispatch(updateName(e.target.value))}
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
              onChange={(e) => dispatch(updateUsername(e.target.value))}
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

