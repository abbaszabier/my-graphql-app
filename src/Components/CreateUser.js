import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Graphql/index";
import { useState } from "react";

function CreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = async () => {
    try {
      const result = await createUser({
        variables: { input: { username, password } },
      });
      const token = result.data.createUser;
      localStorage.setItem("authToken", token);
      console.log(result);
      navigate("/login");
      alert("User created successfully");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Create User</p>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          style={{
            marginTop: "10px",
          }}
          onClick={handleCreateUser}
        >
          Create User
        </button>
        <p
          style={{
            fontSize: "small",
          }}
        >
          Already have an account?
          <span
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/login")}
          >
            {" "}
            Login
          </span>
        </p>
      </header>
    </div>
  );
}

export default CreateUser;
