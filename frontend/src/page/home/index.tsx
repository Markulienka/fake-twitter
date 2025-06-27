import ListOfTweets from "../../components/ListOfTweets";
import Input from "../../components/Input";
import { useHome } from "./useHome";

export default function Home() {
  const { 
    tweets,  
    likedTweetIds,
    isLoading, 
    error, 
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
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600 font-bold">Error: {error}</div>}
      {!isLoading && !error && (
        <ListOfTweets tweets={tweets} onDelete={handleDelete} onToggleLike={toggleLike} likedTweetIds={likedTweetIds}/>
      )}
    </div>
  );
}