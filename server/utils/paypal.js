import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
dotenv.config();

const environment=()=> {
  let clientId = process.env.PAYPAL_CLIENT_ID;
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

const  client=()=> {
  return new paypal.core.PayPalHttpClient(environment());
}

export default{ paypal, client};