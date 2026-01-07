"use client";

import { GoogleOAuthProvider, useGoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from "axios";

const GoogleAuthButton = () => {

  const login = useGoogleLogin({
    flow: "auth-code", 
    scope: "openid profile email https://www.googleapis.com/auth/calendar.readonly",
    onSuccess: async (authCodeResponse) => {
      console.log("Auth code:", authCodeResponse.code);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        { code: authCodeResponse.code },
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onError: (err) => console.log("Google Login error:", err),
  });

  return (
    <button
      style={{ padding: "10px 20px", background:"#0F9D58", color:"#fff", border:"none", borderRadius:"6px", cursor:"pointer" }}
      onClick={() => login()}
    >
      Sign in with Google
    </button>
  );
};

export default function GoogleAuth() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <GoogleAuthButton />
    </GoogleOAuthProvider>
  );
}
