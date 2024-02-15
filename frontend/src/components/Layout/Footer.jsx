import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillGithub,
  AiFillLinkedin,
  AiFillWechat,
} from "react-icons/ai";
const Footer = () => {
  return (
    <main>
      <section className="footerSection">
        <div className="footerDiv flex flex-col-reverse border-t border-solid border-black py-4 md:flex md:w-full md:flex-row">
          <div className="leftFooter hidden  w-1/5  md:inline-flex md:border-r md:border-black">
            <Link
              className="flex w-full items-center justify-center"
              to="https://nickeynb.github.io/PortfolioNitin/"
              target="_blank"
            >
              <img
                className=" w-24  "
                src="/src/assets/mainLogo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="midFooter border-r border-solid border-black text-center md:flex md:w-3/5 md:flex-col md:items-center md:justify-center">
            <p>
              "Apni-Market is more than just a shopping platform – it's an
              experience"{" "}
            </p>
            <p>Design with love - NB </p>
            <p>Copyright © 2023 | All Rights Reserved</p>
          </div>
          <div className="rightFooter mb-2 flex justify-center md:w-1/5">
            <h4 className="hidden">Contact Us</h4>
            <div className="flex space-x-4  text-2xl font-bold md:flex-col md:justify-center md:space-x-0 md:space-y-2 md:text-3xl">
              <Link to="">
                <i>
                  <AiFillWechat />{" "}
                </i>
              </Link>
              <Link to="">
                <i>
                  <AiFillLinkedin />
                </i>
              </Link>
              <Link to="">
                <i>
                  <AiFillGithub />{" "}
                </i>
              </Link>

              <Link to="">
                <i>
                  <AiFillInstagram />{" "}
                </i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Footer;
