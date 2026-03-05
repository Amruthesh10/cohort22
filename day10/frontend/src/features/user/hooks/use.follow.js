import { useContext, useCallback, useState } from "react";
import { FollowContext } from "../user.context"

export const useFollow = () => {
  const context = useContext(FollowContext);

  if (!context) {
    throw new Error("useFollow must be used inside FollowProvider");
  }

  const { loading, follow, unfollow } = context;

  const [followingMap, setFollowingMap] = useState({}); 
  // store follow state per username

  const handleFollow = useCallback(async (username) => {
    try {
      await follow(username);

      setFollowingMap((prev) => ({
        ...prev,
        [username]: true,
      }));

    } catch (err) {
      console.error("Follow failed", err);
    }
  }, [follow]);

  const handleUnfollow = useCallback(async (username) => {
    try {
      await unfollow(username);

      setFollowingMap((prev) => ({
        ...prev,
        [username]: false,
      }));

    } catch (err) {
      console.error("Unfollow failed", err);
    }
  }, [unfollow]);

  return {
    loading,
    followingMap,
    handleFollow,
    handleUnfollow,
  };
};