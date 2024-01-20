import {react} from "react";
import { Route} from "react-router-dom";
import  {displayObject} from "./Tools"

const UserInfo=()=>{
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


 
    console.log(currentUser);
      return (
        <div>
          <h2 className="title">Personal Information</h2>
          <ul>{displayObject(currentUser)}</ul>
        </div>
      );
    }
export default UserInfo;