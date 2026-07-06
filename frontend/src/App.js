import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import NCRList from "./pages/NCRList";
import NCRDetails from "./pages/NCRDetails";
import Reports from "./pages/Reports";
import NCRForm from "./components/forms/NCRForm";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ncr-list" element={<NCRList />} />
          <Route path="/create-ncr" element={<NCRForm />} />
          <Route path="/ncr/:id" element={<NCRDetails />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;