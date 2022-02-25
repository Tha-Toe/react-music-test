import React from "react";

const MusicMap = ({id,title,playSong}) => {
    return (
        <div className="songTitle" onClick={() => playSong(id)}>{id}. {title}</div>
    )
}

export default MusicMap;