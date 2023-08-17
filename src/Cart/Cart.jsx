import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth"
import { useCartContext } from "../context/cart"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cartService from "../service/cart.services";
import { cartStyle } from "./style";
import shared from "../utils/shared";
import orderService from "../service/order.service";
import { Button, Typography, Card, CardMedia, CardContent } from "@material-ui/core";

export const Cart = () =>{
    const authContext = useAuthContext();
    const cartContext = useCartContext();
    const navigate= useNavigate();
    const [cartList,setCartList]= useState([]);
    const [itemsInCart,setItemsInCart] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const classes = cartStyle();

    const getTotalPrice = (itemList)=>{
        let totalPrice=0;
        itemList.forEach((item)=>{
            const itemPrice = item.quantity * parseInt(item.book.price);
            totalPrice = totalPrice+itemPrice;
        });
        setTotalPrice(totalPrice);
    }

    useEffect(()=>{
        setCartList(cartContext.cartData);
        setItemsInCart(cartContext.cartData.length);
        getTotalPrice(cartContext.cartData);
    },[cartContext.cartData]);

    const removeItem = async (id) => {
        try {
          const res = await cartService.removeItem(id);
          if (res) {
            cartContext.updateCart();
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };

    const updateQuantity = async(cartItem,inc)=>{
        const currentCount = cartItem.quantity;
        const quantity = inc? currentCount+1:currentCount-1;
        if(quantity === 0){
            toast.error("Item quantity should not be zero..");
            return;
        }
        try{
            const res = cartService.updateItem({
                id: cartItem.id,
                userId: cartItem.userId,
                bookId: cartItem.book.id,
                quantity,
            })
            if(res){
                const updatedCartList = cartList.map((item)=>
                item.id === cartItem.id? {...item,quantity}:item);
                cartContext.updateCart(updatedCartList);
                const updatedPrice = totalPrice + (inc?parseInt(cartItem.book.id):-parseInt(cartItem.book.id));
                setTotalPrice(updatedPrice);
            }
        }catch(error){
            toast.error("Somthing went wrong..");
        }
    }

    const placeOrder = async ()=>{
        const userCart = await cartService.getList(authContext.user.id);
      if (userCart.length) {
        try {
          let cartIds = userCart.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            navigate("/");
            toast.success("Order placed successfuly");
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }

    return(
        <div className={classes.cartwrapper}>
            <div>
            <h3 className="heading">Cart Page</h3>
            <div className="cart-heading-block">
          <h3>
            My Shopping Bag ({itemsInCart} Items)
            </h3>
          <div className="total-price">Total price: {totalPrice}</div>
        </div>
         <br></br>
                <br></br>
        <div className="cart-list-wrapper">
          {cartList.map((cartItem) => {
            return (
              <div key={cartItem.id}>
               
                <Card style={{height:"130px",width:"400px",marginBottom:"15px",marginLeft:"410px"}}>
                    <CardMedia component="img" style={{height:"130px", width:"130px"}} image={cartItem.book.base64image}>
                  {/* <Link>
                    <img src={cartItem.book.base64image} alt="dummy-pic" />
                  </Link> */}
                  </CardMedia>
                  <CardContent style={{position:"relative",top:"-140px",left:"220px"}}>
                  <Typography color="black" align="left" variant="body2" style={{fontSize:"16px"}}>
                  <b>{cartItem.book.name}</b>
                </Typography>
                
                <Typography color="black" align="left" variant="body2" style={{fontSize:"13px"}}>
                  MRP &#8377; {cartItem.book.price}
                </Typography>

                  
                    <div style={{position:"relative",left:"-160px"}}>
                      <Button
                        className="btn-style"
                        color="primary"
                        onClick={() => updateQuantity(cartItem, true)}
                      >
                        +
                      </Button>
                      <span className="number-count">{cartItem.quantity}</span>
                      <Button
                      color="primary"
                        className="btn-style"
                        onClick={() => updateQuantity(cartItem, false)}
                      >
                        -
                      </Button>
                    </div>
                    <Button onClick={() => removeItem(cartItem.id)} variant="outlined"
                      color="primary" style={{position:"relative",left:"-150px"}}>Remove</Button>
                </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="btn-wrapper">
          <Button variant="contained"
                      color="primary" onClick={placeOrder}>
            Place order
          </Button>
          <br></br>
          <br></br>
        </div>
            </div>
        </div>
    )
}