import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import "../styles/Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <header>
        <h1>DEV@Deakin</h1>
        <input type="text" placeholder="Search..." />
        <div className="button-container">
          {user ? (
            <button className="button" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="button" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {user && <p>Hello, {user.email}</p>}
      </main>
    </div>
  );
};

export default Home;
