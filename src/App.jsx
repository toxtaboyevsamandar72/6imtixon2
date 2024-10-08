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
    return isAuth ? children : <Navigate to="/login" />;
  }

  useEffect(() => {
    
    const storedToken = localStorage.getItem("token");
    
   
    if (storedToken) {
      setToken(storedToken);
    } else {
      
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]); 

  return (
    <div className="container_app">
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
    </div>
  );
}

export default App;
