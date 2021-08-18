import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Breadcrumbs } from "../../components";
import { useHistory } from "react-router-dom";
import { getAllProducts } from "../../API/admin";
import { Loading } from "../../components";
import Pagination from "@material-ui/lab/Pagination";
import SearchIcon from "@material-ui/icons/Search";

const Product = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const history = useHistory();

  const [sort, setSort] = useState(" ");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let [startNumber, setStartNumber] = useState(0);

  const showAllProducts = async (page) => {
    setIsLoading(true);

    if (!page) page = 1;

    setCurrentPage(page);

    let name = search === "" ? " " : search;

    const number = (page - 1) * 5 + 1;
    const access_token = localStorage.getItem("access_token");
    const data = await getAllProducts(access_token, name, sort, page);

    console.log("PRODUCTS: ", data);

    if (data.status === 200) {
      setIsLoading(false);

      setProducts(data.products);
      setStartNumber(number);
      setTotalPage(data.totalPage);
    }
  };

  const handleEdit = (productName, productId) => {
    const slug = productName.replace(/ /g, "-").toLowerCase();
    history.push(`/product-details/${productId}`);
    // history.push(`/products/${slug}&id=${productId}`);
  };

  const handleChange = (event, value) => {
    const page = value;
    showAllProducts(page);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    showAllProducts();
  };

  useEffect(async () => {
    setIsLoading(true);
    showAllProducts();
  }, []);
  console.log(sort);
  return (
    <>
      <Breadcrumbs page="products" />

      {!isLoading ? (
        <div className="product">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div style={{ width: "100%" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search product.."
                onChange={(e) => handleSearch(e)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    showAllProducts();
                  }
                }}
                value={search}
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <Button onClick={() => showAllProducts()}>
                <SearchIcon />
              </Button>
            </div>
            <div>
              <select
                name=""
                className="form-control"
                style={{ width: 150 }}
                defaultValue={sort}
                onChange={(e) => handleSort(e)}
              >
                <option value=" ">Sort by</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="low-price">Low Price</option>
                <option value="high-price">High Price</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="mainBG">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="form-control" style={{ border: 0 }}>
                        #
                      </span>
                    </th>
                    <th scope="col">
                      <span className="form-control" style={{ border: 0 }}>
                        Picture
                      </span>
                    </th>
                    <th scope="col">
                      <span className="form-control" style={{ border: 0 }}>
                        Name
                      </span>
                    </th>
                    <th scope="col">
                      <span className="form-control" style={{ border: 0 }}>
                        Price
                      </span>
                    </th>
                    <th scope="col">
                      <span
                        className="form-control"
                        style={{ border: 0, paddingLeft: 0 }}
                      >
                        Stock
                      </span>
                    </th>
                    <th scope="col">
                      <span className="form-control" style={{ border: 0 }}>
                        By
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => handleEdit(product.name, product.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <td scope="row">{startNumber++}</td>
                        <td>
                          <div className="product-image-container">
                            <img
                              className="product-image"
                              src={`${API_URL}/images/products/${product.Products_images[0].fileName}`}
                              alt="product image"
                            />
                          </div>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.User.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ paddingBottom: 10 }}>
                <Pagination
                  count={totalPage}
                  page={currentPage}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div className="mainBG p-3">Sorry product not found..</div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Product;
