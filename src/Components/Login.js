import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../Graphql/index";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN);

  const handleLogin = async () => {
    try {
      const result = await login({
        variables: { input: { username, password } },
      });
      navigate("/create-link");
      alert("User logged in successfully");
      setUsername("");
      setPassword("");
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Login</p>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          style={{
            marginTop: "10px",
          }}
          onClick={handleLogin}
        >
          Login
        </button>
        <p
          style={{
            fontSize: "small",
          }}
        >
          Don't have an account?
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/")}
          >
            {" "}
            Create
          </span>
        </p>
      </header>
    </div>
  );
}

export default Login;
