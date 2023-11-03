import { Route, Routes } from "react-router-dom";

import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import Matchmaker from "./pages/Matchmaker";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import VerificationEmail from "./pages/VerificationEmail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/loadingpage" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matchmaker" element={<Matchmaker />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verification" element={<VerificationEmail />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
