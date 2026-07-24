import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Audience from "./pages/Audience";
import Campaign from "./pages/Campaign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
