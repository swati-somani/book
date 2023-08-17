import { NavLink, useNavigate } from "react-router-dom";
import {bookStyle} from "./style";
import { Button, Card, CardActions, CardContent, CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { RecordsPerPage, defaultFilter } from "../constants/constants";
import categoryService from "../service/category.service";
import bookService from "../service/book.service";
import { toast } from "react-toastify";
import ConfirmationDialog from "../ConfirmationDialog";

export const Book = () => {
    
    const classes = bookStyle();
    const [filters,setFilters] = useState(defaultFilter);
    const [bookRecords,setBookRecords] = useState({
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

    useEffect(()=>{
        getAllCategories();
    },[]);

    const getAllCategories = async () =>{
        await categoryService.getAll().then((res)=>{
            if(res){
                setCategories(res);
            }
        });
    };

    useEffect(() =>{
        const timer = setTimeout(()=>{
            if(filters.keyword === "") delete filters.keyword;
            searchAllBooks({...filters});
        },500);
        return () => clearTimeout(timer);
    },[filters]);

    const searchAllBooks = (filters)=>{
        bookService.getAll(filters).then((res)=>{
            setBookRecords(res);
        });
    };

    const columns = [
        {id: "name",label: "Book Name",minWidth:100},
        {id: "price",label: "Price",minWidth:100},
        {id: "category",label: "Category",minWidth:100},
    ];

    const onConfirmDelete = () =>{
        bookService.deleteBook(selectedId).then((res)=>{
            toast.success("Record has been deleted..");
            setOpen(false);
            setFilters({...filters,pageIndex: 1});
        })
        .catch((e)=>toast.error("Something went wrong"));
    }
    return (
        <div className={classes.bookwrapper}>
            <div style={{marginTop:"30px"}}>
               <h3 className="heading">Book Page</h3>
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
                onClick={()=>navigate("/editBook")}>Add</Button>
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
                            {bookRecords?.items?.map((row, index)=>(
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                    {categories.find((c) => c.id === row.categoryId)?.name}
                                    </TableCell>
                                    <TableCell>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className="edit-btn-style"
                                        disableElevation
                                        onClick={()=>navigate(`/editBook/${row.id}`)}>Edit</Button>
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
                            {!bookRecords.items.length && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Typography align="center">No Books Available</Typography>
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
                    count={bookRecords.totalItems}
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