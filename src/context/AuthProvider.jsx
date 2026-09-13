import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail") ? { email: localStorage.getItem("currentUserEmail") } : null);
    

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u) => u.email === email)) {
            return { success: false, message: "Email already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);

        setUser({ email });
        return { success: true, message: "User created successfully" };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const found = users.find((u) => u.email === email && u.password === password);

        if (!found) {
            return { success: false, message: "Invalid email or password" };
        }

        setUser({ email });
        return { success: true, message: "Logged in successfully" };
    }
    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signUp, login, user , logout}}>
            {children}
        </AuthContext.Provider>
    );
}
