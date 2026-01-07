// import type { Metadata } from "next";
// import "@/styles/globals.scss";
// import ClientProviders from "./ClientProviders";
// import Header from "../components/Header";

// export const metadata: Metadata = {
//   title: "Admin Panel",
//   description: "Next.js + TypeScript + SCSS Admin Panel",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <ClientProviders>
//           <Header />
//           {children}
//         </ClientProviders>
//       </body>
//     </html>
//   );
// }
// src/app/ClientProviders.tsx
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
