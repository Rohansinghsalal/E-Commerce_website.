import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const PagenotFound = () => {
  return (
    <Layout>
      <main>
        <section className="flex min-h-[70vh] flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-red-600">404</h1>
          <h2 className="my-4 text-2xl font-semibold text-gray-800">
            Oops! Page Not Found
          </h2>
          <Link
            to="/"
            className="rounded-full bg-blue-500 px-4 py-2 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Go Back
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default PagenotFound;
