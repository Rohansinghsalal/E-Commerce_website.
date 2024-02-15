import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useSelector } from "react-redux";
import axios from "axios";
import { Select } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";

const AdminOrders = () => {
  const [adminSideBar, setAdminSideBar] = useState(false);

  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const { auth } = useSelector((state) => state.auths);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/users/all-orders",
        {
          withCredentials: true,
        },
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth) getOrders();
  }, [auth]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/users/order-status/${orderId}`,
        {
          status: value,
        },
        {
          withCredentials: true,
        },
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  //   show admin side bar
  const showAdminSideBar = () => {
    setAdminSideBar(!adminSideBar);
  };

  return (
    <Layout>
      <main>
        <section className="min-h-[70vh]">
          <div className="row dashboard">
            <div className="mb-4">
              <div className="font-progress mt-4 flex justify-end px-2 text-2xl">
                <RxHamburgerMenu
                  className="cursor-pointer"
                  onClick={showAdminSideBar}
                />
              </div>
              {adminSideBar ? <AdminMenu /> : null}
            </div>
            <div className="col-md-9">
              <h1 className="mb-4 text-center text-2xl font-semibold">
                All Orders
              </h1>
              {orders?.map((o, i) => {
                return (
                  <div
                    key={o._id}
                    className="mb-4 overflow-x-auto rounded-lg border-b-2 border-solid border-black bg-white shadow"
                  >
                    <table className="w-full table-fixed">
                      <thead>
                        <tr>
                          <th className="w-1/6">No</th>
                          <th className="w-1/6">Status</th>
                          <th className="w-1/6">Buyer</th>
                          <th className="w-1/6">Date</th>
                          <th className="w-1/6">Payment</th>
                          <th className="w-1/6">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2">{i + 1}</td>
                          <td className="px-4 py-2">
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Select.Option key={i} value={s}>
                                  {s}
                                </Select.Option>
                              ))}
                            </Select>
                          </td>
                          <td className="px-4 py-2">{o?.buyer?.name}</td>
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
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AdminOrders;
