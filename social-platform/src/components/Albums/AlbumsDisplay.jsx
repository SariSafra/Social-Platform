import { useState, useEffect } from "react";
import AlbumDisplay from "./AlbumDisplay";
import "./Albums.css"

const AlbumsDisplay = ({ albums }) => {
    const [selectedId, setSelectedId] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [filterOption, setFilterOption] = useState("All");

    useEffect(() => {
        setSelectedId("");
        setSelectedTitle("");
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
        <label className="selectorLabel" htmlFor="filterSelector">Choose a filter option: </label>
        <select className="selector" id="filterSelector" value={filterOption} onChange={(event) => { setFilterOption(event.target.value) }}>
            <option value="All">All</option>
            <option value="Id">Id</option>
            <option value="Title">Title</option>
        </select>
        {filterOption === 'Id' && (
            <><label htmlFor="idInput">Enter Id:</label>
                <input type="number" id="idInput" value={selectedId} onChange={(event) => { setSelectedId(event.target.value) }} /></>
        )}
        {filterOption === 'Title' && (
            <><label htmlFor="titleInput">Enter Title:</label>
                <input type="text" id="titleInput" value={selectedTitle} onChange={(event) => { setSelectedTitle(event.target.value) }} /></>
        )}
        <div>
            <ul className="showAllAlbums">
                {albums.map((album) => (
                    <li key={album.id} className="list">
                        {isFiltered(album) && <div className="showAlbum"><AlbumDisplay album={album} /></div>}
                    </li>
                ))}
            </ul>
        </div></>
    );
}
export default AlbumsDisplay;