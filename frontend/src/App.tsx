import { Route, Routes } from "react-router-dom";

import Authenticated from "./components/Authenticated";
import ChangePassword from "./pages/ChangePassword";
import Chat from "./pages/Chat";
import EditProfile from "./pages/EditProfile/EditProfile";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserProfile from "./pages/UserProfile";
import VerificationEmail from "./pages/VerificationEmail";
import WorkspacePage from "./pages/WorkspacePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/changepassword"
          element={
            <Authenticated>
              <ChangePassword />
            </Authenticated>
          }
        />
        <Route
          path="/editprofile"
          element={
            <Authenticated>
              <EditProfile />
            </Authenticated>
          }
        />
        <Route
          path="/userprofile"
          element={
            <Authenticated>
              <UserProfile />
            </Authenticated>
          }
        />
        <Route
          path="/workspace"
          element={
            <Authenticated>
              <WorkspacePage />
            </Authenticated>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verification" element={<VerificationEmail />} />
        <Route path="/chat" element={<Chat from={""} text={""} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
