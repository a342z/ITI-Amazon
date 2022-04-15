import { Link, useLocation } from "react-router-dom";
import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
// import Chart from "../../components/chart/Chart";
// import { productData } from "../../dummyData";
// import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/apiCalls";
// import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const [productEdit, setProductEdit] = useState({ name: "", price: "", quantity: "", description: "", rating: "", properties: {} });

    const handleChange = (e) => {
        setProductEdit((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    
    const product = useSelector((state) =>
        state.product.products.data.find((product) => product._id === productId)
    );

    useEffect(() => {
        // console.log("product", inputs);
        setProductEdit(product);
    }, [productId]);


    let handleSubmit = async (e) => {
        e.preventDefault();
        // let product = { ...inputs, category_id: category, properties: properties, images: [image] };
        console.dir(productEdit);


        try {
            updateProduct(productEdit._id, productEdit, dispatch);
        } catch (err) {
            console.log(err);
        }
    };





    return (
        <div className="list">
            <Sidebar />
            <div className="dataContainer">
                <div className="product">

                    <form className="productForm">
                        <div className="productFormLeft">
                            <label>Product Name</label>
                            <input type="text" name="name" value={productEdit.name} onChange={handleChange} />
                            <label>Product Description</label>
                            <input type="text" name="description" value={productEdit.description} onChange={handleChange} />
                            <label>Price</label>
                            <input type="text" name="price" value={productEdit.price} onChange={handleChange} />
                            <label>Quantity</label>
                            <input type="text" name="quantity" value={productEdit.quantity} onChange={handleChange} />
                            <label>rating</label>
                            <input type="text" name="rating" value={productEdit.rating} onChange={handleChange} />
                            {/* <label>properties</label>
        <input type="text" name="properties" value={JSON.stringify(productEdit.properties) } onChange={handleChange} /> */}

                        </div>
                        <div className="productFormRight">
                            <div className="productUpload">
                                {/* <img src={inputs?.images[0]} alt="" className="productUploadImg" /> */}
                                <label for="file">
                                    {/* <Publish /> */}
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="productButton" onClick={handleSubmit}>Update</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>


    );
}
