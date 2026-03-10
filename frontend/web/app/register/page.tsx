"use client";

import { useState } from "react";
import API from "../../src/lib/api";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/auth/register", {
        email,
        password
      });

      alert("Registration successful");
      window.location.href = "/login";

    } catch (err: any) {

         console.log(err.response?.data);
         alert(JSON.stringify(err.response?.data));

}

  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="p-8 border rounded-lg w-80">

        <h2 className="text-2xl mb-6">Register</h2>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
          <a href="/login" className="text-blue-600">
             Login
           </a>
        </p>
      </div>

    </div>
  );
}