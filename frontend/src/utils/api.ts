import type { Tweet, UserData, ApiResponse } from "../types";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export function getUserDataFromToken(): UserData {
  const token = localStorage.getItem('authToken');
  if (!token) return { userId: null, username: null };
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.username) {
      localStorage.removeItem('authToken');
      return { userId: null, username: null };
    }
    return { userId: payload.sub, username: payload.username };
  } catch {
    localStorage.removeItem('authToken');
    return { userId: null, username: null };
  }
}

export async function fetchWithAuth<T>(
  url: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('authToken');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (response.ok) {
      const data = await response.json();
      return { data, error: null };
    } else {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      return { data: null, error: errorData.message || 'An error occurred' };
    }
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}

export async function fetchTweets(userId?: string | null): Promise<ApiResponse<Tweet[]>> {
  const url = userId 
    ? `${BACKEND_URL}/tweets?userId=${userId}`
    : `${BACKEND_URL}/tweets`;
    
  return fetchWithAuth<Tweet[]>(url);
}

export async function createTweet(text: string, userId: string | null): Promise<ApiResponse<Tweet>> {
  if (!userId) return { data: null, error: 'User not authenticated' };
  
  return fetchWithAuth<Tweet>(`${BACKEND_URL}/tweets`, {
    method: 'POST',
    body: JSON.stringify({ text, userId }),
  });
}

export async function deleteTweet(id: string): Promise<ApiResponse<{ success: boolean }>> {
  return fetchWithAuth<{ success: boolean }>(`${BACKEND_URL}/tweets/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchUserLikes(userId: string | null): Promise<ApiResponse<{ likedTweetIds: string[] }>> {
  if (!userId) return { data: { likedTweetIds: [] }, error: null };
  
  return fetchWithAuth<{ likedTweetIds: string[] }>(`${BACKEND_URL}/likes/user/${userId}`);
}

export async function likeTweet(tweetId: string, userId: string | null): Promise<ApiResponse<{ success: boolean }>> {
  if (!userId) return { data: null, error: 'User not authenticated' };
  
  return fetchWithAuth<{ success: boolean }>(`${BACKEND_URL}/likes/${tweetId}`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
}

export async function unlikeTweet(tweetId: string, userId: string | null): Promise<ApiResponse<{ success: boolean }>> {
  if (!userId) return { data: null, error: 'User not authenticated' };
  
  return fetchWithAuth<{ success: boolean }>(`${BACKEND_URL}/likes/${tweetId}`, {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
  });
}
