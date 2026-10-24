
import { useState } from "react";

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://eventease-backend-r9zg.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! Please log in.");

      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Could not connect to the server.");
    }
  };

  return (
    <section className="login-section">
      <h2>Create an Account</h2>

      <form className="login-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </section>
  );
}

export default Register;
