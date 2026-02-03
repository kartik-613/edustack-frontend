import React from "react";
import AppRoutes from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";
import SubscriptionProvider from "./context/SubscriptionContext";

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <SubscriptionProvider>
          <AppRoutes />
        </SubscriptionProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
