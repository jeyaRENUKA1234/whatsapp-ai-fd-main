"use client";

import Header from "../components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import"../styles/globals.scss";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <html lang="en">
        <body>
          {/* <Header /> */}
          {children}
          <Toaster position="top-right" />
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}
