import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
const { Option } = Select; // Option se hum drop down menu bana skte hai

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(""); // single category
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const [adminSideBar, setAdminSideBar] = useState(false);
  const [cat, setCat] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-category",
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Smthng went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // browser property -> Form Data
      const productData = new FormData();
      productData.append("name", name); // key value
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const res = await axios.post(
        "http://localhost:8080/api/v1/products/create-product",
        productData,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  // sidebar menu
  const showAdminSideBar = () => {
    setAdminSideBar(!adminSideBar);
  };

  // select category
  const selectCategory = () => {
    setCat(!cat);
  };
  return (
    <Layout>
      <main>
        <section className="createProductBody mb-4 min-h-[70vh] md:mb-8">
          <div className="createProductDiv">
            <div className="mb-4">
              <div className="font-progress mt-4 flex  justify-end px-2 text-2xl">
                <RxHamburgerMenu
                  className="cursor-pointer"
                  onClick={showAdminSideBar}
                />
              </div>
              {adminSideBar ? <AdminMenu /> : null}
            </div>
            <div className="rightCreateProduct mx-1 flex min-h-[70vh] items-center justify-center ">
              <div className="createProduct w-full max-w-md">
                {/* dropdown to select categories */}
                <h1 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-3xl">
                  Create Product
                </h1>
                <div className="space-y-1 border-2 border-solid border-black px-1 py-1">
                  <Select
                    className="selectCategory w-full border border-solid border-black"
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    // value comes in antd
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="uploadPhoto w-full ">
                    <label className="flex border border-solid border-black px-2 py-2">
                      {photo ? photo.name : "Upload Product Photo"}
                      <input
                        className="w-full"
                        type="file"
                        name="photo"
                        // can accept all type of images .jpg .jpeg etc
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  {/* comment for time being later I will replace left photo with this div */}
                  {/* if photo is present then (return) that photo */}
                  <div className="productPhoto">
                    {photo && (
                      <div className="w-full cursor-pointer">
                        <img
                          // property of bowser
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="w-full  rounded-full border-2 border-solid border-black text-center"
                        />
                      </div>
                    )}
                  </div>
                  <div className="productName border-2 border-solid border-black">
                    <input
                      className="w-full px-2 py-2 outline-none"
                      type="text"
                      value={name}
                      placeholder="write a name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="productDescription border-2 border-solid border-black">
                    <textarea
                      className="w-full px-1 py-1 outline-none"
                      type="text"
                      value={description}
                      placeholder="write a description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="productPrice border-2 border-solid border-black ">
                    <input
                      className="w-full px-1 py-1 outline-none "
                      type="number"
                      value={price}
                      placeholder="write a Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="productQty border-2 border-solid border-black px-1 py-1">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write a quantity"
                      className="w-full px-1 py-1 outline-none"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="productShipping">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping "
                      size="large"
                      showSearch
                      className="ship w-full border-2 border-solid border-black "
                      onChange={(value) => {
                        setShipping(value);
                      }}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="productBtn">
                    <button
                      className="createBtn mt-2 w-full bg-green-300 py-2 text-lg font-bold text-black"
                      onClick={handleCreate}
                    >
                      CREATE PRODUCT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CreateProduct;
