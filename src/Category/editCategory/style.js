import { makeStyles } from "@material-ui/core";
import { theme } from "../../utils/theme";

export const editCategoryStyle = makeStyles((theme)=>({
    editCategoryWrapper:{
        "& .heading":
        {
            backgroundColor: "rgb(149, 152, 191,.5)",
            height: "40px",
            paddingTop: "10px",
            color:"rgb(61, 38, 85)",
        },
        "& .btn-style":{
            marginLeft:"15px",
            marginBottom:"20px",
        },
        "& .form-style":{
            marginTop:"20px",
            fontSize:"12px",
            position:"relative",
            left:"-115px",
        },
        "& .textfield-style":{
            width:"300px",
        },
        "& .form-price-style":{
            marginTop:"20px",
            fontSize:"12px",
            position:"relative",
            left:"-125px",
        }
        }
    })
)