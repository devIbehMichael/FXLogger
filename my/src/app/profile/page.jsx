"use client";
import React from "react";
import Link from 'next/link'


const Profile = () => {
  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      <p>This is the profile page. Add user-specific content here.</p>
      
      <Link href='/inputs'><button className="bg-gray-700 text-white">Get started</button></Link>
    </div>
  );
};

export default Profile;
