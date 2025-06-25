import ListOfTweets from "../components/ListOfTweets";
import Input from "../components/Input";
import { useHome } from "../hooks/useHome";

export default function Home() {
  const { tweets, isLoading, error, onAddTweet, handleDelete } = useHome();

  return (
    <div className="p-4 max-w-md mx-auto">
      <Input onAddTweet={onAddTweet} />
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600 font-bold">Error: {error}</div>}
      {!isLoading && !error && (
        <ListOfTweets tweets={tweets} onDelete={handleDelete} />
      )}
    </div>
  );
}