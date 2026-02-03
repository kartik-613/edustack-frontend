import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";
import SubscriptionProvider from "./context/SubscriptionContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <SubscriptionProvider>
            <AppRoutes />
          </SubscriptionProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
