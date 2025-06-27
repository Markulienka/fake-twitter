import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}