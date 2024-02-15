import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../redux/features/cartSlice";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths); // for checking login
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.carts);

  const navigate = useNavigate();

  // payment
  // get token
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      // for removing first storing
      let myCart = [...cart]; // store all products
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1); // removing (index, posn')
      dispatch(setCart(myCart)); // newly added cart
      // as in above deleting from database not from localStorage so
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // initial time mei taaki refresh krne mei hate na
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) dispatch(setCart(JSON.parse(existingCartItem)));
  }, []);

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/braintree/token",
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  // getting this in initial time
  useEffect(() => {
    getToken();
  }, [auth]);

  //handle payments-see docs
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/products/braintree/payment",
        {
          nonce,
          cart,
        },
        { withCredentials: true },
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <main>
        <section>
          <div className="container mx-auto px-2 py-2">
            <div className="rounded-lg bg-white p-2 shadow-lg">
              <h1 className="text-3xl font-semibold">{`Hello, ${
                auth && user?.name
              }`}</h1>
              <h4 className="mt-2 text-lg">
                {cart?.length
                  ? `You have ${cart.length} items in your cart ${
                      auth ? "" : "please login to checkout"
                    }`
                  : " Your Cart Is Empty"}
              </h4>
            </div>
            <div className="mt-4 flex flex-col md:flex-row">
              <div className="pr-4 md:w-2/3">
                {cart?.map((p) => (
                  <div key={p._id} className="mb-4 rounded-lg bg-white p-4 ">
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                        className="mr-4 h-24 w-24 object-cover"
                        alt={p.name}
                      />
                      <div>
                        <p className="text-xl font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-500">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="text-lg font-semibold">
                          Price: $ {p.price}
                        </p>
                        <button
                          className="mt-2 text-red-500 hover:text-red-700"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Payment */}
              <div className="mt-8 md:mt-0 md:w-1/3">
                <div className="rounded-lg bg-white p-4 shadow-lg">
                  <h2 className="mb-4 text-xl font-semibold">Cart Summary</h2>
                  <div className="border-t border-gray-300 py-4">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-lg font-semibold">{totalPrice()}</p>
                  </div>
                  {auth?.user?.address ? (
                    <>
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">
                          Current Address
                        </h4>
                        <p className="text-sm">{auth?.user?.address}</p>
                      </div>
                      <button
                        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <div className="mt-4">
                      {auth ? (
                        <button
                          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Update Address
                        </button>
                      ) : (
                        <button
                          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please Login to Checkout
                        </button>
                      )}
                    </div>
                  )}
                  <div className="mt-4">
                    {!clientToken || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                        <button
                          className={`mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 ${
                            loading ? "cursor-not-allowed opacity-50" : ""
                          }`}
                          onClick={handlePayment}
                          disabled={loading || !instance || !user?.address}
                        >
                          {loading ? "Processing ...." : "Make Payment"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;
