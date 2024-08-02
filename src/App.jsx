import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import CreateBlogs from "./Components/CreateBlogs";
import Trash from "./Components/Trash";
import Navbar from "./Components/Navbar";
import UserInfo from "./Components/UserInfo";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();
  const showNavbar = !['/', '/login'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-blogs" element={<CreateBlogs />} />
        <Route path="/trash" element={<Trash />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
