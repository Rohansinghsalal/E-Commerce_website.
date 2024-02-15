import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <main>
        <section className=" min-h-[70vh] py-4 md:py-8">
          <div className="container mx-auto px-2">
            <div className="text-center">
              <h1 className="mb-8 text-2xl font-bold md:text-3xl">
                Our Story: Making Your Shopping Experience Better
              </h1>
              <p className="text-lg ">
                <span className="text-xl font-bold">Apni Market</span> was
                founded in 2023 with a clear vision: to transform the way people
                shop online. Our story is not just about our journey; it's about
                how we're committed to improving your shopping experience in
                meaningful ways.
              </p>
            </div>

            <div className="my-4">
              <h2 className="mb-2 text-2xl font-semibold">
                The E-commerce Revolution
              </h2>
              <p className="">
                We recognized that the e-commerce landscape was evolving
                rapidly. While convenience and choice were at our fingertips, we
                also saw room for improvement. Traditional online shopping
                experiences often lacked a personal touch, made it challenging
                to discover quality products, and didn't always align with
                shoppers' values.
              </p>
            </div>

            <div className="my-8">
              <h2 className="mb-2 text-2xl font-semibold">
                Your Shopping, Your Way
              </h2>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>Curating Quality:</strong> We handpick each product,
                  ensuring that it meets our rigorous quality standards. When
                  you shop with us, you can trust that you're getting the best.
                </li>
                <li>
                  <strong>Personalized Recommendations:</strong> Our advanced
                  recommendation system learns your preferences over time,
                  making it easier for you to discover products that you'll
                  love.
                </li>
                <li>
                  <strong>Sustainability Matters:</strong> We're committed to
                  sustainability. By choosing us, you're supporting eco-friendly
                  practices and products that align with your values.
                </li>
                <li>
                  <strong>Customer-Centric Service:</strong> We put you first.
                  Our dedicated customer support team is always ready to assist
                  you, whether you have questions, need assistance, or want to
                  provide feedback.
                </li>
              </ul>
            </div>

            {/* Add more sections for trust, community, and closing statement as needed */}
          </div>

          {/* Add more sections for team, mission, etc. as needed */}
        </section>
      </main>
    </Layout>
  );
};

export default About;
