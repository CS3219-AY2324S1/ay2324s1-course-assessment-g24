import { Route, Routes } from "react-router-dom";

import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
<<<<<<< HEAD
import LandingPage from "./pages/LandingPage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import MatchMaker from "./pages/MatchMaker";
=======
import HomePage from "./pages/HomePage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import Matchmaker from "./pages/Matchmaker";
>>>>>>> milestone1
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserProfile";
import VerificationEmail from "./pages/VerificationEmail";
<<<<<<< HEAD
import WorkspacePage from "./pages/WorkspacePage";
=======
>>>>>>> milestone1

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/loadingpage" element={<LoadingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/matchmaker" element={<MatchMaker />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verification" element={<VerificationEmail />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
<<<<<<< HEAD
=======
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/userprofile" element={<UserProfile />} />
>>>>>>> milestone1
      </Routes>
    </>
  );
};

export default App;
