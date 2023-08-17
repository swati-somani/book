import cartService from "../service/cart.services";
import { Role, RoutePath } from "./enum";

const NavigationItems= [
    {
        name: "Users",
        route: RoutePath.User,
        access: [Role.Admin],
    },
    {
        name: "Categories",
        route: RoutePath.Category,
        access: [Role.Admin,Role.Seller],
    },
    {
        name: "Books",
        route: RoutePath.Book,
        access: [Role.Admin,Role.Seller],
    },
    {
        name: "Profile",
        route: RoutePath.Profile,
        access: [Role.Admin,Role.Buyer,Role.Seller],
    },
    {
        name: "Home",
        route: RoutePath.Home,
        access: [Role.Admin,Role.Buyer,Role.Seller],
    }
];

const LocalStorageKeys = {
    USER: "user",
  };

const hasAccess = (pathname,user) =>{
    const navItem = NavigationItems.find((navItem)=>
    pathname.includes(navItem.route)
    );
    if(navItem)
    {
        return(
            !navItem.access || !!(navItem.access && navItem.access.includes(user.roleId))
        )
    }
    return true;
}

const addToCart = async(book,id)=>{
    return cartService
    .add({
        userId:id,
        bookId:book.id,
        quantity:1,
    })
    .then((res)=>{
        return {error: false,message: "Item added in cart"};
    }).catch((e)=>{
        if(e.status ===500)
        {
            return {error: true,message: "Item already in cart"};
        }
        else{
            return {error: true,message: "Something went wrong"};
        }
    })
}

export default {
    addToCart,
    hasAccess,
    NavigationItems,
    LocalStorageKeys
}