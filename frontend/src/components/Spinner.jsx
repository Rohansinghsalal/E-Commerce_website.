import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
          Redirecting in {count} seconds
        </h1>
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-red-700 border-opacity-50 text-center"></div>
      </div>
    </div>
  );
};

export default Spinner;
