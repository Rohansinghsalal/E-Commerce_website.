import React, { useEffect, useState } from "react";
import UserMenu from "../../components/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/features/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";

const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);
  const { user } = useSelector((state) => state.users);

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [userSideBar, setUserSideBar] = useState(false);

  // Get user data on initial load
  useEffect(() => {
    const { email, name, phone, address } = user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [user]);

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8080/api/v1/users/update-profile",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          withCredentials: true,
        },
      );
      const isSuccessful = res.data.success;
      if (isSuccessful) {
        dispatch(setUser(res.data.updatedUser));
        toast.success(res.data.message);
      } else {
        toast.error("Profile not updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // user side bar
  const showUserSideBar = () => {
    setUserSideBar(!userSideBar);
  };
  return (
    <Layout title={"Your Profile"}>
      <main>
        <section className=" mb-4 min-h-[70vh] md:mb-8">
          <div>
            <div className="mb-4 ">
              <div className="font-progress mt-4 flex  justify-end px-2 text-2xl">
                <RxHamburgerMenu
                  className="cursor-pointer"
                  onClick={showUserSideBar}
                />
              </div>
              {userSideBar ? <UserMenu /> : null}
            </div>
            <div className="mx-1 flex min-h-[70vh] items-center justify-center">
              <div className="w-full max-w-md ">
                <h4 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-3xl">
                  USER PROFILE
                </h4>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-2 border-2 border-solid border-black px-2 py-2"
                >
                  <div className="border-2 border-solid border-black ">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-1 py-2 text-lg outline-none"
                      placeholder="Enter Your Name"
                      autoFocus
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-1 py-2 text-lg outline-none"
                      placeholder="Enter Your Email"
                      disabled
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-1 py-2 text-lg outline-none"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-1 py-2 text-lg outline-none"
                      placeholder="Enter Your Phone"
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-1 py-2 text-lg outline-none"
                      placeholder="Enter Your Address"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Profile;
