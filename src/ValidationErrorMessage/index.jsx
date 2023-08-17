import React from "react";

const ValidationErrorMessage =(props)=>{
    return(
        <>{props.touched && <p>{props.message}</p>}</>
    )
}
export default ValidationErrorMessage;