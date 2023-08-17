import { makeStyles } from "@material-ui/core";
export const cartStyle = makeStyles((theme) => ({
   cartwrapper:
   { 
   
    "& .heading":
    {
        backgroundColor: "rgb(149, 152, 191,.5)",
        height: "40px",
        paddingTop: "10px",
        color:"rgb(61, 38, 85)",
        fontWeight:"bold",
    },
    "& .btn-style":{
        height:"20px",
        width:"-10px",
        margin:"10px",
    },
    "& .cart-item-img":{
        height:"30px",
        width:"30px",
    },
    
},
 }));