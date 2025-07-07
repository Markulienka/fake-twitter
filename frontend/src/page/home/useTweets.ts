import { useState, useEffect } from "react";
import type { Tweet } from "../../types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function useTweets(userId: string | null) {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

     const fetchTweets = async () => {
        setIsLoading(true);
        try {
            const url = userId 
                ? `${BACKEND_URL}/tweets?userId=${userId}`
                : `${BACKEND_URL}/tweets`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(userId ? { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` } : {}),
                },
            }); 
            if (response.ok) {
                const tweetsData = await response.json();
                setTweets(tweetsData);
                setError(null);
            } else {
                setError("Failed fetching tweets" + response.statusText); 
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { 
        fetchTweets(); 
    }, [userId]);

    return { tweets, setTweets, fetchTweets, isLoading, error, setError};
}
