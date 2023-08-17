import { Home } from './Home/Home';
import { Book } from './Book/Book';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
import { Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/auth';
import { RoutePath } from './utils/enum';
import { EditBook } from './Book/editBook/editBook';
import { User } from './User/User';
import { EditUser } from './User/editUser/editUser';
import { Category } from './Category/Category';
import { EditCategory } from './Category/editCategory/editCategory';
import { Profile } from './Profile/Profile';
import { Cart } from './Cart/Cart';

const Redirect = (props) =>{
    return props.isLoggedIn? <props.component/> : <Navigate to = {RoutePath.Login}/>
}

export const Navigate = () => {

    const authContext = useAuthContext();
    return (
        <Routes>
        <Route path="/" element={<Home/>}/> 
           <Route path="/Home" element={<Redirect isLoggedIn={!!authContext.user.id} component={Home}/>}/>
           <Route path="/Book" element={<Redirect isLoggedIn={!!authContext.user.id} component={Book}/>}/>
           <Route path="/User" element={<Redirect isLoggedIn={!!authContext.user.id} component={User}/>}/>
           <Route path="/Category" element={<Redirect isLoggedIn={!!authContext.user.id} component={Category}/>}/>
           <Route path="/editCategory/:id" element={<Redirect isLoggedIn={!!authContext.user.id} component={EditCategory}/>}/>
           <Route path="/editCategory/" element={<Redirect isLoggedIn={!!authContext.user.id} component={EditCategory}/>}/>
           <Route path="/Cart" element={<Redirect isLoggedIn={!!authContext.user.id} component={Cart}/>}/>
           <Route path="/Login" element={<Login />}/>
           <Route path="/Profile" element={<Profile />}/>
           <Route path="/Register" element={<Register />}/>
           <Route path="/editBook/:id" element={<Redirect isLoggedIn={!!authContext.user.id} component={EditBook}/>}/>
           <Route path="/editBook/" element={<Redirect isLoggedIn={!!authContext.user.id} component={EditBook}/>}/>
           <Route path="/editUser/:id" element={<Redirect isLoggedIn={!!authContext.user.id} component={EditUser}/>}/>
           <Route path="/editUser/" element={<Redirect isLoggedIn={!!authContext.user.id} component={EditUser}/>}/>
         </Routes>
    );
};