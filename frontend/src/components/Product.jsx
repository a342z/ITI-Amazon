import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart,addCartFirst } from "../redux/action";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { addItem } from "../redux/action/index";
import { Rating } from "@mui/material";
import axios from "axios";
import { border } from "@mui/system";

const Product = () => {
  const {id} = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCartFirst(product));
  };
  //changes
  useEffect(() => {
    axios.get(`http://localhost:8080/product/${id}`).then((res) => {
      setProduct(res.data.data[0]);
      console.log(res.data.data);
    });
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 ">
          <img
            src={product.images}
            alt={product.name}
            height="400px"
            width="400px"
            style={{border :" 1px solid black"}}
            className="py-3 px-3"
          />
          <div className=" px-5 py-3">
            <img
            src={product.images}
            alt={product.name}
            height="80px"
            width="80px"
            style={{border :" 1px solid black"}}
            className="py-3 px-3"
          />
          <img
            src={product.images}
            alt={product.name}
            height="80px"
            width="80px"
            style={{border :" 1px solid black"}}
            className="py-3 px-3"
          />
          <img
            src={product.images}
            alt={product.name}
            height="80px"
            width="80px"
            style={{border :" 1px solid black"}}
            className="py-3 px-3"
          />
          <img
            src={product.images}
            alt={product.name}
            height="80px"
            width="80px"
            style={{border :"1px solid black"}}
            className="py-3 px-3 "
          />
          </div>
          
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black fw-bold display-6">{product.name}</h4>
          
          
          <h3 className="lead fw-normal"> <p className="fw-bold ">DESC :</p> {product.description}</h3>
          <h3 className=" fw-bold my-4 text-danger ">Price : {product.price} E£ </h3>
          <Rating name="read-only" value={product.rating} readOnly  /> <hr/>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
