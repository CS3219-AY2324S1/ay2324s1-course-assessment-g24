import { ReactNode } from "react";

import { AuthProvider } from "./AuthContext";
import { MatchingProvider } from "./MatchingContext";

const AppContext = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <MatchingProvider>{children}</MatchingProvider>
    </AuthProvider>
  );
};

export default AppContext;
