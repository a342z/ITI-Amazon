import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const NewProduct = () => {

    const getOptions = async () => {
        const res = await axios.get('http://localhost:8080/categories')
        const data = res.data.data;
        console.log("cat data", data);

        // const options = data.map(d => ({
        //     "value": d._id,
        //     "label": d.name
        // }))

        setCatOptions(data);
    }
    const [file, setFile] = useState("");
    const [properties, setProperties] = useState({});
    const [image, setImage] = useState("");
    const [inputs, setInputs] = useState({});
    const [catOptions, setCatOptions] = useState([]);
    const [category, setCategory] = useState("");
    useEffect(() => {
        getOptions();
        console.log("options", catOptions);
    }, []);
    const dispatch = useDispatch();


    const handlePropertiesChange = (e) => {
        let input = e.target.value;
        let prop = {};
        for (let p of input.split(",")) {
            prop[p.split(":")[0]?.trim()] = p.split(":")[1]?.trim();
        }
        setProperties(prop);
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let handleSubmit = async (e) => {
        let product = { ...inputs, category_id: category, properties: properties, images: [image] };
        console.log(product);
        e.preventDefault();
        try {
            addProduct(product, dispatch);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="list">
            <Sidebar />
            <div className="dataContainer">
            <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="formInput">
                            <label htmlFor="file">
                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>

                        <div className="formInput">
                            <label>Name</label>
                            <input type="text" placeholder="Galaxy S22" name="name" onChange={handleChange} />
                        </div>

                        <div className="formInput">
                            <label>Brand</label>
                            <input type="text" placeholder="Samsung" name="brand" onChange={handleChange} />

                        </div>

                        <div className="formInput">
                            <label>Description</label>
                            <input type="text" name="description" onChange={handleChange} />
                        </div>

                        <div className="formInput">
                            <label>Properties</label>
                            <input type="text" name="properties" onChange={handlePropertiesChange} placeholder="Memory:8GB, Colour:Black" />
                        </div>


                        <div className="formInput">
                            <label>Quantity</label>
                            <input type="number" placeholder="1" name="quantity" onChange={handleChange} />
                        </div>


                        <div className="formInput">
                            <label>Price</label>
                            <input type="number" placeholder="999" name="price" onChange={handleChange} />
                        </div>

                        <div className="formInput">
                            <label>image url</label>
                            <input type="text" name="image" onChange={(e) => { setImage(e.target.value) }} />
                        </div>

                        <div className="formInput">
                            <label>Category</label>
                            <Select onChange={(e) => setCategory(e.target.value)}>
                                {
                                    catOptions.map(d => {
                                        return <MenuItem value={d._id}>{d.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </div>


                        <button type="submit">Add</button>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default NewProduct;
