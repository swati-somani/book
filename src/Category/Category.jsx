import { NavLink, useNavigate } from "react-router-dom";
import {categoryStyle} from "./style";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { RecordsPerPage, defaultFilter } from "../constants/constants";
import categoryService from "../service/category.service";
import { toast } from "react-toastify";
import ConfirmationDialog from "../ConfirmationDialog";
import { useAuthContext } from "../context/auth";

export const Category = () => {
    
    const classes = categoryStyle();
    const [filters,setFilters] = useState(defaultFilter);
    const [categoryList,setCategoryList] = useState({
        pageIndex: 0,
        pageSize: 8,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open,setOpen] = useState(false);
    const [selectedId,setSelectedId] = useState(0);
    //const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    // useEffect(()=>{
    //     getAllCategories();
    // },[]);

    const getAllCategories = (filters) =>{
        categoryService.getAll(filters).then((res)=>{
            if(res){
                setCategoryList(res);
            }
        });
    };

    useEffect(() =>{
        const timer = setTimeout(()=>{
            if(filters.keyword === "") delete filters.keyword;
            getAllCategories({...filters});
        },500);
        return () => clearTimeout(timer);
    },[filters]);


    const columns = [
        {id: "name",label: "Category Name",minWidth:100},
    ];

    const onConfirmDelete = () =>{
        categoryService.deleteCategory(selectedId).then((res)=>{
            toast.success("Record has been deleted..");
            setOpen(false);
            setFilters({...filters,pageIndex: 1});
        })
        .catch((e)=>toast.error("Something went wrong"));
    }
    return (
        <div className={classes.categorywrapper}>
            <div style={{marginTop:"30px"}}>
               <h3 className="heading">Category Page</h3>
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
                onClick={()=>navigate("/editCategory")}>Add</Button>
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
                            {categoryList?.items?.map((row, index)=>(
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="edit-btn-style"
                                        disableElevation
                                        onClick={()=>navigate(`/editCategory/${row.id}`)}>Edit</Button>
                                        
                                        <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="delete-btn-style"
                                        disableElevation
                                        onClick={()=>{
                                            setOpen(true);
                                            setSelectedId(row.id ?? 0);
                                        }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!categoryList.items.length && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography align="center">No Category Available</Typography>
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
                    count={categoryList.totalItems}
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
                    title="Delete Category"
                    description="Are you sure you want to delete this category?"></ConfirmationDialog>
            </div>

        </div>  
    );
};