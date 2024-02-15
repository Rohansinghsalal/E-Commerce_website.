import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <>
      <main>
        <section className="adminMenuBody">
          <div className="leftAdminDashboard absolute right-0">
            <div className="adminMenuDiv z-10 mr-1 flex flex-col space-y-1">
              <NavLink
                to="/dashboard/admin/create-category"
                className="rounded-bl-xl rounded-tl-xl border-2 border-solid border-green-400 bg-green-300 px-2 py-2 text-lg font-bold"
              >
                Create Category
              </NavLink>
              <NavLink
                to="/dashboard/admin/create-product"
                className="rounded-bl-xl rounded-tl-xl border-2 border-solid border-gray-400 bg-green-300 px-2 py-2 text-lg font-bold"
              >
                Create Product
              </NavLink>
              <NavLink
                to="/dashboard/admin/products"
                className="rounded-bl-xl rounded-tl-xl border-2 border-solid border-gray-400 bg-green-300 px-2 py-2 text-lg font-bold"
              >
                Products
              </NavLink>
              <NavLink
                to="/dashboard/admin/orders"
                className="rounded-bl-xl rounded-tl-xl border-2 border-solid border-gray-400 bg-green-300 px-2 py-2 text-lg font-bold"
              >
                Orders
              </NavLink>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminMenu;
