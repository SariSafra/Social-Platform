import { useState, createContext, useContext, useRef, useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams,useLocation} from "react-router-dom";
import  {displayObject} from "../Tools"

const AlbumDisplay=({album})=>{
    const linkStyle = {
        listStyle: "none",
        padding: 1,
      };
      
      const linkContent = {
        alignItems: "center",
        textDecoration: "none",
        color: "black",
        padding: "10px",
        margin: "5px",
        transition: "background-color 0.3s ease-in-out",
      };

    let albumDislplay = { ...album };
    delete albumDislplay["userId"];

      return (
        <div>
          <ul style={linkStyle}> <Link to={`${album.id}/photos`} style={linkContent}>{displayObject(albumDislplay)}📷</Link></ul>
        </div>
      );
    }
export default AlbumDisplay;