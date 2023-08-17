import { NavLink } from "react-router-dom";
import { homeStyle } from "./style";
import { Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from "@material-ui/core";
import { theme } from "../utils/theme";
import { useEffect, useMemo, useState } from "react";
import book2 from "../assets/book2.jpg";
import { useAuthContext } from "../context/auth";
import bookService from "../service/book.service";
import categoryService from "../service/category.service";
import { defaultFilter } from "../constants/constants";
import { Pagination } from "@material-ui/lab";
import { useCartContext } from "../context/cart";
import { toast } from "react-toastify";
import shared from "../utils/shared";

export const Home = () => {
    const classes = homeStyle();
    //const authContext = useAuthContext();
    const [bookResponse,setBookResponse] = useState({
        pageIndex: 0,
        pageSize: 8,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [categories,setCategories] = useState([]);
    const [sortBy,setSortBy] = useState("a-z");
    const [filters, setFilters] = useState(defaultFilter);
    const authContext = useAuthContext();
    const cartContext = useCartContext();

    useEffect(()=>{
        getAllCategories();
    },[]);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(filters.keyword === "") delete filters.keyword;
            searchAllBooks({...filters});
        },500);
        return () => clearTimeout(timer);
    },[filters]);

    const searchAllBooks = (filters) =>{
        bookService.getAll(filters).then((res)=>{
            setBookResponse(res);
        });
    };

    const getAllCategories = async () =>{
        await categoryService.getAll().then((res)=>{
            if(res){
              setCategories(res);
            }
        });
    };

    const books = useMemo(()=>{
        const bookList = [...bookResponse.items];
        if(bookList){
            bookList.forEach((element) =>{
                element.category = categories.find(
                    (a) =>a.id === element.categoryId
                )?.name;
            });
            return bookList;
        }
        return [];
    },[categories,bookResponse]);

    const sortBooks = (e) => {
        setSortBy(e.target.value);
        const bookList = [...bookResponse.items];
    
        bookList.sort((a, b) => {
          if (a.name < b.name) {
            return e.target.value === "a-z" ? -1 : 1;
          }
          if (a.name > b.name) {
            return e.target.value === "a-z" ? 1 : -1;
          }
          return 0;
        });
        setBookResponse({ ...bookResponse, items: bookList });
      };

      const addToCart = (book) => {
        shared.addToCart(book, authContext.user.id).then((res) => {
          if (res.error) {
            toast.error("Fail to add book in cart");
          } else {
            toast.success("Book added in cart successfully");
            cartContext.updateCart();
          }
        });
      };
   
    return (
        <>
        <ThemeProvider theme={theme}>
        <div className={classes.homeWrapper}>
        <h3 className="heading">Book Listing</h3>
        <Grid container>
            <Grid item xs={5}>
                <Typography className="typography-style" >
                    Total
                    <span> - {bookResponse.totalItems}items</span>
                </Typography>
            </Grid>
            <Grid item xs={7}>
            <TextField placeholder="Search here" variant="outlined" inputProps={{style:{height: "0px",fontSize:"14px"}}} 
            onChange={(e)=>{
                setFilters({
                    ...filters,
                    keyword: e.target.value,
                    pageIndex: 1,
                })
            }}></TextField>
            <FormControl  variant="outlined">
                <InputLabel htmlFor="select">Sort By</InputLabel>
                <Select className="select-style"
                onChange={sortBooks}
                value={sortBy}
                >
                    <MenuItem value="a-z">a - z</MenuItem>
                    <MenuItem value="z-a">z - a</MenuItem>
                </Select>
            </FormControl>
            </Grid>
        </Grid>
        <center>
        <div style={{marginTop:"40px",marginLeft:"135px"}}>
          <div className="list-style-wrapper">
            {books.map((book, index) => (
              <div className="list-style" key={index}>
                <div className="list-inner-style">
                  <em>
                    <img
                      src={book.base64image}
                      className="image"
                      alt="dummyimage"
                    />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3">{book.name}</Typography>
                    <span className="category">{book.category}</span>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <Button variant="contained" color="primary">
                      <span onClick={() => addToCart(book)} >
                        ADD TO CART
                      </span>
                      <span ></span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </center>
        <div className="pagination-style">
           <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          >
          </Pagination> 
          </div>
          </div>
        </ThemeProvider>
        </>

    );
};