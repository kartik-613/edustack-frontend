import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const SubscriptionContext = createContext();

const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({ active: false });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && (user.role === "teacher" || user.role === "admin")) {
      setSubscription({ active: true, plan: "Premium (Role-based)" });
    } else if (user) {
      // For students, check if they have a saved subscription or default to false
      setSubscription({ active: false });
    } else {
      setSubscription({ active: false });
    }
  }, [user]);

  const updateSubscription = (data) => setSubscription(data);

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      updateSubscription,
      isSubscribed: subscription.active
    }}>
      {children}
    </SubscriptionContext.Provider>
  );

};

export default SubscriptionProvider;

