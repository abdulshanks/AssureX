import { Route, Routes } from "react-router";

import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewClaim from "./pages/NewClaim";
import ClaimResult from "./pages/ClaimResult";
import ClaimHistory from "./pages/ClaimHistory";
import ReviewDashboard from "./pages/ReviewDashboard";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/claims/new" element={<NewClaim />} />
        <Route path="/claims/:id" element={<ClaimResult />} />
        <Route path="/claims" element={<ClaimHistory />} />
        <Route path="/review" element={<ReviewDashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}