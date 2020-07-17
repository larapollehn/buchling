import React, {useEffect, useState} from "react";
import axios from "axios";

import Layout from "../base/Layout";
import localStorageManager from "../utils/LocalStorageManager";
import log from "../utils/Logger";

/**
 * https://app.swaggerhub.com/apis/larapollehn/buchling/1.0.0#/product/post_product_create__userId_
 */
const CreateProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        quantity: "",
        error: "",
        success: false,
        createdProduct: "",
        formData: ""
    });

    const {user, token} = localStorageManager.getUser();
    const {
        name,
        description,
        price,
        category,
        quantity,
        error,
        createdProduct,
        success,
        formData
    } = values;

    useEffect(() => {
        setValues({...values, formData: new FormData()});
    }, []);

    const handleChange = targetValue => event => {
        const value =
            targetValue === "photo" ? event.target.files[0] : event.target.value;
        if (targetValue === "photo"){
            formData.set(targetValue, value);
        } else {
            formData.set(targetValue, value);
        }
        setValues({...values, [targetValue]: value});
    }

    const submitProduct = (event) => {
        event.preventDefault();
        setValues({...values, error: ""});
        log.debug(formData);
        axios({
            method: 'POST',
            url: `/api/product/create/${user._id}`,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
            data: formData
        }).then((response) => {
            log.debug("Created a new product:", response.data);
            setValues({
                ...values,
                name: "",
                description: "",
                photo: "",
                price: "",
                quantity: "",
                success: true,
                createdProduct: response.data.name});
        }).catch((error) => {
            log.debug("New Category could not be created:", error.response.data.error);
            setValues({...values, error: error.response.data.error, success: false})
        })
    }

    const showError = () => (
        <div className="alert alert-danger" role="alert" style={{display: error ? '' : "none"}}>
            {error}!
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" role="alert" style={{display: success ? '' : "none"}}>
            Product "{createdProduct}" was successfully created.
        </div>
    );

    const newProductForm = () => (
        <form onSubmit={submitProduct}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")} type="file" className="form-control"
                    />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input onChange={handleChange("name")} type="text" className="form-control" value={name} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={handleChange("description")} type="text" className="form-control" value={description} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange("price")} type="number" className="form-control" value={price} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <input onChange={handleChange("category")} type="text" className="form-control" value={category} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange("quantity")} type="number" className="form-control" value={quantity} required/>
            </div>
            <button type="submit" className="btn btn-primary">Create Product</button>
        </form>
    )

    return (
        <div>
            <Layout
                title="Create new Product"
                description="Create as many new products as needed."
                className="container col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {newProductForm()}
            </Layout>
        </div>
    )
}

export default CreateProduct;
