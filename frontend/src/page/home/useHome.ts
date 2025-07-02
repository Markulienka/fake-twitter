import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Tweet } from "../../types";
import { 
  getUserDataFromToken, 
  fetchTweets as fetchTweetsApi,
  fetchUserLikes as fetchUserLikesApi,
  createTweet,
  deleteTweet,
  likeTweet,
  unlikeTweet
} from "../../utils/api";

export function useHome() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [likedTweetIds, setLikedTweetIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { userId, username } = getUserDataFromToken();

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
    }, [userId, navigate]);

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const fetchTweets = async () => {
        setIsLoading(true);
        try {
            const result = await fetchTweetsApi(userId);
            
            if (result.data) {
                setTweets(result.data);
                setError(null);
                await fetchUserLikes();
            } else {
                setError(result.error || "Failed fetching tweets"); 
            }
        } catch (error) {
            setError((error as Error).message);
            console.error("Error fetching tweets:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserLikes = async () => {
        if (!userId) return;
        
        const result = await fetchUserLikesApi(userId);
        if (result.data) {
            setLikedTweetIds(new Set(result.data.likedTweetIds));
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const onAddTweet = async (text: string) => {
        setError(null);
        const result = await createTweet(text, userId);
        
        if (result.data) {
            await fetchTweets();
        } else {
            setError(result.error || "Failed adding tweet");
        }
    };

    const handleDelete = async (id: string) => {
        setError(null);
        const result = await deleteTweet(id);
        
        if (result.data) {
            await fetchTweets();
        } else {
            setError(result.error || "Failed deleting tweet");
        }
    };

    const toggleLike = async (tweetId: string) => {
        if (!userId) return;
        
        try {
            const isLiked = likedTweetIds.has(tweetId);
            const result = isLiked 
                ? await unlikeTweet(tweetId, userId)
                : await likeTweet(tweetId, userId);
            
            if (result.data) {
                await fetchTweets();
            } else {
                setError(result.error || `Failed ${isLiked ? 'unliking' : 'liking'} tweet`);
            }
        } catch (error) {
            setError((error as Error).message);
            console.error("Error in toggleLike:", error);
        }
    };

    return { 
        tweets, 
        likedTweetIds, 
        isLoading, 
        error, 
        onAddTweet, 
        handleDelete, 
        toggleLike, 
        userId, 
        username, 
        logout 
    };
}