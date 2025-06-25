import { useState, useEffect } from "react";
import ListOfTweets from "./components/ListOfTweets";
import Input from "./components/Input";
import type { Tweet } from "./types";

export default function App() {
 const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    async function fetchTweets() { 
      const responset = await fetch("http://localhost:3000/tweets");
      if (!responset.ok) {
        console.error("Failed to fetch tweets");
        return;
      }
      const data = await responset.json();
      setTweets(data);
    }
    fetchTweets();
  }, []);

  const onAddTweet = async (text: string) => {
    const newTweet = {
      text,
      name: 'Marko',
    }

    const response = await fetch("http://localhost:3000/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTweet),
    });

    if (!response.ok) {
      console.error("Failed adding tweet:");
    }

    const data: Tweet = await response.json();
    // console.log("Created tweet from backend:", data);
    setTweets((prev) => [data, ...prev]);
  }

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3000/tweets/${id}`, {
      method: "DELETE"
    });   
    if (!response.ok) {
      console.log("Failed deleting id");
    } 
    setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Input onAddTweet={onAddTweet} />
      <ListOfTweets tweets={tweets} onDelete={handleDelete} />
    </div>
  );
}