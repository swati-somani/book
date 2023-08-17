import { makeStyles } from "@material-ui/core";
import { theme } from "../utils/theme";

export const headerStyle = makeStyles((theme)=>({
    headerWrapper:{
        "& .hstyle":{
            height: "50px",
            backgroundColor: "white",
            paddingLeft: "30px",
            boxShadow: "none",
        },
        "& p":{
            position: "absolute",
            top: "8px",
            left:"20px",
            color: "#090909",
            fontSize: "15px",
        },
        "& .nav-link-style":{
            position: "absolute",
            top: "8px",
            left: "100px",
            display:"flex",
           flexDirection: "row",
           color: "primary",
           fontFamily: "Times New Roman",
        },
        "& .search-style":{
            display:"flex",
           flexDirection: "row",
           //backgroundColor: "rgb(149, 152, 191,.2)",
           paddingTop: "13px",
           paddingBottom: "13px",
           paddingRight: "40px",
           justifyContent: "right",
           
        },
        "& .btn-style":{
            width:"100px",
            marginLeft:"10px",
        },
        "& .textfield-style":{
            marginRight: "10px",
        },
        "& .text-wrapper": {
            flex: "1",
            position: "relative",
            "& .product-listing": {
              // display: "none",
              position: "absolute",
              left: "0",
              right: "0",
              background: "white",
              zIndex: "9",
              borderRadius: "4px",
              padding: "15px",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              "& .no-product": {
                color:"black",
                fontWeight: "500",
                padding: "5px",
              },
            },
        },
    },
}))