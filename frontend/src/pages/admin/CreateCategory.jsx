import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [adminSideBar, setAdminSideBar] = useState(false);

  // handle form
  // submit and create new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          withCredentials: true,
        },
      );
      const isSucc = res.data.success;
      if (isSucc) {
        toast.success(`${name} category is created`);
        // after creating show all categories
        setName("");
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };

  // get all category
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
    }
  };

  // for initial time
  // when we refresh o/p will be like -> outside-afteruse-(inside)-outside-afteruse-return-outside-after
  // console.log("outside");
  useEffect(() => {
    // console.log("Inside");
    getAllCategory();
  }, []);
  // console.log("after use");

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          withCredentials: true,
        },
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory(); // initial time mei updated mile
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`,
        {
          withCredentials: true,
        },
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  const showAdminSideBar = () => {
    setAdminSideBar(!adminSideBar);
  };
  return (
    <Layout>
      <section>
        <section className="createCategoryBody min-h-[70vh] md:mb-8">
          <div className="relative">
            <div className="font-progress z-0 mt-4 flex justify-end px-2 text-2xl">
              <RxHamburgerMenu
                className="cursor-pointer"
                onClick={showAdminSideBar}
              />
            </div>
            {adminSideBar ? <AdminMenu /> : null}
          </div>
          {/* create category */}
          <div className="createCategoryDiv min-h-70vh mt-4 flex h-full items-center justify-center">
            <div className="rightCreateCategory w-full">
              <h1 className="mb-6 mt-3 text-center text-2xl font-semibold md:text-3xl">
                Manage Category
              </h1>
              {/* creating category */}
              <div className="searchCategory">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>

              {/* Show all categories */}
              <div className="showCategories  mt-6">
                <div className="allCategories border-t border-solid border-black">
                  {categories?.map((c) => (
                    <React.Fragment key={c._id}>
                      <div className="category flex items-center justify-between border-b border-solid border-black px-2 py-2 md:px-4">
                        {/* name heading */}
                        <div
                          key={c._id}
                          className="categoryName text-lg font-bold"
                        >
                          {c.name}
                        </div>
                        {/* action heading */}
                        <div className="categoryAction flex space-x-2">
                          <button
                            className="editBtn rounded-md bg-green-400 px-4 py-1 font-semibold md:px-6"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="deleteBtn  rounded-md bg-red-400 px-2 py-1 font-semibold text-white md:px-3"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default CreateCategory;
