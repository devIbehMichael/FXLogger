"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../firebase/firebaseConfig";
import Link from 'next/link'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    signIn(email, password, router);
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={handleSignIn}>Login</button>
    </div>
  );
};

export default Login;
