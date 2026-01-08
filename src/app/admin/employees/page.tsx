"use client";
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

type AIEmployee = {
  id: number;
  name: string;
  role: string;
  status: "online" | "offline";
  conversationsToday: number;
  tasksCompleted: number;
};

export default function AIEmployeesTable() {
  const [employees, setEmployees] = useState<AIEmployee[]>([
    { id: 1, name: "Alpha Bot", role: "Secretary", status: "online", conversationsToday: 18, tasksCompleted: 42 },
    { id: 2, name: "Sales Genie", role: "Sales", status: "offline", conversationsToday: 6, tasksCompleted: 15 },
    { id: 3, name: "Ops Master", role: "Sales", status: "online", conversationsToday: 12, tasksCompleted: 27 },
    { id: 4, name: "Support Buddy", role: "Customer Support", status: "online", conversationsToday: 24, tasksCompleted: 53 },
    { id: 5, name: "Deal Closer", role: "Secretary", status: "offline", conversationsToday: 3, tasksCompleted: 9 },
  ]);

  function handleEdit(id: number) {}
  function handleDelete(id: number) {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    languages: [] as string[],
    platforms: [] as string[],
    permissions: [] as string[],
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowForm(false);
  }

  function handleCheckbox(field: keyof typeof form, value: string) {
    setForm(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value],
    }));
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-10">

      <div className="bg-gray-100 rounded-2xl shadow p-4 sm:p-6 space-y-4">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl text-black font-bold">
            AI Employees Overview
          </h2>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg shadow
            bg-[#3b82f6] text-white font-medium hover:bg-blue-700 active:scale-[0.98]"
          >
            <FiPlus size={18} /> Add
          </button>
        </div>

        {/* MODAL FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-5 w-full max-w-sm sm:max-w-md relative">

              <button onClick={() => setShowForm(false)} className="absolute top-4 right-4">
                <FiX size={20} />
              </button>

              <h2 className="text-lg font-bold text-black mb-4">
                Create New AI Employee
              </h2>

              <form onSubmit={handleSubmit} className="grid gap-3">

                <input
                  className="border rounded p-2 text-black"
                  placeholder="Employee Name"
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <select
                  className="border rounded p-2 text-black"
                  onChange={e => setForm({ ...form, role: e.target.value })}
                >
                  <option>Select Role</option>
                  <option>Secretary</option>
                  <option>Sales</option>
                  <option>Operations</option>
                </select>

                {/* Languages */}
                <div>
                  <p className="font-medium text-black">Languages</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["English", "Tamil", "Hindi"].map(lang => (
                      <label key={lang} className="flex gap-1 text-black">
                        <input
                          type="checkbox"
                          checked={form.languages.includes(lang)}
                          onChange={() => handleCheckbox("languages", lang)}
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <p className="font-medium text-black">Platforms</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["WhatsApp", "Web", "CRM"].map(p => (
                      <label key={p} className="flex gap-1 text-black">
                        <input
                          type="checkbox"
                          checked={form.platforms.includes(p)}
                          onChange={() => handleCheckbox("platforms", p)}
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <p className="font-medium text-black">Permissions</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["Read", "Write", "Execute"].map(p => (
                      <label key={p} className="flex gap-1 text-black">
                        <input
                          type="checkbox"
                          checked={form.permissions.includes(p)}
                          onChange={() => handleCheckbox("permissions", p)}
                        />
                        {p}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2  bg-[#3b82f6] text-white px-5 py-2 rounded w-full"
                >
                  Create Employee
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="grid gap-3 lg:hidden">
          {employees.map(emp => (
            <div key={emp.id} className="bg-white rounded-xl p-4 shadow">

              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#3b82f6]">{emp.name}</h3>

                <span className={`px-3 py-1 rounded-full text-sm
                  ${emp.status === "online"
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-300 text-gray-700"}`}>
                  {emp.status}
                </span>
              </div>

              <p className="text-black font-semibold">{emp.role}</p>

              <div className="grid grid-cols-2 mt-2 text-sm text-black">
                <p>Conversations: <b>{emp.conversationsToday}</b></p>
                <p>Tasks: <b>{emp.tasksCompleted}</b></p>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(emp.id)}
                  className="px-3 py-2 rounded bg-blue-600 text-white w-full"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(emp.id)}
                  className="px-3 py-2 rounded bg-red-600 text-white w-full"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ===== DESKTOP TABLE VIEW (NO TABLET) ===== */}
        <div className="hidden lg:block overflow-x-auto rounded-xl">
          <table className="w-full bg-white rounded-xl">
            <thead className=" bg-[#3b82f6] rounded-t-xl">
              <tr>
                <th className="p-3 text-left text-white text-lg">Name</th>
                <th className="p-3 text-left text-white text-lg">Role</th>
                <th className="p-3 text-left text-white text-lg">Status</th>
                <th className="p-3 text-center text-white text-lg">Conversations</th>
                <th className="p-3 text-center text-white text-lg">Tasks</th>
                <th className="p-3 text-center text-white text-lg">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-t">
                  <td className="p-3 font-medium text-[#3b82f6]">{emp.name}</td>
                  <td className="p-3 text-black font-bold">{emp.role}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm
                      ${emp.status === "online"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-300 text-gray-700"}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="p-3 text-center text-black">{emp.conversationsToday}</td>
                  <td className="p-3 text-center text-black">{emp.tasksCompleted}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(emp.id)}
                      className="px-3 py-1 rounded bg-green-600 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
