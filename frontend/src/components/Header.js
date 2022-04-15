import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {

  return (
    <>
    <div className="header">
      <div className="container">
        <div className="pc-header">
          <div className="row">
            <div className="col-md-3 col-4 d-flex align-items-center">
              <Link className="navbar-brand" to="/">
                <img alt="logo" src="/images/logo.png" />
              </Link>
            </div>
            <div className="col-md-6 col-8 d-flex align-items-center">
              <form  className="input-group">
                <input
                  type="search"
                  className="form-control rounded search"
                  placeholder="Search"
                />
                <button type="submit" className="search-button">
                  search
                </button>             
              </form>
              <Link to="/cart" >
              <FontAwesomeIcon icon="fas fa-shopping-cart" />
               </Link>
            </div>
 
            </div>
        </div>
      </div>
    </div>
  </>

        )
}

export default Header