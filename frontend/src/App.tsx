// import { Route, Routes } from "react-router-dom";

// import ForgotPassword from "./pages/ForgotPassword";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import NotFound from "./pages/NotFound";
// import ResetPassword from "./pages/ResetPassword";
// import SignUpPage from "./pages/SignUpPage";
// import VerificationEmail from "./pages/VerificationEmail";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/verification" element={<VerificationEmail />} />
//         <Route path="/resetpassword" element={<ResetPassword />} />
//         <Route path="/" element={<HomePage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

// frontend/src/App.tsx

import FormComponent from './components/FormComponent';

function App() {
  return (
    <div>
      <FormComponent />
    </div>
  );
}

export default App;

