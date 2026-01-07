"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function CalendarPage() {
  const { data: session } = useSession();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [date, setDate] = useState("");

  if (!session) {
    return (
      <div style={{ padding: 20, color: "white" }}>
        <h1>Please login from header to continue</h1>
      </div>
    );
  }

  // Slot Picker Functions...
  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Welcome, {session.user?.email}</h1>
      {/* Slot Picker Code */}
    </div>
  );
}
