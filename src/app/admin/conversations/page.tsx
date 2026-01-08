"use client";

import { useState } from "react";

type Chat = {
  id: number;
  customer: string;
  aiEmployee: string;
  message: string;
  status: "AI" | "Escalated" | "Human";
};

const AI_EMPLOYEES = ["Secretary", "SalesBot", "OperationsBot"];

export default function LiveChatsAdmin() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, customer: "John", aiEmployee: "SalesBot", message: "Hello!", status: "AI" },
    { id: 2, customer: "Mary", aiEmployee: "Secretary", message: "Need help", status: "AI" },
    { id: 3, customer: "Alex", aiEmployee: "OperationsBot", message: "Order issue", status: "AI" },
  ]);

  const [filter, setFilter] = useState<string>("");

  const filteredChats = filter ? chats.filter(c => c.aiEmployee === filter) : chats;

  const handleHumanTakeover = (id: number) => {
    setChats(prev =>
      prev.map(chat => (chat.id === id ? { ...chat, status: "Human" } : chat))
    );
  };

  const handleEscalation = (id: number) => {
    setChats(prev =>
      prev.map(chat => (chat.id === id ? { ...chat, status: "Escalated" } : chat))
    );
  };

  return (
    <div className="p-6 bg-gray-200 rounded-xl shadow space-y-4">

      {/* HEADER */}
      <h2 className="text-xl text-black font-bold">Live Chats</h2>

      {/* FILTER SECTION */}
      <div className="flex flex-wrap gap-3 items-center">
        <label className="font-medium text-[#3b82f6]">
          Filter by AI Employee:
        </label>

        <select
          className="border text-black border-gray-300 rounded p-2 min-w-[140px]"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">All</option>
          {AI_EMPLOYEES.map(ai => (
            <option key={ai} value={ai}>
              {ai}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 md:hidden">
        {filteredChats.map(chat => (
          <div
            key={chat.id}
            className="bg-white rounded-xl p-4 shadow border"
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-blue-600">{chat.customer}</h3>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  chat.status === "AI"
                    ? "bg-green-200 text-green-800"
                    : chat.status === "Escalated"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {chat.status}
              </span>
            </div>

            <p className="text-black mt-1 font-medium">
              AI: {chat.aiEmployee}
            </p>

            <p className="text-gray-700 mt-1">
              {chat.message}
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-3 flex flex-col gap-2">
              {chat.status === "AI" && (
                <>
                  <button
                    onClick={() => handleEscalation(chat.id)}
                    className="px-3 py-2 rounded bg-yellow-500 text-white"
                  >
                    Escalate
                  </button>

                  <button
                    onClick={() => handleHumanTakeover(chat.id)}
                    className="px-3 py-2 rounded bg-red-600 text-white"
                  >
                    Human Takeover
                  </button>
                </>
              )}

              {(chat.status === "Escalated" || chat.status === "Human") && (
                <span className="text-gray-500 text-center">
                  No Actions Available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto rounded-xl">
        <table className="w-full border rounded-xl bg-white">
          <thead className=" bg-[#3b82f6]">
            <tr>
              <th className="p-4 text-left text-black text-lg">Customer</th>
              <th className="p-4 text-left text-black text-lg">AI Employee</th>
              <th className="p-4 text-left text-black text-lg">Message</th>
              <th className="p-4 text-left text-black text-lg">Status</th>
              <th className="p-4 text-left text-black text-lg">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredChats.map(chat => (
              <tr key={chat.id} className="hover:bg-gray-50">
                <td className="p-3 border text-black">{chat.customer}</td>
                <td className="p-3 border text-black">{chat.aiEmployee}</td>
                <td className="p-3 border text-black">{chat.message}</td>
                <td className="p-3 border text-black font-semibold">
                  {chat.status}
                </td>

                <td className="p-3 border text-center space-x-2">

                  {chat.status === "AI" && (
                    <>
                      <button
                        onClick={() => handleEscalation(chat.id)}
                        className="px-3 py-1 rounded bg-yellow-500 text-white"
                      >
                        Escalate
                      </button>

                      <button
                        onClick={() => handleHumanTakeover(chat.id)}
                        className="px-3 py-1 rounded bg-red-600 text-white"
                      >
                        Takeover
                      </button>
                    </>
                  )}

                  {(chat.status === "Escalated" || chat.status === "Human") && (
                    <span className="text-gray-500">No Actions</span>
                  )}

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
