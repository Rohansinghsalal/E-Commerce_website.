import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setCart } from "../redux/features/cartSlice";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);

  const { cart } = useSelector((state) => state.carts);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-category/${params.slug}`,
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <main>
        <section className="mb-4 mt-4 min-h-[70vh] w-full">
          <div className="">
            <h4 className="text-center text-lg font-semibold">
              Category - {category?.name}
            </h4>
            <h6 className="text-center text-lg font-semibold">
              {products?.length} result found{" "}
            </h6>
            <div className="">
              <div className="">
                <div className="products grid w-full grid-cols-2  px-4 py-2  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6">
                  {products?.map((p) => (
                    <div
                      key={p._id}
                      className="flex flex-col justify-between  bg-white px-2 py-2"
                    >
                      <div>
                        <img
                          src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                          alt={p.name}
                          className="h-40 w-full overflow-hidden "
                        />
                        <div className="flex flex-col justify-between px-3">
                          <div className="flex flex-col ">
                            <h5 className=" font-semibold">{p.name}</h5>
                            <p className="text-sm text-gray-500">
                              {p.description.substring(0, 100)}...
                            </p>
                            <p className="mt-2 text-lg font-semibold">
                              $ {p.price}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* button */}
                      <div className="mb-1 flex justify-between">
                        <button
                          className="mt-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          <FiMoreHorizontal />
                        </button>
                        <button
                          className="mt-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                          onClick={() => {
                            if (auth) {
                              dispatch(setCart([...cart, p]));
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p]),
                              );
                              toast.success("Item added to cart");
                            } else {
                              toast.error("Login first to add");
                            }
                          }}
                        >
                          <BsCart4 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CategoryProduct;
