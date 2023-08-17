import { makeStyles } from "@material-ui/core";
import { theme } from "../../utils/theme";

export const editUserStyle = makeStyles((theme)=>({
    editUserWrapper:{
        "& .heading":
        {
            backgroundColor: "rgb(149, 152, 191,.5)",
            height: "40px",
            paddingTop: "10px",
            color:"rgb(61, 38, 85)",
        },
        "& .btn-style":{
            marginLeft:"10px",
            marginBottom:"20px",
        },
        "& .form-style":{
            marginTop:"20px",
            fontSize:"12px",
            position:"relative",
            left:"-80px",
        },
        "& .form-email-style":{
            marginTop:"20px",
            fontSize:"12px",
            position:"relative",
            left:"-95px",
        },
        }
    })
)