import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useSelector } from "react-redux";
import UserMenu from "../../components/UserMenu";
import { RxHamburgerMenu } from "react-icons/rx";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.users);
  const [userSideBar, setUserSideBar] = useState(false);
  // user side bar
  const showUserSideBar = () => {
    setUserSideBar(!userSideBar);
  };
  return (
    <Layout>
      <main>
        <section>
          <div className="relative ">
            <div className="font-progress mt-4 flex  justify-end px-2 text-2xl">
              <RxHamburgerMenu
                className="cursor-pointer"
                onClick={showUserSideBar}
              />
            </div>
            {userSideBar ? <UserMenu /> : null}
          </div>
          {/* main content */}
          <div className="flex min-h-[70vh] items-center justify-center ">
            <div className="max-w-md px-4 py-4">
              <div className="mt-4 ">
                <div className="userImage ">
                  <img
                    className="rounded-t-full border-2 border-solid border-black shadow-md shadow-black"
                    src="/src/assets/hi.png"
                    alt="This is user image"
                  />
                </div>
                {/* details */}

                <div className="userDetails mt-1  space-y-2 rounded-bl-xl rounded-br-xl border-2 border-solid border-black">
                  <h3 className="border-b-2  border-solid border-black px-2 py-2 font-bold">
                    {" "}
                    User Name :{" "}
                    <span className="font-semibold"> {user.name} </span>
                  </h3>
                  <h3 className="border-b-2 border-solid border-black px-2 py-2 font-bold">
                    {" "}
                    User Email :{" "}
                    <span className="font-semibold"> {user.email} </span>
                  </h3>
                  <h3 className="px-2 py-2 font-bold">
                    {" "}
                    User Contact :{" "}
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

export default UserDashboard;
