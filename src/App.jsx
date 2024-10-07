import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();
  const location = useLocation();

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("login");
      }
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayout>
                <Home />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute isAuth={!!token}>
              <MainLayout>
                <Details />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
