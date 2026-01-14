import { useAuth } from "../contexts/AuthContext"
import type { User } from "../types/user";

export const TestAuth = () => {
    const userAuth = useAuth();

    const fakeUser: User = {
        id: 99,
        name: "Test User",
        email: "test@example.com",
        avatar: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const forceLogin = () => {
        userAuth?.signIn('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY4MjQ2NzI5LCJleHAiOjE3NzA4Mzg3Mjl9.GBPPOtQ1LoOqLdFFKkTIeAe8Vrhilu0gUiZ12sHbRp0', fakeUser)
    }

    return (
        <div style={{ padding: 20, border: '2px solid red', margin: 20 }}>
            <h3>🕵️‍♂️ Auth Context Tester</h3>
            
            <p><strong>Is Authenticated:</strong> {userAuth?.isAuthenticated ? "✅ YES" : "❌ NO"}</p>
            
            <p><strong>Current User:</strong></p>
            <pre style={{ background: '#eee', padding: 10 }}>
                {JSON.stringify(userAuth, null, 2)}
            </pre>

            <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={forceLogin}>
                    Force Login
                </button>
                
                <button onClick={userAuth?.signOut}>
                    Logout
                </button>
            </div>
        </div>
    );
}