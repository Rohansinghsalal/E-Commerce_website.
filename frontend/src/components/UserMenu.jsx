import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <main>
      <section>
        <div className="absolute right-0">
          <div className="z-10 mr-1 flex flex-col space-y-1">
            <NavLink
              to="/dashboard/user/profile"
              className="rounded-bl-xl rounded-tl-xl border-2 border-solid border-green-400 bg-green-300 px-2 py-2 text-lg font-bold"
            >
              Profile
            </NavLink>
            {/* Have more work to do in this :) */}
            <NavLink
              to="/dashboard/user/orders"
              className="rounded-bl-xl rounded-tl-xl border-2 border-solid border-green-400 bg-green-300 px-2 py-2 text-lg font-bold"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserMenu;
