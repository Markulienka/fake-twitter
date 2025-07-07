import { useAuthUser } from "./useAuthUser";
import { useTweets } from "./useTweets";
import { useLikes } from "./useLikes";
import { useTweetActions } from "./useTweetActions";

export function useHome() {
  const { userId, username, logout } = useAuthUser();
  const { tweets, setTweets, fetchTweets, isLoading: isTweetsLoading, error: tweetsError, setError } = useTweets(userId);
  const { likedTweetIds, fetchUserLikes, isLoading: isLikesLoading, error: likesError } = useLikes(userId);
  const { onAddTweet, handleDelete, toggleLike } = useTweetActions({ userId, fetchTweets, fetchUserLikes,setError, likedTweetIds });

  return {
    tweets,
    setTweets,
    likedTweetIds,
    isLoadingTweets: isTweetsLoading,
    isLoadingLikes: isLikesLoading,
    tweetsError: tweetsError,
    likesError: likesError,
    onAddTweet,
    handleDelete,
    toggleLike,
    userId,
    username,
    logout,
    setError
  };
}