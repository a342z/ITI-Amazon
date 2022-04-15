// import {
//     CalendarToday,
//     LocationSearching,
//     MailOutline,
//     PermIdentity,
//     PhoneAndroid,
//     Publish,
//   } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./product.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector,useDispatch } from "react-redux";

export default function Product() {

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.products.data);

    // useEffect(() => {
    //     getProducts(dispatch);
    //     console.log("products", products);
    // }, [dispatch]);

    // const handleDelete = (id) => {
    //     deleteProduct(id, dispatch);
    // };
    return (
        <div className="list">
            <Sidebar />
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label>Username</label>
                            <input
                                type="text"
                                placeholder="annabeck99"
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Anna Becker"
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="annabeck99@gmail.com"
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Phone</label>
                            <input
                                type="text"
                                placeholder="+1 123 456 67"
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Address</label>
                            <input
                                type="text"
                                placeholder="New York | USA"
                                className="userUpdateInput"
                            />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img
                                className="userUpdateImg"
                                src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                            />
                            <label htmlFor="file">
                                {/* <Publish className="userUpdateIcon" /> */}
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
