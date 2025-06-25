import { useState, useEffect } from "react";
import type { Tweet } from "../types";

export function useHome() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const fetchTweets = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backendURL}/tweets`);
            if (!response.ok) {
                throw new Error("Failed to fetch tweets");   
            }

            const data = await response.json();
            setTweets(data);
        } catch (error) {
            setError((error as Error).message);
            console.error("Error fetching tweets:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTweets();
    }, []);

    const onAddTweet = async (text: string) => {
        setError(null);
        try {
            const newTweet = {
                text,
                name: 'Marko',
            };

            const response = await fetch(`${backendURL}/tweets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTweet),
            });

            if (!response.ok) {
                throw new Error("Failed adding tweet");
            }

            await fetchTweets();
        } catch (error) {
            setError((error as Error).message);
            console.error("Error in onAddTweet:", error);
        }
    };

    const handleDelete = async (id: number) => {
        setError(null);
        try {
            const response = await fetch(`${backendURL}/tweets/${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                throw new Error("Failed deleting id");
            }

            await fetchTweets();
        } catch (error) {
            setError((error as Error).message);
            console.error("Error in handleDelete:", error);
        }
    };

    return { tweets, isLoading, error, onAddTweet, handleDelete };
}