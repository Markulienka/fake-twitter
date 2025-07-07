const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function useTweetActions({
  userId,
  fetchTweets,
  fetchUserLikes,
  setError,
  likedTweetIds
}: {
  userId: string | null,
  fetchTweets: () => Promise<void>,
  fetchUserLikes: () => Promise<void>,
  setError: (msg: string | null) => void,
  likedTweetIds: Set<string>
}) {
  const token = localStorage.getItem('authToken');

  const onAddTweet = async (text: string) => {
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/tweets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ text, userId }),
      });
      if (response.ok) {
        await fetchTweets();
        await fetchUserLikes();
      } else {
        setError('Failed adding tweet' + response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      const response = await fetch(`${BACKEND_URL}/tweets/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (response.ok) {
        await fetchTweets();
        await fetchUserLikes();
      } else {
        setError('Failed deleting tweet' + response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const toggleLike = async (tweetId: string) => {
    if (!userId) return;
    const isLiked = likedTweetIds.has(tweetId);
    let response;
    try {
      if (isLiked) {
        response = await fetch(`${BACKEND_URL}/likes/${tweetId}` , {
          method: 'DELETE',
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
      } else {
        response = await fetch(`${BACKEND_URL}/likes/${tweetId}` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId })
        });
      }
      if (response.ok) {
        await fetchTweets();
        await fetchUserLikes();
      } else {
        setError(`Failed ${isLiked ? 'unliking' : 'liking'} tweet` + response.statusText);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { onAddTweet, handleDelete, toggleLike };
}