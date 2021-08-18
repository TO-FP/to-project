import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Breadcrumbs, Loading } from "../../components";
import { getOneProduct, deleteProduct } from "../../API/admin";
import StarIcon from "@material-ui/icons/Star";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./index.css";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const params = useParams();
  const history = useHistory();

  const user_data = JSON.parse(localStorage.getItem("admin"));
  const access_token = localStorage.getItem("access_token");
  const URL = process.env.REACT_APP_API_URL;

  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({});

  const [images, setImages] = useState([]);

  const showOneProduct = async () => {
    const id = +params.id;
    const data = await getOneProduct(access_token, id);
    setProduct(data);

    const tempImage = [];

    data.Products_images.forEach((image) => {
      tempImage.push(image.fileName);
    });

    setImages(tempImage);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(access_token, +params.id);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        setIsLoading(true);
        setTimeout(() => {
          history.push("/products/");
        }, 600);
      }
    });
  };

  useEffect(() => {
    setIsLoading(false);
    showOneProduct();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Breadcrumbs page="products-details" params={{ id: +params.id }} />
          <div className="bg-white p-3">
            <div className="row" style={{ minHeight: 400 }}>
              <div className="col-4">
                <div className="details-image-primary">
                  <img
                    src={`${URL}/images/products/${images[0]}`}
                    className="details-image"
                  />
                </div>
                <div className="d-flex mt-3">
                  {images.map((image, index) => {
                    if (index > 0) {
                      return (
                        <div
                          className="details-image-secondary"
                          style={
                            index !== images.length && index !== 1
                              ? { marginLeft: 20 }
                              : { marginLeft: 0 }
                          }
                        >
                          <img
                            src={`${URL}/images/products/${image}`}
                            className="details-image"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div
                className="col-8 d-flex align-content-between flex-wrap"
                style={{ paddingLeft: 50 }}
              >
                <div>
                  <div>
                    <span
                      className="text-primary mb-3"
                      style={{ fontWeight: "bold" }}
                    >
                      {product.condition}
                    </span>
                  </div>
                  <div className="mt-3">
                    <h4>{product.name}</h4>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {product.brand}
                  </div>
                  <div className="rating-container d-flex mb-2">
                    <div>
                      {product.rating === 1 ? (
                        <StarIcon />
                      ) : product.rating === 2 ? (
                        <>
                          <StarIcon />
                          <StarIcon />
                        </>
                      ) : product.rating === 3 ? (
                        <>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </>
                      ) : product.rating === 4 ? (
                        <>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                        </>
                      ) : (
                        product.rating === 5 && (
                          <>
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                            <StarIcon />
                          </>
                        )
                      )}
                    </div>
                    <div style={{ fontSize: 15, marginLeft: 5, marginTop: 3 }}>
                      ({product.rating})
                    </div>
                  </div>
                  <div className="desc">
                    <p style={{ fontSize: 12 }}>{product.desc}</p>
                  </div>
                  <div className="" style={{ fontSize: 13 }}>
                    {product.weight}gr
                  </div>
                  <div style={{ fontSize: 13 }}>Stock : {product.stock}</div>
                  <div style={{ fontSize: 14 }}>Rp {product.price}</div>

                  <div className="mt-3" style={{ fontSize: 14 }}>
                    {product.category}
                  </div>

                  <div className="mt-3 text-muted">
                    <p style={{ fontSize: 12 }}>
                      <VisibilityIcon /> {product.views}
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-between w-100">
                  <div>
                    <Link to={`/products`}>
                      <button
                        className="btn btn-primary"
                        style={{ marginRight: 10 }}
                      >
                        Back
                      </button>
                    </Link>
                    {product.UserId === user_data.id && (
                      <Link to={`/product-details/${product.id}/edit`}>
                        <button
                          className="btn btn-warning"
                          style={{ marginRight: 10 }}
                        >
                          Edit
                        </button>
                      </Link>
                    )}
                  </div>

                  {product.UserId === user_data.id && (
                    <div>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete()}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
