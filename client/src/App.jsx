import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;