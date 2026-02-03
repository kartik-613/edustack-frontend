import { useContext } from "react";
import { SubscriptionContext } from "../context/SubscriptionContext";

const useSubscription = () => {
  const { subscription, updateSubscription } = useContext(SubscriptionContext);
  return { subscription, updateSubscription };
};

export default useSubscription;
