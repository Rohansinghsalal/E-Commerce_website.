import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [adminSideBar, setAdminSideBar] = useState(false);

  const { user } = useSelector((state) => state.users);
  const showAdminSideBar = () => {
    setAdminSideBar(!adminSideBar);
  };
  return (
    <Layout>
      <main>
        <section className="adminDashboardBody min-h[70vh]  w-full md:mb-4 ">
          <div className="relative ">
            <div className="font-progress mt-4 flex  justify-end px-2 text-2xl">
              <RxHamburgerMenu
                className="cursor-pointer"
                onClick={showAdminSideBar}
              />
            </div>
            {adminSideBar ? <AdminMenu /> : null}
          </div>
          {/* main content */}
          <div className="flex min-h-[70vh] items-center justify-center ">
            <div className="adminDashboardDiv max-w-md px-4 py-4">
              <div className="rightAdminDashboard  mt-4 ">
                <div className="adminImage ">
                  <img
                    className="rounded-t-full border-2 border-solid border-black shadow-md shadow-black"
                    src="/src/assets/hi.png"
                    alt="This is admin image"
                  />
                </div>
                {/* details */}
                <div className="adminDetails mt-1  space-y-2 rounded-bl-xl rounded-br-xl border-2 border-solid border-black">
                  <h3 className="border-b-2  border-solid border-black px-2 py-2 font-bold">
                    {" "}
                    Admin Name :{" "}
                    <span className="font-semibold"> {user.name} </span>
                  </h3>
                  <h3 className="border-b-2 border-solid border-black px-2 py-2 font-bold">
                    {" "}
                    Admin Email :{" "}
                    <span className="font-semibold"> {user.email} </span>
                  </h3>
                  <h3 className="px-2 py-2 font-bold">
                    {" "}
                    Admin Contact :{" "}
                    <span className="font-semibold"> {user.phone} </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AdminDashboard;
