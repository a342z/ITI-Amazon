import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.scss"
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
export default function ProductList() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products.data);

    useEffect(() => {
        getProducts(dispatch);
        console.log("products", products);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },

        {
            field: "product",
            headerName: "Product",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.images[0]} alt="" />
                        {params.row.name}
                    </div>
                );
            },
        },
        { field: "brand", headerName: "Brand", width: 220 },
        { field: "quantity", headerName: "Quantiy", width: 220 },
        //   { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/products/" + params.row._id}>
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
                        rows={products}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={10}
                        rowsPerPageOptions={[10]}

                    />
                </div>

                <Link to="/products/new" replace>
                    <button className="addButton">Add New Product</button>
                </Link>


            </div>
        </div>
    );
}
