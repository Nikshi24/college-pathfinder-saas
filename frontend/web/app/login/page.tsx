"use client";

import { useState } from "react";
import API from "../../src/lib/api";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  try {

    const res = await API.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.access_token);

    window.location.href = "/dashboard";

  } catch (err) {

    alert("Login failed");

  }

};

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="p-8 border rounded-lg w-80">

        <h2 className="text-2xl mb-6">Login</h2>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>

      </div>

    </div>
  );
}