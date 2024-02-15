import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import { RxHamburgerMenu } from "react-icons/rx";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const [adminSideBar, setAdminSideBar] = useState(false);

  //get single product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/products/get-product/${params.slug}`,
        {
          withCredentials: true,
        },
      );
      setName(res.data.product.name);
      setId(res.data.product._id);
      setDescription(res.data.product.description);
      setPrice(res.data.product.price);
      setPrice(res.data.product.price);
      setQuantity(res.data.product.quantity);
      setShipping(res.data.product.shipping);
      setCategory(res.data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

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
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const res = await axios.put(
        `http://localhost:8080/api/v1/products/update-product/${id}`,
        productData,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const res = await axios.delete(
        `http://localhost:8080/api/v1/products/delete-product/${id}`,
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success("Product DEleted Succfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //   show admin side bar
  const showAdminSideBar = () => {
    setAdminSideBar(!adminSideBar);
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <main>
        <section className="mb-4 min-h-[70vh] md:mb-8">
          <div className="">
            <div className="">
              <div className="mt-4 flex  justify-end px-2 text-2xl">
                <RxHamburgerMenu
                  className="cursor-pointer"
                  onClick={showAdminSideBar}
                />
              </div>
              {adminSideBar ? <AdminMenu /> : null}
            </div>
            <div className="mx-1 flex min-h-[70vh] items-center justify-center ">
              <div className="w-full max-w-md ">
                <h1 className="mb-6 mt-4 text-center text-2xl font-semibold md:text-3xl">
                  Update Product
                </h1>
                <div className="space-y-1 border-2 border-solid border-black px-1 py-1">
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="w-full border border-solid border-black"
                    onChange={(value) => {
                      setCategory(value);
                    }}
                    value={category}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <div className="w-full ">
                    <label className="flex border border-solid border-black px-2 py-2">
                      {photo ? photo.name : "Upload Photo"}
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="">
                    {photo ? (
                      <div className="w-full cursor-pointer">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          //   height={"200px"}
                          className="h-40 w-full rounded-full  border-2 border-solid border-black text-center sm:h-64 md:h-80"
                        />
                      </div>
                    ) : (
                      <div className="w-full cursor-pointer">
                        <img
                          src={`http://localhost:8080/api/v1/products/product-photo/${id}`}
                          alt="product_photo"
                          // height={"200px"}
                          className="h-40 w-full rounded-full border-2  border-solid border-black text-center sm:h-64 md:h-80"
                        />
                      </div>
                    )}
                  </div>
                  <div className="border-2 border-solid border-black">
                    <input
                      className="w-full px-2 py-2 outline-none"
                      type="text"
                      value={name}
                      placeholder="write a name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <textarea
                      type="text"
                      value={description}
                      placeholder="write a description"
                      className="w-full px-2 py-2 outline-none"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="border-2 border-solid border-black">
                    <input
                      type="number"
                      value={price}
                      placeholder="write a Price"
                      className="w-full px-2 py-2 outline-none"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="write a quantity"
                      className="w-full px-2 py-2 outline-none"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="border-2 border-solid border-black">
                    <Select
                      bordered={false}
                      placeholder="Select Shipping "
                      size="large"
                      showSearch
                      className="w-full border border-solid border-black"
                      onChange={(value) => {
                        setShipping(value);
                      }}
                      value={shipping ? "yes" : "No"}
                    >
                      <Option value="0">No</Option>
                      <Option value="1">Yes</Option>
                    </Select>
                  </div>
                  <div className="">
                    <button
                      className="mt-2 w-full bg-green-300 py-2 text-lg font-bold text-black"
                      onClick={handleUpdate}
                    >
                      UPDATE PRODUCT
                    </button>
                  </div>
                  <div className="">
                    <button
                      className="mt-2 w-full bg-red-500 py-2 text-lg font-bold text-black"
                      onClick={handleDelete}
                    >
                      DELETE PRODUCT
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

export default UpdateProduct;
