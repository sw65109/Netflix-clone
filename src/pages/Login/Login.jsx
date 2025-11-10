import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { auth, login, signUp } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastUtils";
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      showToast("error", "Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (signState === "Sign Up" && !name) {
      showToast("error", "Please enter your name");
      setLoading(false);
      return;
    }

    try {
      let result;
      if (signState === "Sign In") {
        result = await login(email, password);
      } else {
        result = await signUp(name, email, password);
      }

      if (result?.success) {
        showToast("success", `${signState} successful! Welcome to Netflix`);
        navigate("/");
      } else {
        showToast(
          "error",
          `${signState} failed: ${result?.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error(error);
      showToast("error", "An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  if (checkingAuth || loading) {
    return (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading spinner" />
      </div>
    );
  }

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="Netflix Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              type="text"
              placeholder="Your Name"
              aria-label="Your Name"
              required
            />
          )}
          <input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
            placeholder="Email"
            aria-label="Email"
            required
          />
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            placeholder="Password"
            aria-label="Password"
            required
            minLength={6}
          />
          <button onClick={user_auth} type="submit">
            {signState}
          </button>
          <div className="form-help">
            <div className="remeber">
              <label className="remember">
                <input type="checkbox" id="rememberMe" />
                Remember Me
              </label>
            </div>
            <a href="#">Need Help</a>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
              <span
                onClick={() => {
                  setSignState("Sign Up");
                }}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span
                onClick={() => {
                  setSignState("Sign In");
                }}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
