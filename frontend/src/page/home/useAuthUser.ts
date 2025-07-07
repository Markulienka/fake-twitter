import { useNavigate } from "react-router-dom";

const getUserDataFromToken = () => {
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

export function useAuthUser() {
    const navigate = useNavigate();
    const { userId, username } = getUserDataFromToken();

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return { userId, username, logout };
}
