import React, { useEffect, useRef, useState } from "react";
import Home from "./pages/Home/Home";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Kids from "./pages/Kids/Kids";
import Login from "./pages/Login/Login";
import Languages from "./pages/Languages/Languages";
import Movies from "./pages/Movies/Movies";
import MyList from "./pages/MyList/MyList";
import NewAndPopular from "./pages/NewAndPopular/NewAndPopular";
import Player from "./pages/Player/Player";
import TV from "./pages/TV/TV";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import { showToast } from "./utils/toastUtils";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [checking, setChecking] = useState(!auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (next) => {
      setUser(next);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return null;
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasWelcomedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!hasWelcomedRef.current) {
          const displayName =
            user.displayName || user.email?.split("@")[0] || "friend";
          const isNewUser =
            user.metadata?.creationTime === user.metadata?.lastSignInTime;
          const greeting = isNewUser
            ? `Welcome to NetFlix, ${displayName}!`
            : `Welcome back, ${displayName}!`;
          showToast("info", greeting);
          hasWelcomedRef.current = true;
        }

        if (location.pathname === "/login") {
          navigate("/", { replace: true });
        }
      } else {
        hasWelcomedRef.current = false;
        if (location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new" element={<NewAndPopular />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/kids" element={<Kids />} />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
