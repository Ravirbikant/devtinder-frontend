import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import Feed from "./Feed.jsx";
import { addUser } from "./store/userSlice.js";
import { BASE_URL } from "./constants.js";

function LandingRedirect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(data));
        navigate("/feed", { replace: true });
      } catch {
        navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  return null;
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingRedirect />} />
        <Route path="connections" element={<p>Here is connections page</p>} />
        <Route path="login" element={<Login />} />
        <Route path="feed" element={<Feed />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
