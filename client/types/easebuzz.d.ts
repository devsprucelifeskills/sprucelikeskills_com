interface EasebuzzCheckoutInstance {
  initiatePayment: (options: {
    access_key: string;
    onResponse: (response: EasebuzzResponse) => void;
  }) => void;
}

interface EasebuzzResponse {
  status: "success" | "failure" | "userCancelled" | "dropped";
  txnid: string;
  amount: string;
  easepayid?: string;
  error_Message?: string;
  [key: string]: any;
}

interface Window {
  EasebuzzCheckout: new (key: string, env: "test" | "prod") => EasebuzzCheckoutInstance;
}
