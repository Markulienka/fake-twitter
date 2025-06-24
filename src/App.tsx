import { useState, useEffect } from "react";
import ListOfTweets from "./components/ListOfTweets";
import Input from "./components/Input";
import type { Tweet } from "./types";

export default function App() {
 const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("tweets");
    // console.log("Loading:", saved);
    if (saved) {
      setTweets(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (tweets.length === 0) return;
    // console.log("Saved:", tweets);
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }, [tweets]);

  const onAddTweet = (text: string) => {
    const newTweet: Tweet = {
      id: crypto.randomUUID(),
      text,
      name: "Marko",
    };
    setTweets((prev) => [newTweet, ...prev]);
  };

  const handleDelete = (id: string) => {
    setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Input onAddTweet={onAddTweet} />
      <ListOfTweets tweets={tweets} onDelete={handleDelete} />
    </div>
  );
}