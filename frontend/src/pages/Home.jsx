import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useNavigate } from "react-router-dom";
import { setCart } from "../redux/features/cartSlice.js";
import { toast } from "react-hot-toast";
import LayoutNotFooter from "../components/Layout/LayoutNotFooter.jsx";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCart4 } from "react-icons/bs";

const Home = () => {
  const { auth } = useSelector((state) => state.auths);
  const { user } = useSelector((state) => state.users);

  const navigate = useNavigate();
  // We have made functions for filters in the backend (new request)
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); // Array because multiple values can be checked
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1); // One page contains 6 products (backend)
  const [loading, setLoading] = useState(false);
  const [showCategoryFilters, setShowCategoryFilters] = useState(false);
  const [showPriceFilters, setShowPriceFilters] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [filterByPrice, setFilterByPrice] = useState([]);

  // Add to cart button
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);

  // Getting all categories in initial time, therefore, useEffect
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-category",
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Getting all products - in initial time, therefore, useEffect
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        setLoading(false);
        setProducts(res.data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get total count - initial time, therefore, useEffect below
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/product-count",
        {
          withCredentials: true,
        },
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect for loading more products
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more - useEffect is above
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`,
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by categories and prices (for prices filter, check >components>prices.jsx)
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/products/product-filters",
        {
          checked,
          radio,
        },
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial loading
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // For filter products
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // Fetch all categories and total count
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Apply category filter
  const applyCategoryFilter = () => {
    setFilterByCategory([...checked]);
    setShowCategoryFilters(false);
    filterProduct();
  };

  // Apply price filter
  const applyPriceFilter = () => {
    setFilterByPrice([...radio]);
    setShowPriceFilters(false);
    filterProduct();
  };

  return (
    <LayoutNotFooter>
      <main>
        <section className=" flex min-h-[70vh] w-full">
          <section className=" pt-4 md:w-1/4">
            <div className=" hidden  bg-white md:flex md:flex-col">
              <h4 className="mb-2 px-2 text-lg font-semibold">Apply Filters</h4>
              <div className="px-2">
                <h1 className="mb-2 mt-3 text-center text-xl font-semibold md:text-2xl">
                  Category
                </h1>
                <div className="flex flex-col space-y-2">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      checked={checked.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div className="px-2">
                <h1 className="mb-2 mt-3 text-center text-2xl font-semibold md:text-2xl">
                  Price
                </h1>
                <div>
                  <Radio.Group
                    onChange={(e) => setRadio(e.target.value)}
                    className="flex flex-col space-y-2"
                  >
                    {Prices?.map((price) => (
                      <div key={price._id}>
                        <Radio
                          value={price.array}
                          checked={radio.includes(price.array)}
                        >
                          {price.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-4 md:w-full">
            <div className="mx-2 mb-4 rounded  bg-white px-1 py-4">
              <h1 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-3xl">
                All Products
              </h1>
              <div className="products grid w-full grid-cols-2   px-4 py-2  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6">
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
              {products && products.length < total && (
                <button
                  className="mt-4 rounded bg-yellow-400 px-3 py-2 font-semibold text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Load More"}
                </button>
              )}
            </div>
          </section>
        </section>

        {/* Sticky Buttons */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-between space-x-4 bg-white p-4 md:hidden">
          <div className="relative">
            {showCategoryFilters ? (
              <div className="absolute bottom-12 flex flex-col space-y-2  bg-blue-400 px-2 py-1 text-white">
                {categories?.map((c) => (
                  <Checkbox
                    className="w-full text-white"
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    checked={checked.includes(c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            ) : null}
            <button
              className="rounded border-none bg-blue-500  px-2 py-2 font-semibold text-white"
              onClick={() => setShowCategoryFilters(!showCategoryFilters)}
            >
              Filter by Category
            </button>
          </div>
          <div className="relative">
            {showPriceFilters ? (
              <div className="absolute bottom-12 flex flex-col  bg-blue-400 px-4 py-1 text-white">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  className="space-y-2 "
                >
                  {Prices?.map((price) => (
                    <div key={price._id}>
                      <Radio
                        className="text-white"
                        value={price.array}
                        checked={radio.includes(price.array)}
                      >
                        {price.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            ) : null}
            <button
              className="rounded border-none bg-blue-500 px-4 py-2 font-semibold text-white"
              onClick={() => setShowPriceFilters(!showPriceFilters)}
            >
              Filter by Price
            </button>
          </div>
        </div>
      </main>
    </LayoutNotFooter>
  );
};

export default Home;
