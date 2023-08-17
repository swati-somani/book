import { useNavigate, useParams } from "react-router-dom";
import { editCategoryStyle } from "./style"
import { useEffect, useState } from "react";
import categoryService from "../../service/category.service";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../../ValidationErrorMessage/index";

export const EditCategory =() =>{

    const classes = editCategoryStyle();
    const navigate = useNavigate();
    const initialValues = {
        name: "",
    };

    const [initialValueState,setInitialValueState]= useState(initialValues);
    const {id} = useParams();

    const getCategoryById = ()=>{
        categoryService.getById(Number(id)).then((res)=>{
            setInitialValueState({
                id: res.id,
                name: res.name,
            })
        })
    }
    useEffect(()=>{
        if(id) getCategoryById();
    },[id]);

    const onSubmit = (values) =>{
        categoryService.save(values).then((res)=>{
            toast.success(
                values.id?"Record updated successfully" : "Recored added Successfilly"
            )
            navigate("/Category");
        })
        .catch((e) => toast.error("Fail to update record..."));
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Category Name is required"),
      });
    

    return(
        <div className={classes.editCategoryWrapper}>
            <div>
            <h3 className="heading">{id ? "Edit" : "Add"} Category</h3>
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
                                <InputLabel htmlFor="name" className="form-style">Category Name</InputLabel>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    className="textfield-style"
                                    inputProps={{style:{height:"0px"}}}
                                    value={values.name}
                                    onChange={handleChange}></TextField>
                                <ValidationErrorMessage>
                                    message={errors.name}
                                    touched={touched.name}
                                </ValidationErrorMessage>
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
                    navigate("/Category");
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