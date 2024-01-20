import { useState, useEffect} from "react";
import {  Route} from "react-router-dom";
import AlbumDisplay from "./AlbumDisplay";

const AlbumsDisplay=({albums})=>{
const [selectedId, setSelectedId] = useState(null);
const [selectedTitle, setSelectedTitle] = useState(null);
const [filterOption, setFilterOption] = useState("All");

useEffect(() => {
    setSelectedId(null);
    setSelectedTitle(null);
}, [filterOption]);

const isFiltered = (album) => {
    switch (filterOption) {
        case "All":
            return true;
        case "Id":
            return album.id.includes(selectedId);
        case "Title":
            return album.title.includes(selectedTitle);
    }
}

      return (<>
        <label htmlFor="filterSelector">Choose a filter option:</label>
        <select id="filterSelector" value={filterOption} onChange={(event)=>{setFilterOption(event.target.value)}}>
            <option value="All">All</option>
            <option value="Id">Id</option>
            <option value="Title">Title</option>
        </select>
        {filterOption === 'Id' && (
           <><label htmlFor="idInput">Enter Id:</label>
                <input type="number" id="idInput" value={selectedId} onChange={(event)=>{setSelectedId(event.target.value)}} /></>
        )}
        {filterOption === 'Title' && (
            <><label htmlFor="titleInput">Enter Title:</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={(event)=>{setSelectedTitle(event.target.value)}} /></>
        )}
        <div>
          <ul>
            {albums.map((album) => (
                <li key={album.id} style={{ listStyle: 'none', margin: '3rem' }}>
                    {isFiltered(album) ? <AlbumDisplay album={album}/> : <span />}
                </li>
            ))}
    </ul>
        </div></>
      );
    }
export default AlbumsDisplay;