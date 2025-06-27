import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Tweet } from "../../types";

export function useHome() {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [likedTweetIds, setLikedTweetIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const getUserData = () => {
        const token = localStorage.getItem('authToken');
        if (!token) return { userId: null, username: null };
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (!payload.username) {
                localStorage.removeItem('authToken');
                return { userId: null, username: null };
            }
            return { userId: payload.id, username: payload.username };
        } catch {
            localStorage.removeItem('authToken');
            return { userId: null, username: null };
        }
    };
    
    const { userId, username } = getUserData();
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

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
            const response = await fetch(`${backendURL}/tweets?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setTweets(data);
                setError(null);
                
                await fetchUserLikes();
            } else {
                setError("Failed fetching tweets"); 
            }
        } catch (error) {
            setError((error as Error).message);
            console.error("Error fetching tweets:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchUserLikes = async () => {
        if (!userId) return;
        
        try {
            const response = await fetch(`${backendURL}/likes/user/${userId}`);
            if (response.ok) {
                const { likedTweetIds } = await response.json();
                setLikedTweetIds(new Set(likedTweetIds));
            }
        } catch (error) {
            console.error('Error fetching user likes:', error);
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
                userId,
            };

            const response = await fetch(`${backendURL}/tweets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTweet),
            });

            if (response.ok) {
                await fetchTweets();   
            } else {
                setError("Failed adding tweet");
            }
               
        } catch (error) {
            setError((error as Error).message);
            console.error("Error in onAddTweet:", error);
        }
    };

    const handleDelete = async (id: string) => {
        setError(null);
        try {
            const response = await fetch(`${backendURL}/tweets/${id}`, {
                method: "DELETE",
            });
            
            if (response.ok) {
                await fetchTweets();   
            } else {
                setError("Failed deleting id");
            }

        } catch (error) {
            setError((error as Error).message);
            console.error("Error in handleDelete:", error);
        }
    };

    const toggleLike = async (tweetId: string) => {
        try {
            const isLiked = likedTweetIds.has(tweetId);
            
            if (isLiked) {
                const response = await fetch(`${backendURL}/likes/${tweetId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });
                
                if (response.ok) {
                    await fetchTweets();
                } else {
                    const errorData = await response.json();
                    setError(`Failed unliking: ${errorData.message || response.statusText}`);
                }
            } else {
                const response = await fetch(`${backendURL}/likes/${tweetId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                if (response.ok) {
                    await fetchTweets();
                } else {
                    const errorData = await response.json();
                    setError(`Failed liking: ${errorData.message || response.statusText}`);
                }
            }
        } catch (error) {
            setError((error as Error).message);
            console.error("Error in toggleLike:", error);
        }
    };

    return { tweets, likedTweetIds, isLoading, error, onAddTweet, handleDelete, toggleLike, userId, username, logout };
}