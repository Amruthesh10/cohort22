import { useFollow } from "../hooks/use.follow"

const FollowButton = ({ user }) => {
  const { loading, followingMap, handleFollow, handleUnfollow } = useFollow();

  const isFollowing = followingMap[user.username];

  const handleClick = () => {
    if (isFollowing) {
      handleUnfollow(user.username);
    } else {
      handleFollow(user.username);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200
        ${
          isFollowing
            ? "bg-gray-200 text-black hover:bg-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {loading
        ? "Loading..."
        : isFollowing
        ? "Unfollow"
        : "Follow"}
    </button>
  );
};

export default FollowButton;