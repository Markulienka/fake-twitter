import { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function useLikes(userId: string | null) {
    const [likedTweetIds, setLikedTweetIds] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserLikes = async () => {
        if (!userId) return;
        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${BACKEND_URL}/likes/user/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    }
                }
            );
            if (response.ok) {
                const data = await response.json();
                setLikedTweetIds(new Set(data.likedTweetIds));
                setError(null);
            } else {
                setError("Failed to fetch user likes: " + response.statusText);
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchUserLikes();
        }
    }, [userId]);

    return { likedTweetIds, fetchUserLikes, error, setError, isLoading };
}