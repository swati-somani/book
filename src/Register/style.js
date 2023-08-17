import { makeStyles } from "@material-ui/core";
import { theme } from "../utils/theme";
export const registerStyle = makeStyles((theme) => ({
    registerWrapper:{
        "& .alcenter":{
            marginLeft:"150px",
        },
        "& .heading":
    {
        backgroundColor: "rgb(149, 152, 191,.5)",
        height: "40px",
        paddingTop: "10px",
        color:"rgb(61, 38, 85)",
        fontWeight:"bold",
    },
        "& .textfeild-style":{
            width:"400px",
            margin:"10px",
           
        },
        "& .btn-style":{
          marginBottom:"20px",
        },
        "& .input-style-left-col":{
            fontSize:"13px",
            position:"relative",
            left:"-180px",
            marginTop:"20px",
        },
        "& .input-style-right-col":{
          fontSize:"13px",
          position:"relative",
          left:"-165px",
          marginTop:"20px",
      },
        "& .form-row-wrapper": {
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "85%",
            justifyContent: "left",      
            },

            "& .form-col-left": {
              //padding: "15px",
              //maxWidth: "50%",
              flex: "50%",
              },
              "@media(max-width:767px)": {
                maxWidth: "100%",
                flex: "0 0 100%",
              },
              "& p": {
                color: "red",
                fontWeight: 300,
                fontSize: "15px",
                marginBottom: "16px",}
            },
    }
  ));