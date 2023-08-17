import { makeStyles } from "@material-ui/core";
import { theme } from "../utils/theme";

export const loginStyle = makeStyles((theme)=>({
    loginWrapper:{
        "& .form-style":{
            justifyContent:"left",
        },
        "& .heading":
    {
        backgroundColor: "rgb(149, 152, 191,.5)",
        height: "40px",
        paddingTop: "10px",
        color:"rgb(61, 38, 85)",
        fontWeight:"bold",
    },
    "& .btn-style":{
        marginBottom:"20px",
      },
    }
}))