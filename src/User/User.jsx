import { NavLink, useNavigate } from "react-router-dom";
import {userStyle} from "./style";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { RecordsPerPage, defaultFilter } from "../constants/constants";
import categoryService from "../service/category.service";
import userService from "../service/user.services";
import { toast } from "react-toastify";
import ConfirmationDialog from "../ConfirmationDialog";
import { useAuthContext } from "../context/auth";

export const User = () => {
    
    const classes = userStyle();
    const authContext = useAuthContext();
    const [filters,setFilters] = useState(defaultFilter);
    const [userList,setUserList] = useState({
        pageIndex: 0,
        pageSize: 8,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open,setOpen] = useState(false);
    const [selectedId,setSelectedId] = useState(0);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     getAllCategories();
    // },[]);

    // const getAllCategories = async () =>{
    //     await categoryService.getAll().then((res)=>{
    //         if(res){
    //             setCategories(res);
    //         }
    //     });
    // };

    useEffect(() =>{
        const timer = setTimeout(()=>{
            if(filters.keyword === "") delete filters.keyword;
            searchAllUser({...filters});
        },500);
        return () => clearTimeout(timer);
    },[filters]);

    const searchAllUser = (filters)=>{
        userService.getAll(filters).then((res)=>{
            setUserList(res);
        });
    };

    const columns = [
        {id: "firstName",label: "First Name",minWidth:100},
        {id: "lastName",label: "Last Name",minWidth:100},
        {id: "email",label: "Email",minWidth:100},
        {id: "role",label: "Role",minWidth:100},
    ];

    const onConfirmDelete = () =>{
        userService.deleteBook(selectedId).then((res)=>{
            toast.success("Record has been deleted..");
            setOpen(false);
            setFilters({...filters,pageIndex: 1});
        })
        .catch((e)=>toast.error("Something went wrong"));
    }
    return (
        <div className={classes.userwrapper}>
            <div style={{marginTop:"30px"}}>
               <h3 className="heading">User Page</h3>
                <div className="search-style">
                <TextField placeholder="Search here" variant="outlined" inputProps={{style:{height: "0px",width:"300px",fontSize:"14px"}}} 
            onChange={(e)=>{
                setFilters({
                    ...filters,
                    keyword: e.target.value,
                    pageIndex: 1,
                })
            }}></TextField>
            <Button
                type="button"
                variant="contained"
                color="primary"
                className="add-btn"
                disableElevation
                onClick={()=>navigate("/editUser")}>Add</Button>
                </div>
                <TableContainer className="table-style">
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow>
                            {columns.map((column)=>(
                                <TableCell
                                    key={column.id}
                                    style={{minWidth:"100px",fontWeight:"bold"}}>
                                    {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList?.items?.map((row, index)=>(
                                <TableRow key={row.id}>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="edit-btn-style"
                                        disableElevation
                                        onClick={()=>navigate(`/editUser/${row.id}`)}>Edit</Button>
                                        {row.id !== authContext.user.id && (
                                        <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="delete-btn-style"
                                        disableElevation
                                        onClick={()=>{
                                            setOpen(true);
                                            setSelectedId(row.id ?? 0);
                                        }}>Delete</Button>)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!userList.items.length && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography align="center">No User Available</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    className="pagination-style"
                    rowsPerPageOptions={RecordsPerPage}
                    component="div"
                    count={userList.totalItems}
                    rowsPerPage={filters.pageSize || 0}
                    page={filters.pageIndex - 1}
                    onPageChange={(e,newPage)=>{
                        setFilters({...filters,pageIndex:newPage + 1});
                    }}
                    onRowsPerPageChange={(e)=>{
                        setFilters({
                            ...filters,
                            pageIndex: 1,
                            pageSize: Number(e.target.value),
                        });
                    }}>
                </TablePagination>
                <ConfirmationDialog
                    open={open}
                    onClose={()=>setOpen(false)}
                    onConfirm={()=>onConfirmDelete()}
                    title="Delete Book"
                    description="Are you sure you want to delete this book?"></ConfirmationDialog>
            </div>

        </div>  
    );
};