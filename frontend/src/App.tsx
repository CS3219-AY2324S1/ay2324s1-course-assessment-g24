import { Route, Routes } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import VerificationEmail from "./pages/VerificationEmail";
import LoadingPage from "./pages/LoadingPage";
import Matchmaker from "./pages/Matchmaker";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<VerificationEmail />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/loadingpage" element={<LoadingPage />} />
        <Route path="/matchmaker" element={<Matchmaker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
