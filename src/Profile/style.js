import { makeStyles } from "@material-ui/core";
import { theme } from "../utils/theme";

export const profileStyle = makeStyles((theme)=>({
    editProfileWrapper:{
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
        "& .form-newpassword-style":{
            marginTop:"20px",
            fontSize:"12px",
            position:"relative",
            left:"-68px",
        },
        "& .form-password-style":{
            marginTop:"20px",
            fontSize:"12px",
            position:"relative",
            left:"-60px",
        },
        }
    })
)