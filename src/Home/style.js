import { makeStyles } from "@material-ui/core";
import { theme } from "../utils/theme";
export const homeStyle = makeStyles((theme) => ({
   homeWrapper:
   { 
   
    "& .heading":
    {
        backgroundColor: "rgb(149, 152, 191,.5)",
        height: "40px",
        paddingTop: "10px",
        color:"rgb(61, 38, 85)",
    },
    "& .btnCustom":
    {
        color:"primary",
    },
    "& .btnCustom:hover":{
        color:"secondary",
    },
    "& .select-style":{
        width: "100px",
        height:"35px",
        marginLeft: "60px",
    },
    "& .typography-style":{
        fontSize:"20px",
        fontWeight: "bold",
    },
    "& .pagination-style":{
        justifyContent:"center",
        marginLeft:"550px",
        marginTop:"40px",
        marginBottom:"40px",
    },
    "& .list-style-wrapper":{
        display: "flex",
        flexWrap: "wrap",
        margin: "0 -15px -30px",
        "@media (max-width: 1199px)": {
          margin: "0 -10px -30px",
        },
        "& .list-style":{
            maxWidth: "20%",
          flex: "0 0 25%",
          padding: "0 10px",
          marginBottom: "20px",
          "@media (max-width: 1199px)": {
            padding: "0 5px",
          },
          "& .list-inner-style":{
            border: "1px solid rgba(0,0,0,0.2)",
            borderRadius: "10px",
            width: "200px",
            height:"300px",
          },
          "& .image": {
            width: "100%",
            height: "70%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          },
          "& em": {
            display: "block",
            position: "relative",
            paddingBottom: "72.8%",
            borderRadius: "10px 10px 0 0",
            "@media (max-width: 479px)": {
              paddingBottom: "66%",
            },
            "& img": {
              position: "absolute",
              height: "100%",
              width: "100%",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              borderRadius: "10px 10px 0 0",
              objectFit: "cover",
            },
        },
        "& .content-wrapper": {
           
            "& h3": {
              fontSize: "19px",
              marginBottom: "2px",
              fontWeight: "700",
              lineHeight: "1",
              height: "17px",
              display: "-webkit-box",
              "-webkit-line-clamp": 1,
              "-webkit-box-orient": "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
              "@media (max-width: 767px)": {
                fontSize: "20px",
              },
              "@media (max-width: 574px)": {
                fontSize: "18px",
                marginBottom: "5px",
              },
            },
            "& .category": {
              display: "block",
              marginBottom: "7px",
              color:" rgb(12, 12, 12)",
              fontWeight: "500",
            },
            "& .description": {
                margin: "5px",
              fontSize: "14px",
              height: "25px",
              display: "-webkit-box",
              "-webkit-line-clamp": 2,
              "-webkit-box-orient": "vertical",
              textOverflow: "ellipsis",
              overflow: "hidden",
            },
            "& .price": {
              margin: "10px 0",
              fontSize: "14px",
              fontWeight: "700",
              "& .discount-price": {
                display: "block",
                color:" rgb(12, 12, 12)",
                fontWeight: "400",
                fontsize: "14px",
                "& del": {
                  marginRight: "5px",
                },
                "& .discount-percentage": {
                  color:"green",
                  fontWeight: "600",
                },
              },
            },
        },
    },
}
},
 }));