import { useContext, useState } from "react";
export const PostContext = createContext(null)

export const useFollow = (initialStatus) => {
  const { follow, unfollow, loading, error } =
    useContext(FollowContext);

  const [isFollowing, setIsFollowing] = useState(
    initialStatus === "accepted"
  );

  const toggleFollow = async (username) => {
    try {
      if (isFollowing) {
        await unfollow(username);
        setIsFollowing(false);
      } else {
        await follow(username);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    isFollowing,
    toggleFollow,
    loading,
    error,
  };
};