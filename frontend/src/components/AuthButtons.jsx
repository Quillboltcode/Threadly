import React from "react";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <div className="mt-4 space-x-4">
      <Link to="/login" className="px-4 py-2 bg-white text-blue-600 border border-blue-500 rounded-md shadow hover:bg-blue-100">
        Login
      </Link>
      <Link to="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;
