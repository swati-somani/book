import { makeStyles } from "@material-ui/core";
export const categoryStyle = makeStyles((theme) => ({
   categorywrapper:
   { 
    "& .list":
    {
        height: "7vh",
    width: "60vh",
    borderRadius: "2px",
    marginBottom: "5px",
    marginLeft: "5px",
    border: "1px solid",
    borderColor: "rgb(61, 38, 85)",
    justifyContent: "center",
    paddingTop: "10px",
   fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
    },
    "& .heading":
    {
        backgroundColor: "rgb(149, 152, 191,.5)",
        height: "40px",
        paddingTop: "10px",
        color:"rgb(61, 38, 85)",
        fontWeight:"bold",
    },
    "& .add-btn":{
        marginLeft: "20px",
    },
    "& .search-style":{
        marginLeft:"650px",
    },
    "& .table-style":{
       maxWidth:"500px",
       marginLeft:"380px",
       marginTop:"30px",
    },
    "& .edit-btn-style":{
        marginRight:"20px",
        height:"30px",
    },
    "& .delete-btn-style":{
        height:"30px",
    },
    "& .pagination-style":{
        marginRight:"100px",
    }
},
 }));