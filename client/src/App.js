import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/HomePage";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/Routes/Private";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<PrivateRoute/>} >
          <Route path="" element={<Dashboard/>} />
        </Route>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
