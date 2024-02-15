import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { BsCart4 } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/features/cartSlice.js";

const ProductDetails = () => {
  const { auth } = useSelector((state) => state.auths);
  // Add to cart button
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.carts);

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({}); // single product rahega iss lia object
  const [relatedProducts, setRelatedProducts] = useState([]);

  //inital product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/get-product/${params.slug}`,
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/products/related-product/${pid}/${cid}`,
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <main>
        <section className="mb-4 mt-4 min-h-[70vh] w-full">
          <div className="gird mb-4  grid px-4  py-2 sm:grid-cols-2 ">
            <div className="flex justify-center ">
              {product && product._id && (
                <img
                  src={`http://localhost:8080/api/v1/products/product-photo/${product._id}`}
                  className="h-60 w-56 rounded  text-center "
                  alt={product.name}
                />
              )}
            </div>
            {/* product details */}
            <div className="flex flex-col  justify-center  space-y-2 ">
              <h1 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-start md:text-3xl">
                Product Details
              </h1>
              <h6 className="text-lg font-semibold">
                Name :
                <span className="text-lg font-semibold"> {product.name}</span>
              </h6>
              <h6 className="text-lg font-semibold">
                Description : {product.description}
              </h6>
              <h6 className="text-lg font-semibold">
                Price :{" "}
                <span className="text-lg font-semibold">{product.price}</span>
              </h6>
              <h6 className="text-lg font-semibold">
                Category :
                <span className="text-lg font-semibold">
                  {" "}
                  {product?.category?.name}
                </span>
              </h6>
              <button className="w-2/4  rounded border border-solid border-blue-500 bg-blue-500 py-2 text-lg  font-semibold text-white ">
                ADD TO CART
              </button>
            </div>
          </div>
          <hr className="border-black" />
          <div className="">
            <h6 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-3xl">
              Similar Products
            </h6>
            {relatedProducts.length < 1 && (
              <p className="">No Similar Products found</p>
            )}
            <div className="products grid w-full grid-cols-2   px-4 py-2  sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-6">
              {relatedProducts?.map((p) => (
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
        </section>
      </main>
    </Layout>
  );
};

export default ProductDetails;
