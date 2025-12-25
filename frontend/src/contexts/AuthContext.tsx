import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { api } from "../services/api";
import type { User } from "../types/user";

type AuthContextType = {
  user: User | undefined;   
  isAuthenticated: boolean;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  fetchUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const signOut = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(undefined);
    }, []);

    const fetchUser = useCallback(async () => {
        try {
            const response = await api.get('auth/validate');
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        catch(err) {
            console.error("Error fetching user", err);
            signOut();
        }
    }, [signOut]);

    const signIn = useCallback((token: string, user: User) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        
        fetchUser(); 
    }, [fetchUser]);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(recoveredUser && token) {
            try {
                const parsedUser = JSON.parse(recoveredUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user from storage", error);
                signOut(); 
            }

            fetchUser().finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [fetchUser, signOut]);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            signIn,
            signOut,
            fetchUser,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// 🛡️ SAFETY CHECK: Strict Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};