import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [adminSideBar, setAdminSideBar] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/get-all-product",
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method-initial time mei products
  useEffect(() => {
    getAllProducts();
  }, []);

  //   show admin side bar
  const showAdminSideBar = () => {
    setAdminSideBar(!adminSideBar);
  };
  return (
    <Layout>
      <main>
        <section className="productsBody mb-6 min-h-[70vh]">
          <div className="productsDiv">
            <div className="mb-4">
              <div className="font-progress mt-4 flex  justify-end px-2 text-2xl">
                <RxHamburgerMenu
                  className="cursor-pointer"
                  onClick={showAdminSideBar}
                />
              </div>
              {adminSideBar ? <AdminMenu /> : null}
            </div>
            <div className="rightProducts mx-1 ">
              <h1 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-3xl">
                All Products
              </h1>
              <div className="products grid grid-cols-2 gap-y-2  px-1 py-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    // finding on bases of slug as in backend
                    // should match in App.jsx
                    className="productLink "
                    to={`/dashboard/admin/product/${p.slug}`}
                  >
                    <div className="productBox   ">
                      <img
                        className="productImg h-48 w-full "
                        src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                        alt={p.name}
                      />
                      <div className="productAbout px-2">
                        <h5 className="productName  text-lg font-semibold">
                          {p.name}
                        </h5>
                        <p className="productDescription text-sm">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Products;
