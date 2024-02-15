import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-category",
        {
          withCredentials: true,
        },
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      <main>
        <section className="mb-4 mt-4 flex  min-h-[70vh] items-center ">
          <div className="flex w-full flex-col space-y-2  px-1 md:px-3">
            {categories.map((c) => (
              <div
                key={c._id}
                className="border border-solid border-black px-2 py-2"
              >
                <Link to={`/category/${c.slug}`} className="text-lg font-bold">
                  {c.name}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Categories;
