"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/google`;
  };

  return (
    <>
       <style>{`
        .header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #111;
          color: white;
        }

        .google-btn {
          background: #4285F4;
          color: white;
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 15px;
        }

        .google-btn:hover {
          background: #3263d8;
        }
          
      `}</style>
      
      <header className="header-bar">
        <h2>My App</h2>

        {pathname !="/privacy-policy"&&<Button variant="login" onClick={() => setOpen(true)}>
          Login
        </Button>}
      </header>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[500px] p-8 bg-[#121212]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Login to Continue
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please login using your Google account.
            </DialogDescription>
          </DialogHeader>

          <Button
            variant="login"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 text-lg"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google Icon"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
