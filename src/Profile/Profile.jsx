import { useNavigate, useParams } from "react-router-dom";
import { profileStyle } from "./style"
import { useEffect, useState } from "react";
import userService from "../service/user.services";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../ValidationErrorMessage/index";
import { useAuthContext } from "../context/auth";

export const Profile =() =>{

    const classes = profileStyle();
    const navigate = useNavigate();
    const authContext= useAuthContext();
    const initialValueState = {
        email:authContext.user.email,
        firstName:authContext.user.firstName,
        lastName:authContext.user.lastName,
        newPassword:"",
        confirmPassword:"",
    };

    const [updatePassword,setUpdatePassword]= useState(false);

    const onSubmit = async (values) =>{
        const password = values.newPassword? values.newPassword : authContext.password;
        delete values.confirmPassword;
        delete values.newPassword;
        const data= Object.assign(authContext, {...values,password});
        delete data._id;
        delete data.__v;
        try{
            const res= await userService.save(data);
            if(res){
                authContext.setUser(res);
                toast.success("Profile Updated....");
                navigate("/");
            }
        }catch(error){
            toast.error("Fail to update profile....");
        }
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address format")
          .required("Category is required"),
        firstName: Yup.string().required("Book Name is required"),
        lastName: Yup.string().required("Description is required"),
        newPassword: Yup.string().min(8,"Minimum 8 characters required"),
        confirmPassword: updatePassword ? Yup.string().required("Must required").oneOf([Yup.ref("newPassword")],"Password is not match"):
        Yup.string().oneOf([Yup.ref("newPassword")],"Password is not match"),
      });
    
    return(
        <div className={classes.editProfileWrapper}>
            <div>
            <h3 className="heading">Update Profile</h3>
            <Formik
                initialValues={initialValueState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validator={()=>({})}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    })=>(
                        <form onSubmit={handleSubmit} >
                            <div>
                                <InputLabel htmlFor="firstName" className="form-style">First Name</InputLabel>
                                <TextField
                                    name="firstName"
                                    variant="outlined"
                                    inputProps={{style:{height:"0px"}}}
                                    value={values.firstName}
                                    onChange={handleChange}></TextField>
                                <ValidationErrorMessage>
                                    message={errors.firstName}
                                    touched={touched.firstName}
                                </ValidationErrorMessage>
                                <InputLabel htmlFor="lastName" className=" form-style">Last Name</InputLabel>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    inputProps={{style:{height:"0px"}}}
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                <ValidationErrorMessage
                                    message={errors.lastName}
                                    touched={touched.lastName}
                                />
                                <br></br>
                                
                <InputLabel htmlFor="email" className="form-email-style">Email</InputLabel>
                  <TextField
                    
                    name="email"
                    variant="outlined"
                    value={values.email}
                    inputProps={{style:{height:"0px"}}}
                    
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.email}
                    touched={touched.email}
                  />
                  <br></br>
                  <InputLabel htmlFor="newPassword" className="form-newpassword-style">New Password</InputLabel>
                  <TextField
                    
                    name="newPassword"
                    variant="outlined"
                    value={values.newPassword}
                    inputProps={{style:{height:"0px"}}}
                    
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.newPassword}
                    touched={touched.newPassword}
                  />
                  <br></br>
                  <InputLabel htmlFor="confirmPassword" className="form-password-style">Confirm Password</InputLabel>
                  <TextField
                    
                    name="confirmPassword"
                    variant="outlined"
                    value={values.confirmPassword}
                    inputProps={{style:{height:"0px"}}}
                    
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                   <br></br>
                  <Button
                  className="btn-style"
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  Save
                </Button>
                <Button
                  className="btn-style"
                  variant="contained"
                  type="button"
                  color="primary"
                  disableElevation
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </Button>
                </div>
            </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}