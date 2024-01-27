import { Link } from "react-router-dom";
import { displayObject } from "../Tools"
import "./Albums.css"

const AlbumDisplay = ({ album }) => {

    let albumDislplay = { ...album };
    delete albumDislplay["userId"];

    return (
        <div className='linkStyle'><Link to={`${album.id}/photos`} className='linkContent'>{displayObject(albumDislplay)}📷</Link></div>
    );
}
export default AlbumDisplay;