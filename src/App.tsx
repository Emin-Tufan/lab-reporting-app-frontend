import { Footer } from "./layouts/NavbarAndFooter/Footer";
import "./App.css";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import ReportViewPage from "./layouts/ManagerPage/ReportViewPage";
import ProtectedRoute from "./layouts/ProtectedRoute/ProtectedRoute";
import AuthProvider from "./Auth/UseAuth";
import { AddReport } from "./layouts/ManagerPage/AddReport";
import ViewPatients from "./layouts/ManagerPage/ViewPatients";
import { SignPage } from "./layouts/SignPage/SignPage";
import { Routes, Route } from "react-router-dom";
import { RegisterPatient } from "./layouts/PatientPage/RegisterPatient";
import { ViewReportPage } from "./layouts/PatientPage/ViewReportPage";


function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/login" element={<SignPage />} />
            <Route element={<ProtectedRoute allowedRoles={'ROLE_ADMIN'} />}>
              <Route path="/review-report" element={<ReportViewPage />} />
              <Route path="/add-report/:id" element={<AddReport />} />
              <Route path="/review-patients" element={<ViewPatients />} />
              <Route path="/review-reports" element={<ReportViewPage />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={"ROLE_USER"} />}>
              <Route path="/patient-reports" element={<ViewReportPage />} />
            </Route>
            <Route path="/register" element={<RegisterPatient />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider >
  );
}
export default App;
