import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import { ImBin } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import CategoryInput from "../../components/CategoryInput";
import { Modal } from "antd";

function CreateCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategory] = useState([]);
  const [updated, setUpdated] = useState("");
  const [selected, setSelected] = useState(null);
  const fetchAllCategory = async () => {
    try {
      const category = await axios.get("/api/v1/category/get-all-category");
      if (category.data.success) {
        setCategory(category.data.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong while Fetching All Category");
    }
  };
  const createCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const newCategory = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (newCategory?.data?.success) {
        toast.success("product created successfully");
        fetchAllCategory();
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while Creating Category");
    }
  };

  const deleteCategoryHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success("Successfully Deleted");
        setSelected(null);
        fetchAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Deleting Category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updated }
      );
      if (data?.success) {
        toast.success(`${selected.name} is updated`);
        setSelected(null);
        setUpdated("");
        setIsModalOpen(false);
        setName("");
        fetchAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error While Updating Category");
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <CategoryInput
                createCategoryHandler={handleUpdate}
                name={updated}
                setName={setUpdated}
              />
            </Modal>

            <h2 className="text white mb-3">Create Category</h2>
            <CategoryInput
              createCategoryHandler={createCategoryHandler}
              name={name}
              setName={setName}
            />

            <div>
              <h4 className="mt-2">All Categories : </h4>

              <div>
                <table className="table text-white border-warning">
                  <thead className="border-warning">
                    <tr>
                      <th>S.No</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {categories.map((c, index) => (
                      <tr key={c._id}>
                        <td style={{ width: "25px" }}>{index + 1}</td>
                        <td>{c.name}</td>
                        <td>
                          <FiEdit
                            onClick={() => {
                              showModal();
                              setUpdated(c.name);
                              setSelected(c);
                            }}
                          />{" "}
                          <ImBin
                            style={{ marginLeft: "20px" }}
                            onClick={(e) => {
                              deleteCategoryHandler(c._id);
                            }}
                          />{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
