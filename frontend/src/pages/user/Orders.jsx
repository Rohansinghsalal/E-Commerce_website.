import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";

const Orders = () => {
  const { auth } = useSelector((state) => state.auths);
  const [orders, setOrders] = useState([]);
  const [userSideBar, setUserSideBar] = useState(false);

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/users/orders", {
        withCredentials: true,
      });
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) {
      getOrders();
    }
  }, []);

  // user side bar
  const showUserSideBar = () => {
    setUserSideBar(!userSideBar);
  };

  return (
    <Layout>
      <main>
        <section className="mb-4 min-h-[70vh] md:mb-8">
          <div className="">
            <div className="mb-4">
              <div className="font-progress mt-4 flex justify-end px-2 text-2xl">
                <RxHamburgerMenu
                  className="cursor-pointer"
                  onClick={showUserSideBar}
                />
              </div>
              {userSideBar ? <UserMenu /> : null}
            </div>
            <div className="w-full">
              <h1 className="mb-4 text-center text-2xl font-semibold">
                All Orders
              </h1>
              {orders?.map((o, i) => (
                <div
                  key={o._id}
                  className="mb-4 overflow-x-auto rounded-lg  bg-white shadow"
                >
                  <table className="w-full table-fixed">
                    <thead>
                      <tr>
                        <th className="w-1/5">No</th>
                        <th className="w-1/5">Status</th>
                        <th className="w-1/5">Date</th>
                        <th className="w-1/5">Payment</th>
                        <th className="w-1/5">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">{o?.status}</td>
                        <td className="px-4 py-2">
                          {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="px-4 py-2">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-4 py-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="grid grid-cols-1 p-4 md:grid-cols-3">
                    {o?.products?.map((p) => (
                      <div
                        key={p._id}
                        className="flex flex-col items-center justify-center rounded-lg border bg-white p-2 shadow"
                      >
                        <img
                          src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                          alt={p.name}
                          className="mb-2 h-24 w-24 object-cover"
                        />
                        <p className="text-center text-sm font-semibold">
                          {p.name}
                        </p>
                        <p className="text-center text-xs text-gray-500">
                          {p.description.substring(0, 30)}
                        </p>
                        <p className="text-center text-sm font-semibold">
                          Price: {p.price}
                        </p>
                      </div>
                    ))}
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

export default Orders;
