import { useState } from "react";
import { useUser } from "../UserContext"; 
import { useNavigate } from "react-router-dom"; 
const API_BASE = "http://localhost:3001";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        setUser({ username }); 
        localStorage.setItem("loginStatus", "loggedIn"); 
        navigate("/todoapp");

      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      </div>
      <div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      <div>
      <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;