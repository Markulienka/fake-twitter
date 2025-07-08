import ListOfTweets from "../../components/ListOfTweets";
import Input from "../../components/Input";
import { useAuthUser } from './useAuthUser';
import { useTweets } from './useTweets';
import { useLikes } from './useLikes';
import { useTweetActions } from './useTweetActions';

export default function Home() {
  const { userId, username, logout } = useAuthUser();
  const { tweets, fetchTweets, isLoading: isTweetsLoading, error: tweetsError, setError } = useTweets(userId);
  const { likedTweetIds, fetchUserLikes, isLoading: isLikesLoading, error: likesError } = useLikes(userId);
  const { onAddTweet, handleDelete, toggleLike } = useTweetActions({ userId, fetchTweets, fetchUserLikes, setError, likedTweetIds });
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </div>
      
      <Input onAddTweet={onAddTweet} />
      {(isTweetsLoading || isLikesLoading) && <div>Loading...</div>}
      {(tweetsError || likesError) && <div className="text-red-600 font-bold">Error: {tweetsError || likesError}</div>}
      {!(isTweetsLoading || isLikesLoading) && !(tweetsError || likesError) && (
        <ListOfTweets tweets={tweets} onDelete={handleDelete} onToggleLike={toggleLike} likedTweetIds={likedTweetIds}/>
      )}
    </div>
  );
}