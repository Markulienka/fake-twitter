import ListOfTweets from "../../components/ListOfTweets";
import Input from "../../components/Input";
import { useHome } from "./useHome";

export default function Home() {
  const { 
    tweets,  
    likedTweetIds,
    isLoadingTweets,
    isLoadingLikes,
    tweetsError,
    likesError,
    onAddTweet, 
    handleDelete, 
    toggleLike, 
    username,
    logout 
  } = useHome();

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
      {(isLoadingTweets || isLoadingLikes) && <div>Loading...</div>}
      {(tweetsError || likesError) && <div className="text-red-600 font-bold">Error: {tweetsError || likesError}</div>}
      {!(isLoadingTweets || isLoadingLikes) && !(tweetsError || likesError) && (
        <ListOfTweets tweets={tweets} onDelete={handleDelete} onToggleLike={toggleLike} likedTweetIds={likedTweetIds}/>
      )}
    </div>
  );
}