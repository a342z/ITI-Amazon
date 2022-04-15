import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers, deleteUser } from '../../redux/apiCalls';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { display } from '@mui/system';
import "./usersList.scss"


const UsersList = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteUser(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 250 },
        { field: "name", headerName: "Name", width: 250 },
        { field: "email", headerName: "email", width: 250 },
        { field: "role", headerName: "role", width: 220 },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/users/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];
    // <div className="list">
    // <Sidebar />
    // <div className="listContainer">
    //     <DataGrid

    return (
        <div className="list">
            <Sidebar />
            <div className="dataContainer">
                <div className="datagrid">
                    <DataGrid
                        rows={users}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={13}
                        rowsPerPageOptions={[2]}
                        pagination

                    />
                </div>
                <Link to="/users/new" replace>
                    <button className="addButton">Add New User</button>
                </Link>

            </div>
        </div>
    )
}

export default UsersList