import { Route, Routes } from "react-router-dom";

import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import Matchmaker from "./pages/Matchmaker";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserProfile";
import VerificationEmail from "./pages/VerificationEmail";

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
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
