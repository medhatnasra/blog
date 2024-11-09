import { Header } from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";
import { PostPage } from "./pages/posts/post-page/Postpage";
import { Createpost } from "./pages/posts/post-create/Createpost";
import { AdminDash } from "./pages/admin/AdminDash";
import { PostDetails } from "./pages/posts/post-details/PostDetails";
import { UserDetails } from "./pages/user/user-details/UserDetails";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NotFound from "./pages/notfound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // return () => {
    //     axios.interceptors.response.eject(interceptor); // Clean up interceptor on component unmount
    //   };
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/posts"
          element={isAuthenticated ? <PostPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/post/create"
          element={isAuthenticated ? <Createpost /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/post/details/:id"
          element={isAuthenticated ? <PostDetails /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-dashboard"
          element={user?.isAdmin ? <AdminDash /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:id"
          element={isAuthenticated ? <UserDetails /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
