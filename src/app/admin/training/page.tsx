"use client";

import { useState } from "react";

export default function TrainingKnowledgeAdmin() {
  const [documents, setDocuments] = useState<File[]>([]);
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [sops, setSops] = useState<File[]>([]);
  const [version, setVersion] = useState("");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "doc" | "sop"
  ) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    if (type === "doc") setDocuments(prev => [...prev, ...filesArray]);
    if (type === "sop") setSops(prev => [...prev, ...filesArray]);
  };

  const addFaq = () => {
    setFaqs(prev => [...prev, { question: "", answer: "" }]);
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const handleSubmit = () => {
    console.log({ documents, faqs, sops, version });
    alert("Training data submitted! (Connect API to save)");
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow p-4 sm:p-6 lg:p-8 space-y-6">

        <h2 className="text-xl sm:text-2xl font-bold text-[#3b82f6]">
          Training & Knowledge
        </h2>

        {/* ===== Upload Documents ===== */}
        <div className="space-y-2">
          <label className="font-bold text-black">Upload Documents</label>

          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e, "doc")}
            className="border border-black p-2 rounded w-full text-black"
          />

          {documents.length > 0 && (
            <ul className="mt-1 text-sm text-purple-700 max-h-24 overflow-y-auto">
              {documents.map((doc, idx) => (
                <li key={idx}>{doc.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== FAQs Section ===== */}
        <div className="space-y-3">
          <label className="font-bold text-black">FAQs</label>

          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-3 grid gap-3"
            >
              <input
                type="text"
                placeholder="Question"
                value={faq.question}
                onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                className="border border-black p-2 rounded w-full"
              />

              <textarea
                placeholder="Answer"
                value={faq.answer}
                onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                className="border border-black p-2 rounded w-full min-h-[60px]"
              />
            </div>
          ))}

         
        </div>
         <button
            onClick={addFaq}
            className="px-4 py-2  bg-[#3b82f6] text-white rounded hover:bg-[#3b82f6] w-full sm:w-auto"
          >
            Add FAQ
          </button>

        {/* ===== SOP Upload ===== */}
        <div className="space-y-2">
          <label className="font-bold text-black">Add SOPs</label>

          <input
            type="file"
            multiple
            onChange={(e) => handleFileUpload(e, "sop")}
            className="border border-black p-2 rounded w-full"
          />

          {sops.length > 0 && (
            <ul className="mt-1 text-sm text-purple-700 max-h-24 overflow-y-auto">
              {sops.map((sop, idx) => (
                <li key={idx}>{sop.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== Version Control ===== */}
        <div className="space-y-2">
          <label className="font-bold text-black">Version</label>

          <input
            type="text"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="border border-black p-2 rounded w-full"
            placeholder="Enter version (e.g., v1.0)"
          />
        </div>

        {/* ===== Submit Button ===== */}
        <div className="flex flex-col sm:flex-row justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
