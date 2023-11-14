import { Route, Routes } from "react-router-dom";

import ChangePassword from "./pages/ChangePassword";
import EditProfile from "./pages/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./pages/UserProfile";
import VerificationEmail from "./pages/VerificationEmail";
import WorkspacePage from "./pages/WorkspacePage";
import Authenticated from "./components/Authenticated";
import Chat from "./pages/Chat";
import QuestionDetails from "./pages/QuestionDetails"; // Import the new component

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/changepassword" element={<Authenticated><ChangePassword /></Authenticated>} />
        <Route path="/editprofile" element={<Authenticated><EditProfile /></Authenticated>} />
        {/* <Route path="/userprofile" element={<Authenticated><UserProfile /></Authenticated>} /> */}
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/workspace" element={<Authenticated><WorkspacePage /></Authenticated>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verification" element={<VerificationEmail />} />
        <Route path="/chat" element={<Chat from={""} text={""} />} />
        <Route path="/question/:title" element={<Authenticated><QuestionDetails /></Authenticated>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
