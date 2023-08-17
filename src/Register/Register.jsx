import { NavLink } from "react-router-dom";
import {Home} from "../Home/Home";
import { registerStyle } from "./style";
import { Button, Input, InputLabel, Select, TextField,MenuItem, FormControl } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { authService } from "../service/auth.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ValidationErrorMessage from "../ValidationErrorMessage/index";
export const Register = ()=>
{
    const classes = registerStyle();
    const navigate=useNavigate();
    const initialValues ={
        firstName: "",
        lastName: "",
        email: "",
        roleId: 0,
        password: "",
        confirmPassword: "",
    }
    const roleList = [
        { id: 2, name: "seller" },
        { id: 3, name: "buyer" },
      ];
    const validationScheme = Yup.object().shape({
        email: Yup.string().required("Email is Required").email("Invalid email formate"),
        password: Yup.string()
        .required("Password is Required")
        .min(8, "Password must of minimum 8 characters"),
        confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password"),null],
            "Password and Confirm Password should be same"
        )
        .required("Confirm Password is Required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Second Name is required"),
        roleId: Yup.string().required("Role Id is required"),
    })
    const onSubmit = (data) => {
        delete data.confirmPassword;
        authService.register(data).then((res) => {
        navigate("/login");
          toast.success("Successfully registered");
        });
    };
    return(
        <div>
            <Formik initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={onSubmit}>
                {
                    ({
                        values, errors,touched,handleChange,handleSubmit
                    })=>{
                        return(
                            <form onSubmit={handleSubmit} className={classes.registerWrapper}>
                                <h3 className="heading">Register</h3>
                            <div className="alcenter">
                            <div className="form-row-wrapper">
                                <div className="form-col-left">
                                <InputLabel htmlFor="firstName" className="input-style-left-col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;First Name</InputLabel>
                                <TextField name="firstName" variant="outlined"  className="textfeild-style" size="small" margin="dense" onChange={handleChange}></TextField>
                                <ValidationErrorMessage
                                    message={errors.firstName}
                                    touched={touched.firstName}
                                />
                                </div>
                                <div className="form-col-left">
                                <InputLabel htmlFor="lastName" className="input-style-right-col">Last Name</InputLabel>
                                <TextField name="lastName" variant="outlined" className="textfeild-style"  size="small" margin="dense" onChange={handleChange}></TextField>
                                <ValidationErrorMessage
                                    message={errors.lastName}
                                    touched={touched.lastName}
                                />
                                </div>
                                <div className="form-col-left">
                                <InputLabel htmlFor="email" className="input-style-left-col">Email</InputLabel>
                                <TextField name="email" variant="outlined" className="textfeild-style"  size="small" margin="dense" onChange={handleChange} ></TextField>
                                <ValidationErrorMessage
                                    message={errors.email}
                                    touched={touched.email}
                                />
                                </div>
                                <div className="form-col-left">
                                <FormControl>
                                <InputLabel htmlFor="select" label="sel" style={{marginTop:"25px"}}>Roles</InputLabel>
                                <Select name="roleId" label="roleId" onChange={handleChange} value={values.roleId} style={{width: "390px",marginTop:"50px"}}>
                                {roleList.length > 0 &&
                                roleList.map((role) => (
                                  <MenuItem
                                    value={role.id}
                                    key={"name" + role.id}
                                  >
                                    {role.name}
                                  </MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                                <ValidationErrorMessage
                                    message={errors.roleId}
                                    touched={touched.roleId}
                                />
                                </div>
                                <div className="form-col-left">
                                <InputLabel htmlFor="password" className="input-style-left-col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Password</InputLabel>
                                <TextField name="password" type="password" variant="outlined"  className="textfeild-style" size="small" margin="dense" onChange={handleChange}></TextField>
                                <ValidationErrorMessage
                                    message={errors.password}
                                    touched={touched.password}
                                />
                                </div>
                                <div className="form-col-left">
                                <InputLabel htmlFor="confirmPassword" className="input-style-left-col">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Confirm Password</InputLabel>
                                <TextField name="confirmPassword" type="password"  className="textfeild-style" variant="outlined"  size="small" margin="dense" onChange={handleChange}></TextField>
                                <ValidationErrorMessage
                                    message={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                />
                                </div>
                                </div>
                                </div>
                                <br></br>
                                <Button type="submit" variant="contained" color="primary" className="btn-style" onClick={handleSubmit}>Register</Button>
                                </form>
                        )
                    }
                }
           
            </Formik>
        </div>
    )
}