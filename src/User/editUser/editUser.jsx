import { useNavigate, useParams } from "react-router-dom";
import { editUserStyle } from "./style"
import { useEffect, useState } from "react";
import categoryService from "../../service/category.service";
import userService from "../../service/user.services";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../../ValidationErrorMessage/index";

export const EditUser =() =>{

    const classes = editUserStyle();
    const navigate = useNavigate();
    const [categories,setCategories]= useState([]);
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    };

    const [initialValueState,setInitialValueState]= useState(initialValues);
    const {id} = useParams();

    const getUserById = ()=>{
        userService.getById(Number(id)).then((res)=>{
            setInitialValueState({
                id: res.id,
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                role: res.role,
            })
        })
    }
    useEffect(()=>{
        if(id) getUserById();
        // categoryService.getAll().then((res)=>{
        //     setCategories(res);
        // })
    },[id]);

    const onSubmit = (values) =>{
        userService.save(values).then((res)=>{
            toast.success(
                values.id?"Record updated successfully" : "Recored added Successfilly"
            )
            navigate("/Book");
        })
        .catch((e) => toast.error("Fail to update record..."));
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Book Name is required"),
        lastName: Yup.string().required("Description is required"),
        email: Yup.string()
          .required("Category is required"),
        role: Yup.string().required("Price is required"),
      });

      const roleList = [
        { id: 1, name: "Admin" },
        { id: 2, name: "seller" },
        { id: 3, name: "buyer" },
      ];
    
    return(
        <div className={classes.editUserWrapper}>
            <div>
            <h3 className="heading">{id ? "Edit" : "Add"} User</h3>
            <Formik
                initialValues={initialValueState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldError,
                        setFieldValue,
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
                  <FormControl>
                                <InputLabel htmlFor="select" label="sel" style={{marginTop:"25px"}}>Roles</InputLabel>
                                <Select name="role" label="roleId" onChange={handleChange} value={values.role} style={{width: "225px",marginTop:"50px"}}>
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
                                    message={errors.role}
                                    touched={touched.role}
                                />
                  <br></br>
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
                    navigate("/user");
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