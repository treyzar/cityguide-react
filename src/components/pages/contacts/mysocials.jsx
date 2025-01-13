import React from "react";

export default function Social({name, url}){
    return(
        <>
        <p className="main__container-box-1-subtitle">
            {name}
            <a href={url} className="main__container-box-1-social">{name}</a>
        </p>
        </>
    )
}