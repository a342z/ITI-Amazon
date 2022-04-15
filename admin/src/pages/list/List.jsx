import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useEffect } from "react";
import axios from "axios";

const List = () => {

  // useEffect(() => {
  //   console.log("use effect");
  //   axios.get("http://localhost:8080/products").then(res => console.log(res.data.data))
  //     .catch(err => console.log(err))

  // });
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  )
}

export default List