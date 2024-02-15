import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [eye, setEye] = useState(false);

  const navigate = useNavigate();
  const updatePasswordHandler = async (e) => {
    e.preventDefault();
    const values = {
      email,
      answer,
      newPassword,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/forget-password",
        values,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <main>
        <section className="forgetSection flex items-center justify-center ">
          <div className="forgetBody  m-4 flex min-h-[70vh] w-full max-w-md items-center justify-center  rounded  pt-4">
            {/* right */}
            <div className="rightForget w-full space-y-1">
              <div className="heading flex justify-between border-b border-solid border-green-400 bg-green-300 px-2 py-4">
                <h4> Forget-Password</h4>
              </div>
              <form
                className=" space-y-3 border border-solid border-gray-400 px-3 py-2"
                onSubmit={updatePasswordHandler}
              >
                <div className="fill border-b border-black">
                  <input
                    className="w-full  border-none px-1 py-1 text-lg outline-none"
                    type="email"
                    placeholder="Enter email"
                    autoComplete="username email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="fill border-b border-black">
                  <input
                    className="w-full border-none px-1 py-1 text-lg outline-none"
                    type="text"
                    placeholder="Enter Best Friend Name"
                    autoComplete="username email"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>
                <div className="fill eye flex cursor-pointer border-b border-black">
                  <input
                    className="w-full border-none px-1 py-1 text-lg outline-none"
                    type={eye ? "text" : "password"}
                    placeholder="Enter new password"
                    autoComplete="current-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <div className="forget-btn">
                  <button
                    className="mt-4 w-full rounded bg-[#759578] py-2 text-lg font-bold text-white"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
                <div className="ifRemember mt-2 flex justify-end">
                  <p className="font-semibold">Go to ? </p>
                  <Link className="font-semibold text-blue-700" to="/login">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ForgetPassword;
