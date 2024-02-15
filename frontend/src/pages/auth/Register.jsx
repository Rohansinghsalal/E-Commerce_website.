import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse, isAuthTrue } from "../../redux/features/authSlice";
import { loadingFalse, loadingTrue } from "../../redux/features/loadingSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  // eye show password
  const [eye, setEye] = useState(false);

  const { auth } = useSelector((state) => state.auths);
  const { user } = useSelector((state) => state.users);
  const { load } = useSelector((state) => state.loads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(loadingTrue());
    try {
      const values = {
        name,
        email,
        password,
        phone,
        address,
        answer,
      };
      dispatch(loadingTrue());
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/register",
        values,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        dispatch(loadingFalse());
        dispatch(isAuthTrue());
        toast.success(res.data.message);
        navigate("/");
      } else {
        dispatch(isAuthFalse());
        dispatch(loadingFalse());
      }
    } catch (error) {
      dispatch(isAuthFalse());
      console.log(error.response.data.message);
    }
  };

  return (
    <Layout>
      <main>
        <section className="registerBody flex items-center justify-center border border-dotted border-black md:mb-4">
          <div className="border-1 m-4 flex  min-h-[70vh] w-full  max-w-md items-center   justify-center  rounded  pt-4">
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
              <div className="registerDiv">
                {/* right register */}
                <div className="rightRegister space-y-1">
                  <div className="heading flex justify-between border-b border-solid border-green-400 bg-green-300 px-2 py-4">
                    {/* <h3>Sign-up</h3> */}
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
                    onSubmit={registerHandler}
                  >
                    <div className="fill border-b border-black">
                      <input
                        className="w-full  border-none px-1 py-1 text-lg outline-none"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        autoComplete="username email"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="fill border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type="email"
                        placeholder="Enter your valid email"
                        autoComplete="username email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="fill eye flex cursor-pointer border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type={eye ? "text" : "password"}
                        placeholder="Enter the password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <i
                        className="flex items-center justify-center px-2 text-lg font-bold"
                        onClick={() => {
                          setEye(!eye);
                        }}
                      >
                        {eye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                      </i>
                    </div>
                    <div className="fill border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type="text"
                        placeholder="Enter your phone number"
                        autoComplete="username email"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="fill border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type="text"
                        placeholder="Enter the permanent address"
                        autoComplete="username email"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="fill border-b border-black">
                      <input
                        className="w-full border-none px-1 py-1 text-lg outline-none"
                        type="text"
                        placeholder="Your best friend name"
                        autoComplete="username email"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                      />
                    </div>
                    {/* Button  */}
                    <div className="">
                      <button
                        className="mt-4 w-full rounded bg-[#759578] py-2 text-lg font-bold text-white"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <div className="ifUser mt-2 flex justify-end">
                      <p className="font-semibold">Already a user? </p>
                      <Link
                        className="font-semibold text-blue-700"
                        to={"/login"}
                      >
                        Login
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

export default Register;
