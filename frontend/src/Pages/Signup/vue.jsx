import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="556107467998-nkqrnufirt554di5splr77qtmin01rt0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    /</React.StrictMode>
 
);
