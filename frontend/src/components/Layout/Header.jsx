import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthFalse } from "../../redux/features/authSlice";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/features/userSlice";
// import { Badge } from "antd";
import { setCart } from "../../redux/features/cartSlice";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";

// import useCategory from "../../hooks/useCategory";
const Header = () => {
  const [menu, setMenu] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [showCat, setShowCat] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auths);
  const { user } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.carts);
  let len = cart.length;

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // get all categoris
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-category",
        {
          withCredentials: true,
        },
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // logout handler
  const logoutHandler = async (e) => {
    e.preventDefault();
    console.log("logout handlre");
    try {
      const res = await axios.get("http://localhost:8080/api/v1/users/logout", {
        withCredentials: true,
      });
      const isSucc = res.data.success;
      if (isSucc) {
        dispatch(isAuthFalse());
        dispatch(setUser({}));
        dispatch(setCart([]));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // show menu menu
  const showMenu = () => {
    setMenu(!menu);
  };
  // show drop menu
  const dropdown = () => {
    setShowDrop(!showDrop);
  };
  // show categories menu
  const dropCategory = () => {
    setShowCat(!showCat);
  };
  return (
    <main>
      <section className="headerSection sticky  w-full  bg-white shadow-sm shadow-black">
        <div className="headerDiv flex items-center justify-between border-b border-black px-4 py-3">
          <div className="relative md:hidden">
            <div
              className="flex space-x-4 text-2xl font-bold  "
              onClick={showMenu}
            >
              <RxHamburgerMenu />
              <LuSearch />
            </div>
            {menu ? (
              <div className="absolute -left-4 top-9 z-10 border  border-dotted border-green-400 bg-green-300 ease-in-out md:hidden">
                <ul className="flex w-screen justify-around py-3 font-semibold">
                  <li>
                    <Link className="text-lg" to={"/"}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="text-lg" to={"/about"}>
                      About Us
                    </Link>
                  </li>
                  <li className="">
                    <div className="flex">
                      <Link className="text-lg" to={"/categories"}>
                        Categories
                      </Link>
                      <i className="flex items-center justify-center">
                        <RiArrowDropDownLine onClick={dropCategory} />
                      </i>
                    </div>
                    {showCat ? (
                      <ul className="dropdown-menu absolute z-10 border border-t-0  border-solid border-green-400 bg-green-300 py-2 font-bold text-black">
                        <li className="border-b border-solid border-black py-2 text-sm">
                          <Link className="" to={"/categories"}>
                            All Categories
                          </Link>
                        </li>
                        {categories?.map((c) => (
                          <li
                            key={c._id}
                            className="border-b border-solid border-black py-2 text-sm"
                          >
                            <Link to={`/category/${c.slug}`}>{c.name}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                  <li>
                    {/* <Badge count={len} showZero> */}
                    <NavLink to={"/cart"} className={"nav-link text-lg"}>
                      Cart({len})
                    </NavLink>
                    {/* </Badge> */}
                  </li>
                </ul>
              </div>
            ) : null}
          </div>

          <div className="  flex space-x-12 text-xl font-bold md:text-lg">
            <Link
              to={"https://nickeynb.github.io/PortfolioNitin/"}
              target="_blank"
            >
              Apni market
            </Link>
            <i className="hidden  md:flex md:items-center md:justify-center ">
              <LuSearch />
            </i>
          </div>
          {/* </div> */}
          <nav className="midHeader hidden md:inline-block md:w-3/5">
            <ul className="flex w-full justify-between text-lg">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About Us</Link>
              </li>
              <li className="relative">
                <div className="flex">
                  <Link className="nav-link" to={"/categories"}>
                    Categories
                  </Link>
                  <i className="flex cursor-pointer items-center">
                    <RiArrowDropDownLine onClick={dropCategory} />
                  </i>
                </div>
                {showCat ? (
                  <ul className="dropdown-menu absolute z-10 border border-t-0  border-solid border-green-400 bg-green-300 py-2 font-bold text-black">
                    <li className="border-b border-solid border-black py-2 text-sm">
                      <Link className="" to={"/categories"}>
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li
                        key={c._id}
                        className="border-b border-solid border-black py-2 text-sm"
                      >
                        <Link className="w-full" to={`/category/${c.slug}`}>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
              <li>
                {/* <Badge count={len} showZero> */}
                <NavLink to={"/cart"} className={"nav-link text-lg"}>
                  Cart({len})
                </NavLink>
                {/* </Badge> */}
              </li>
            </ul>
          </nav>
          <div className="rightHeader">
            {auth ? (
              // Show dropdown when showDrop is true
              <div className="dropdown relative">
                <div className="border-[#759578]-800 flex rounded border-2 border-solid bg-[#759578] pl-2 pr-1 text-white">
                  <button className="" type="button">
                    {user.name}
                  </button>
                  <i className="flex items-center justify-end ">
                    <RiArrowDropDownLine
                      className="cursor-pointer font-bold"
                      onClick={dropdown}
                    />
                  </i>
                </div>
                {showDrop ? (
                  <ul className="dropdown-menu absolute z-20 ">
                    <li className="border-[#759578]-800 rounded border-2 border-solid bg-[#759578] px-2 text-white">
                      <NavLink
                        to={`/dashboard/${user.role === 1 ? "admin" : "user"}`}
                        className=""
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="border-[#759578]-800 rounded border-2 border-solid bg-[#759578] px-2 text-white">
                      <NavLink className="" onClick={logoutHandler}>
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                ) : null}
              </div>
            ) : (
              <div className="border-[#759578]-800  border-2 border-solid bg-[#759578] px-2 text-white">
                <button
                  className="rounded-xl py-0 text-lg font-bold md:py-1 "
                  onClick={() => {
                    logoutHandler;
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;
