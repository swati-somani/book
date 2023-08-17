import { Formik } from "formik";
import * as Yup from "yup";
import { authService } from "../service/auth.services";
import { toast } from "react-toastify";
import { Button,TextField } from "@material-ui/core";
import { useAuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { loginStyle } from "./style";

export const Login = () =>
{
    const classes= loginStyle();
    const initialValues ={
        email: "",
        password: "",
    }
    const navigate = useNavigate();
    const authContext = useAuthContext();

    const validationScheme = Yup.object().shape({
        email: Yup.string().required("Email is Required").email("Invalid email formate"),
        password: Yup.string()
        .required("Password is Required")
        .min(8, "Password must of minimum 8 characters"),
    })
    const onSubmit = (data) => {
        authService.login(data).then((res) => {
          toast.success("Successfully Login");
          authContext.setUser(res);
          console.log("result",res);
        });
    };

    return(
        <div>
            <Formik
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={onSubmit}>
            {
                ({
                    values,errors,handleChange,handleSubmit
                })=>{
                    return(
                        <form onSubmit={handleSubmit} className={classes.loginWrapper}>
                           <h3 className="heading">Login</h3>
                            <TextField name="email" variant="outlined" label="email" size="small" margin="dense" onChange={handleChange} ></TextField>
                                <br></br>
                                {errors.email ? errors.email : ""}
                                <br></br>
                            <TextField name="password" type="password" variant="outlined" label="password" size="small" margin="dense" onChange={handleChange} className="feild"></TextField>
                            <br></br>
                            {errors.password ? errors.password : ""}
                            <br></br>
                            <Button type="submit" variant="contained" color="primary"  className="btn-style" onClick={handleSubmit}>Login</Button>
                           
                        </form>
                    )
                }
            }</Formik>
        </div>
    )
}