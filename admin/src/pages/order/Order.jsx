// import {
//     CalendarToday,
//     LocationSearching,
//     MailOutline,
//     PermIdentity,
//     PhoneAndroid,
//     Publish,
//   } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateOrder } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { ImageList } from "@mui/material";

export default function Order() {
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    // const [orderEdit, setorderEdit] = useState({ name: "", price: "", quantity: "", description: "", rating: "", properties: {} });
    const [orderEdit, setorderEdit] = useState({});
    // const [image, setImage] = useState("");
    // const [properties, setProperties] = useState("");

    const handleChange = (e) => {
        setorderEdit((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // const handleImageChange = (e) => {
    //     setImage(e.target.value);
    //     // setorderEdit({...orderEdit,images:[e.target.value]})
    // }

    // const handlePropertiesChange = (e) => {
    //     let input = e.target.value;
    //     let prop = {};
    //     for (let p of input.split(",")) {
    //         prop[p.split(":")[0]?.trim()] = p.split(":")[1]?.trim();
    //     }
    //     setProperties(prop);
    // };
    const strToObj = (str) => {
        let properties = {};
        for (let p of str.split(",")) {
            properties[p.split(":")[0]?.trim()] = p.split(":")[1]?.trim();
        }

        return properties;
    }

    const objToString = (obj) => {
        let str = "";
        for (let p in obj) {
            // prop[p.split(":")[0]?.trim()] = p.split(":")[1]?.trim();
            str += p + ": " + obj[p] + ", ";
        }
        str = str.slice(0, -2);
        return str;
    };




    const order = useSelector((state) =>
        state.order.orders.find((order) => order._id === orderId)
    );

    console.log("ORDEr", order);

    useEffect(() => {
        console.log("order", order);
        setorderEdit(order);
        // setProperties(objToString(order.properties));
        // setImage(order.images[0]);
    }, [orderId]);


    let handleSubmit = async (e) => {
        e.preventDefault();
        // let order = { ...inputs, category_id: category, properties: properties, images: [image] };
        // console.dir(orderEdit);
        // let order = { ...orderEdit, images: [image],properties:strToObj(properties) };
        // console.log("finalPro", order)
        console.log(orderEdit);

        try {
            updateOrder(order._id, orderEdit, dispatch);
        } catch (err) {
            console.log(err);
        }
    };




    return (
        <div className="list">
            <Sidebar />
            <div className="dataContainer">
                <div className="user">
                    <div className="userContainer">
                        <div className="userShow">

                            <div className="userShowBottom">
                                <span className="userShowTitle">order Details</span>
                                {/* <div className="userShowInfo">
                                    <img src={order.images[0]} style={{ height: "150px" }} alt="" />
                                </div> */}
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Time: </strong>{new Date(order.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Customer Name: </strong>{order.customerName}</span>
                                </div>
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Customer ID: </strong>{order.customerID}</span>
                                </div>
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Phone Number: </strong>{order.phoneNumber}</span>
                                </div>




                                <span className="userShowInfoTitle"><strong>Order Items: </strong></span>
                                <div className="userShowInfo orderProperties">

                                    <div className="orderProperties">
                                        <ul>
                                            {order.orderItems.map(order => {
                                                return <li>{order.name} <strong>[x{order.quantity}]</strong> </li>
                                            })}
                                        </ul>

                                    </div>
                                </div>
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Total Price: </strong>{order.totalPrice}</span>
                                </div>

                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Order Status: </strong>{order.orderStatus}</span>
                                </div>
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Payment Type: </strong>{order.paymentType}</span>
                                </div>
                                <div className="userShowInfo">
                                    <span className="userShowInfoTitle"><strong>Payment Status: </strong>{order.paymentStatus}</span>
                                </div>

                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Order Status</label>
                                        <select
                                            className="userUpdateInput"
                                            value={orderEdit.orderStatus}
                                            onChange={handleChange}
                                            name="orderStatus">
                                            <option value="pending">pending</option>
                                            <option value="packed">packed</option>
                                            <option value="shipped">shipped</option>
                                            <option value="delivered">delivered</option>
                                            <option value="cancelled">cancelled</option>
                                        </select>
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Payment Status</label>
                                        <select
                                            className="userUpdateInput"
                                            value={orderEdit.paymentStatus}
                                            onChange={handleChange}
                                            name="paymentStatus">
                                            <option value="pending">pending</option>
                                            <option value="completed">completed</option>
                                            <option value="cancelled">cancelled</option>
                                            <option value="refund">refund</option>
                                        </select>

                                    </div>

                                    {/* <div className="userUpdateItem">
                                        <label>Brand</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={orderEdit.brand}
                                            onChange={handleChange}
                                            name="brand"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={orderEdit.description}
                                            onChange={handleChange}
                                            name="description"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Price</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={orderEdit.price}
                                            onChange={handleChange}
                                            name="price"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Quantity</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={orderEdit.quantity}
                                            onChange={handleChange}
                                            name="quantity"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Rating</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={orderEdit.rating}
                                            onChange={handleChange}
                                            name="rating"
                                        />
                                    </div> */}

                                    {/* <div className="userUpdateItem">
                                        <label>Properties</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={properties}
                                            onChange={(e)=>{setProperties(e.target.value)}}
                                            name="rating"
                                            placeholder="screan size: 15.6 inches, Hard disk size: 1256, Graphics: Dedicated"
                                        />
                                    </div>

                                    <div className="userUpdateItem">
                                        <label>Image URL</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={image}
                                            onChange={handleImageChange}
                                            name="quantity"
                                        />
                                    </div> */}


                                    <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
