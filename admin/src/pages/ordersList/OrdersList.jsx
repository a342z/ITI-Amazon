import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrders, deleteOrder } from '../../redux/apiCalls';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { display } from '@mui/system';


const OrdersList = () => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    useEffect(() => {
        getOrders(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteOrder(id, dispatch);
    };

    function getAdress(params) {
        return `country: ${params.row.shippingAddress.country || ''} ${params.row.shippingAddress.city || ''}`;
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 240 },
        { field: "customerName", headerName: "Customer", width: 120, },
        // { field: "phoneNumber", headerName: "Phone", width: 160 },
        { field: "totalPrice", headerName: "Price", width: 120, },
        { field: "orderStatus", headerName: "Order Status", width: 160 },
        { field: "paymentType", headerName: "payment Type", width: 160 },
        { field: "paymentStatus", headerName: "payment Status", width: 160 },
        // {
        //     field: "shippingAddress", headerName: "Address", width: 160,
        //     // valueGetter: getAdress
        //     renderCell: (params) => {
        //         return <div style={{ colore: "red" }}>
        //             <p><strong>country: </strong>{params.row.shippingAddress.country}</p>
        //             <p><strong>city: </strong>{params.row.shippingAddress.city}</p>
        //             <p><strong>postalCode: </strong>{params.row.shippingAddress.postalCode}</p>
        //             <p><strong>street: </strong>{params.row.shippingAddress.street}</p>
        //             <p><strong>Building: </strong>{params.row.shippingAddress.building}</p>
        //         </div>
        //     }
        // },
        {
            field: "createdAt", headerName: "created At", width: 200,
            valueFormatter: (params) => { return new Date(params.value).toLocaleString() }
        },

        // { field: "paymentType", headerName: "Payment Type", width: 160, },
        // { field: "paymentStatus", headerName: "Payment Status", width: 160, },
        // {
        //     field: "orderItems", headerName: "items", width: 200,
        //     renderCell: (params) => {
        //         return (
        //             <div className="productListItem">
        //                 {params.row.orderItems}

        //             </div>
        //         );
        //     },
        // },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/orders/" + params.row._id}>
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

    return (
        <div className="list">
            <Sidebar />
            <div className="dataContainer">
                <div className="datagrid">
                    <DataGrid
                        rows={orders}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                   
                    />
                </div>
            </div>
        </div>
    )
}

export default OrdersList