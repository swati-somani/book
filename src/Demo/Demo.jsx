import { NavLink } from "react-router-dom";
import {bookStyle} from "./style";
import { Button, Card, CardActions, CardContent, CardMedia, ThemeProvider, Typography } from "@material-ui/core";
import book2 from "../assets/book2.jpg";
import { useState } from "react";

export const Demo = () => {
    const Book1="Gathering Bloosom Under Fire";
    const Book2="Becoming by Michelle Obama";
    const Book3="Fable by Adrienne Young";
    const array1 =[Book1,Book2,Book3];
    const classes = bookStyle();
    const [x,setX]=useState(0);
    const [isHover, setIsHover]=useState(false);
    const mEnter= ()=>{
        setIsHover(true);
    };
    const mLeave= ()=>{
        setIsHover(false);
    };
    const [hover, setHover]=useState(false);
    const Enter= ()=>{
        setHover(true);
    };
    const Leave= ()=>{
        setHover(false);
    };
    return (
        <div className={classes.wrapper}>
            <h3 className="heading"><center>Book Listing</center></h3>
            <center>
            {
                array1.map((item)=>
                {
                    return <div className="list">{item}</div>
                })
            }
        </center>
        <Button onClick={()=>setX(x+1)} style={{color: isHover ? 'rgb(61, 38, 85)' : 'rgb(149, 152, 191)'}} onMouseEnter={mEnter} onMouseLeave={mLeave}>Increment</Button>
        {x}
        <Button onClick={()=>setX(x-1)} style={{color: hover ? 'rgb(61, 38, 85)' : 'rgb(149, 152, 191)'}} onMouseEnter={Enter} onMouseLeave={Leave}>Decrement</Button>
        <center>
            <Card style={{height:"200px",width:"180px",marginTop:"8px"}}>
            <CardMedia component="img" height="70px" image={book2}/>
            <CardContent>
                <Typography color="primary" align="left" variant="body2" style={{fontSize:"10px"}}>
                    Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" variant="contained" style={{fontSize:"10px", marginLeft:"5px"}}>Buy Now</Button>
            </CardActions>
        </Card>
        </center>
        </div>
    );
};