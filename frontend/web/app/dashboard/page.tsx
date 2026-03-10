"use client";

import { useEffect, useState } from "react";
import API from "../../src/lib/api";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [colleges, setColleges] = useState<any[]>([]);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const loadData = async () => {
      try {
        const userRes = await API.get("/users/me", { headers });
        setUser(userRes.data);

        const recRes = await API.get("/recommendations", { headers });
        setColleges(recRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, []);

  const saveCollege = async (collegeId: number) => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      await API.post(
        "/saved-colleges",
        { collegeId },
        { headers }
      );

      alert("College saved!");
    } catch (err) {
      alert("Failed to save college");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-50">

      <h1 className="text-3xl font-bold mb-6 text-black">
        Dashboard
      </h1>
      <div className="flex gap-4 mb-8">

        <a
           href="/colleges"
           className="px-5 py-2 bg-black text-white rounded-lg hover:bg-blue-700"
        >
           Search Colleges
        </a>

        <a
           href="/saved"
           className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Saved Colleges
        </a>

      </div>
      {user && (
        <p className="mb-8 text-lg">
          Welcome <b>{user.email}</b>
        </p>
      )}

      <h2 className="text-2xl mb-4">
        Recommended Colleges
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {colleges.map((college) => (
          <div
            key={college.id}
            className="p-6 bg-white border rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold">
              {college.name}
            </h3>

            <p className="text-gray-600">
              Location: {college.location}
            </p>

            <p className="text-gray-600">
              Ranking: {college.ranking}
            </p>

            <p className="text-gray-600">
              Fees: {college.fees}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {college.reason}
            </p>

            <button
              onClick={() => saveCollege(college.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save College
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}