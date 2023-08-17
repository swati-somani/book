import { AppBar, Button, List, ListItem, TextField } from "@material-ui/core"
import { Link, NavLink, useNavigate } from "react-router-dom"
import {RoutePath} from "../utils/enum"
import { headerStyle } from "./style"
import { useMemo, useState } from "react"
import shared from "../utils/shared"
import bookService from "../service/book.service"
import { useAuthContext } from "../context/auth"
import { useCartContext } from "../context/cart"
import { toast } from "react-toastify"

export const Header = () =>{
    const classes= headerStyle();
    const authContext = useAuthContext();
    const cartContext = useCartContext();
    const navigate = useNavigate();
    const [query,setQuery] = useState("");
    const [bookList, setbookList] = useState([]);
    const [openSearchResult, setOpenSearchResult] = useState(false);
    const items = useMemo(()=>{
        //return shared.NavigationItems;
        const itemList = shared.NavigationItems.filter(
            (item)=>
            !item.access.length || item.access.includes(authContext.user.roleId)
        )
        return itemList;
    },[authContext.user]);

    const signOut = () =>{
        authContext.logOut();
    } 

    const searchBook = async () =>
    {
        const res =  await bookService.searchBook(query);
        setbookList(res);
    };

    const search = () =>{
        document.body.classList.add("search-results-open");
        searchBook();
        setOpenSearchResult(true);
    };

    const addToCart = (book) => {
        if (!authContext.user.id) {
          navigate(RoutePath.Login);
          toast.error("Please login before adding books to cart");
        } else {
          shared.addToCart(book, authContext.user.id).then((res) => {
            if (res.error) {
              toast.error(res.error);
            } else {
              toast.success("Item added in cart");
              cartContext.updateCart();
            }
          });
        }
      };

    return(
            <div className={classes.headerWrapper}>
            <AppBar position="static" className="hstyle">
                
                <p><b>ReadSpot</b></p>
                <List className="nav-link-style">
                    {
                        !authContext.user.id && (
                            <>
                    <ListItem >
                    <NavLink to={RoutePath.Login} title="Login" style={{textDecoration:"none"}}>
                        Login
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to={RoutePath.Register} title="Register" style={{textDecoration:"none"}}>
                        Register
                    </NavLink>
                </ListItem>
                            </>
                        )
                    }
                {
                    items.map((item,index)=>(
                    <ListItem key={index}>
                        <NavLink to={item.route} title={item.name} style={{textDecoration:"none"}}>
                        {item.name}
                        </NavLink>
                    </ListItem>
                    ))
                }
                {/* {
                    authContext.user.id && (
                        <ListItem>
                            <Button variant="outlined" onClick={()=>signOut()}>Logout</Button>
                        </ListItem>
                    )
                } */}
                </List>
                
                <div
          onClick={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}
        ></div>
        <div className="search-style">
            <div className="textfield-style">
            <div className="text-wrapper">
           
           
        <TextField name="text" placeholder="What are you looking for.." variant="outlined" value={query} inputProps={{style:{height: "0px",fontSize:"14px"}}} onChange={(e)=>setQuery(e.target.value)}/>
            {
                openSearchResult && (
                    <>
                    <div className="product-listing">
                        {
                            
                            bookList?.length === 0 &&(
                                <p>No product Found</p>
                            )
                        }
                        <List>
                            {
                                bookList?.length> 0 && bookList.map((item,i)=>{
                                    return(
                                        <ListItem key={i}>
                                            <span>{item.name}</span>
                                            <p>{item.description}</p>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                        </div>
                    </>
                )
            }
            
           
            
            
            </div>
            </div>
            <Button type="submit" variant="contained" color="primary" onClick={search}>Search</Button>
            {
                    authContext.user.id && (
                        
                            <Button variant="outlined" className="btn-style" onClick={()=>signOut()}>Logout</Button>
                       
                    )
                }
                 <List style={{height:"0px"}}>
                    <ListItem >
                      <Link to="/Cart" title="Cart" style={{textDecoration:"none",border:"solid 1px",borderRadius:"5px",padding:"8px",paddingTop:"4px",marginTop:"-15px"}}>
                        Cart
                        <span> {cartContext.cartData.length}</span>
                      </Link>
                    </ListItem>
                  </List>
            </div>
           
            
                </AppBar>
              </div>
           
            
    )
}