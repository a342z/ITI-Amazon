// import {
//     CalendarToday,
//     LocationSearching,
//     MailOutline,
//     PermIdentity,
//     PhoneAndroid,
//     Publish,
//   } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function User() {
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const user = useSelector((state) =>
        state.users.users.find((user) => user._id === userId)
    );
    const [userEdit, setUserEdit] = useState({ name: "", email: "", role: "" });

    // console.log(user);
    const handleChange = (e) => {
        setUserEdit((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    useEffect(() => {
        setUserEdit(user);
    }, [userId]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        // let product = { ...inputs, category_id: category, properties: properties, images: [image] };
        console.dir(userEdit);
        try {
            updateUser(userEdit._id, userEdit, dispatch);
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
                                <span className="userShowTitle">User Details</span>
                                <div className="userShowInfo">
                                    {/* <PermIdentity className="userShowIcon" /> */}
                                    <span className="userShowInfoTitle"><strong>Name: </strong>{user.name}</span>
                                </div>
                                <div className="userShowInfo">
                                    {/* <PermIdentity className="userShowIcon" /> */}
                                    <span className="userShowInfoTitle"><strong>Email: </strong>{user.email}</span>
                                </div>
                                <div className="userShowInfo">
                                    {/* <PermIdentity className="userShowIcon" /> */}
                                    <span className="userShowInfoTitle"><strong>Role: </strong>{user.role}</span>
                                </div>
                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Abdulrahman"
                                            className="userUpdateInput"
                                            value={userEdit.name}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            placeholder="email@gmail.com"
                                            className="userUpdateInput"
                                            value={userEdit.email}
                                            onChange={handleChange}
                                            name="email"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Role</label>
                                        <select value={userEdit.role} name="role" onChange={handleChange}>
                                            <option value="customer">customer</option>
                                            <option value="admin">admin</option>
                                            <option value="seller">seller</option>
                                        </select>
                                    </div>
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
