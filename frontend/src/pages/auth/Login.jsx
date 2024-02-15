import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse, isAuthTrue } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);

  const loginHandler = async (e) => {
    e.preventDefault();

    const values = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        values,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        dispatch(isAuthTrue());
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error("Some error");
        dispatch(isAuthFalse());
      }
    } catch (error) {
      dispatch(isAuthFalse());
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <main>
        <section className="loginBody flex items-center justify-center md:mb-4">
          <div className="border-1 m-4 flex min-h-[70vh] w-full  max-w-md items-center justify-center rounded  pt-4">
            <div className="w-full">
              <div className="about">
                <p className="mb-4 text-center">
                  Welcome to{" "}
                  <span className="text-lg font-bold">Apni-Market</span>
                </p>
                <p className="border-1 hidden border-solid border-red-600">
                  ,India's ultimate destination for all your shopping needs.
                  Step into a world of convenience, variety, and unbeatable
                  deals that redefine the way you shop.
                </p>
              </div>
              {/* left login */}
              <div className="loginDiv">
                <div className="leftLogin hidden">
                  {/* <img src="/src/assets/Register.svg" alt="This is img" /> */}
                </div>
                {/* right login */}
                <div className="rightLogin space-y-1">
                  <div className="heading flex justify-between border-b border-solid border-green-400 bg-green-300 px-2 py-4">
                    {/* <h3>Sign-in</h3> */}
                    <div>
                      <h1>Flat $10 OFF + </h1>
                      <h1>Free Shopping</h1>
                      <h1>On First Order</h1>
                      <h1>
                        Code : <span>APNI-MARKET-10</span>
                      </h1>
                    </div>
                    <div className="w-28 border border-solid border-green-400">
                      <img
                        className="border border-solid border-green-400"
                        src="/src/assets/hi.png"
                        alt="hi img"
                      />
                    </div>
                  </div>
                  <form
                    className=" space-y-3 border border-solid border-gray-400 px-3 py-2"
                    onSubmit={loginHandler}
                  >
                    <div className="fill border-b border-black">
                      <input
                        className="w-full  border-none px-1 py-1 text-lg outline-none"
                        type="email"
                        placeholder="Enter your login email"
                        value={email}
                        autoComplete="username email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="fill eye flex border-b border-black">
                      <input
                        className="w-full  border-none px-1 py-1 text-lg outline-none"
                        type={eye ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        className="flex cursor-pointer items-center justify-center px-2 text-lg font-bold"
                        onClick={() => {
                          setEye(!eye);
                        }}
                      >
                        {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </i>
                    </div>
                    <div className="forgetPassword flex justify-end text-sm text-blue-700">
                      <Link to={"/forget-password"}>Forget Password</Link>
                    </div>
                    <div>
                      <button
                        className="mt-1 w-full rounded bg-[#759578] py-2 text-lg font-bold text-white"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <div className="notUser mt-2 flex justify-end">
                      <p className="font-semibold">New user ? </p>
                      <Link
                        className="font-semibold text-blue-700"
                        to={"/register"}
                      >
                        Register
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
