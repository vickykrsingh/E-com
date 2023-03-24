import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const getAllProduct = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout title={"E-Commerce All Products"}>
      <div className="text-white container-fluid">
        <div className="row pt-5">
          <div className="col-lg-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9">
            <h2 className="text white">All Products</h2>
            <div className="container">
              <div className="row d-flex align-items-center justify-content-center">
            {products.map((p) => (

                <Link to={`/dashboard/admin/product/${p._id}`} className="card bg-dark p-1 col-lg-4 col-md-6 col-sm-12 m-2 text-decoration-none text-white" style={{ width: "17rem" , height:'29rem'}} key={p._id}>
                  <img
                    className="card-img-top"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt="Card_image_cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description}
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item bg-dark text-white">
                      { `$${p.price} | Stock ${p.quantity} items` }
                    </li>
                  </ul>
                </Link>
            ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
