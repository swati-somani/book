import { useNavigate, useParams } from "react-router-dom";
import { editBookStyle } from "./style"
import { useEffect, useState } from "react";
import categoryService from "../../service/category.service";
import bookService from "../../service/book.service";
import { toast } from "react-toastify";
import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import ValidationErrorMessage from "../../ValidationErrorMessage/index";

export const EditBook =() =>{

    const classes = editBookStyle();
    const navigate = useNavigate();
    const [categories,setCategories]= useState([]);
    const initialValues = {
        name: "",
        price: "",
        categoryId: 0,
        description: "",
        base64image: "",
    };

    const [initialValueState,setInitialValueState]= useState(initialValues);
    const {id} = useParams();

    const getBookById = ()=>{
        bookService.getById(Number(id)).then((res)=>{
            setInitialValueState({
                id: res.id,
                name: res.name,
                price: res.price,
                categoryId: res.categoryId,
                description: res.description,
                base64image: res.base64image,
            })
        })
    }
    useEffect(()=>{
        if(id) getBookById();
        categoryService.getAll().then((res)=>{
            setCategories(res);
        })
    },[id]);

    const onSubmit = (values) =>{
        bookService.save(values).then((res)=>{
            toast.success(
                values.id?"Record updated successfully" : "Recored added Successfilly"
            )
            navigate("/Book");
        })
        .catch((e) => toast.error("Fail to update record..."));
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Book Name is required"),
        description: Yup.string().required("Description is required"),
        categoryId: Yup.number()
          .min(1, "Category is required")
          .required("Category is required"),
        price: Yup.number().required("Price is required"),
        base64image: Yup.string().required("Image is required"),
      });
    
    const onSelectFile = (e,setFieldValue,setFieldError) =>{
        const files = e.target.files;
        if(files?.length){
            const fileSelected= e.target.files[0];
            const fileNameArray = fileSelected.name.split(".");
            const extension = fileNameArray.pop();
            if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
                if (fileSelected.size > 50000) {
                  toast.error("File size must be less then 50KB");
                  return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(fileSelected);
                reader.onload = ()=>{
                    setFieldValue("base64image", reader.result);
                };
                reader.onerror = (error) =>{
                    throw error;
                }
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }   
        }else{
            setFieldValue("base64image", "");
        }
    }
    return(
        <div className={classes.editBookWrapper}>
            <div>
            <h3 className="heading">{id ? "Edit" : "Add"} Book</h3>
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
                                <InputLabel htmlFor="name" className="form-style">Book Name</InputLabel>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    className="textfield-style"
                                    inputProps={{style:{height:"0px"}}}
                                    value={values.name}
                                    onChange={handleChange}></TextField>
                                <ValidationErrorMessage>
                                    message={errors.price}
                                    touched={touched.price}
                                </ValidationErrorMessage>
                                <InputLabel htmlFor="price" className="form-price-style">Price</InputLabel>
                                <TextField
                                    type={"number"}
                                    name="price"
                                    variant="outlined"
                                    className="textfield-style"
                                    inputProps={{style:{height:"0px"}}}
                                    value={values.price}
                                    onChange={handleChange}
                                />
                                <ValidationErrorMessage
                                    message={errors.price}
                                    touched={touched.price}
                                />
                                <br></br>
                                <InputLabel htmlFor="select" className=" form-style">Category</InputLabel>
                                <FormControl variant="outlined">
                                
                                <Select
                                    name={"categoryId"}
                                    id={"category"}
                                    onChange={handleChange}
                                    value={values.categoryId}
                                    style={{width: "290px",height:"37px"}}
                                >
                                {categories?.map((rl) => (
                                    <MenuItem value={rl.id} key={"category" + rl.id}>
                                        {rl.name}
                                    </MenuItem>
                                ))}
                                </Select>
                                </FormControl>
                                <ValidationErrorMessage
                                    message={errors.categoryId}
                                    touched={touched.categoryId}
                                />
                                <br></br>
                                <br></br>
                                {!values.base64image && (
                    <>
                      {" "}
                      <label
                        htmlFor="file-select"
                      >
                        <Input
                          id="file-select"
                          type="file"
                          inputProps={{ className: "small" }}
                          className="textfield-style"
                          onChange={(e) => {
                            onSelectFile(e, setFieldValue, setFieldError);
                          }}
                        />
                        {/* <Button
                          variant="contained"
                          component="span"
                          className="btn pink-btn"
                        >
                          Upload
                        </Button> */}
                      </label>
                      <ValidationErrorMessage
                        message={errors.base64image}
                        touched={touched.base64image}
                      />
                    </>
                  )}
                  {values.base64image && (
                    <div className="uploaded-file-name">
                      <em>
                        <img src={values.base64image} alt="" />
                      </em>
                      image{" "}
                      <span
                        onClick={() => {
                          setFieldValue("base64image", "");
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}
                <InputLabel htmlFor="description" className=" form-style">Description</InputLabel>
                  <TextField
                    
                    name="description"
                    variant="outlined"
                    value={values.description}
                    inputProps={{style:{height:"0px"}}}
                    className="textfield-style"
                    onChange={handleChange}
                  />
                  <ValidationErrorMessage
                    message={errors.description}
                    touched={touched.description}
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
                    navigate("/book");
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