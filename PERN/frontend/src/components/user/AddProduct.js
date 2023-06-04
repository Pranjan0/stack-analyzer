import { useFormik } from "formik";
import React from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const productValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const AddProduct = () => {
  const productForm = useFormik({
    initialValues: {
      title: "",
      category: "",
      price: 0,
      image: "",
      created_at: new Date(),
    },
    onSubmit: async (formdata) => {
      console.log(formdata);
      const res = await fetch("http://localhost:5000/product/add", {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.status);

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add Product Successfull",
        });
      }
    },
  });

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                className="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
                alt="Sample photo"
              />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Add Products
                </h3>
                <form className="px-md-2" onSubmit={productForm.handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="form3Example1q">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={productForm.values.title}
                      onChange={productForm.handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="form3Example1q">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={productForm.values.category}
                      onChange={productForm.handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="form3Example1q">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={productForm.values.price}
                      onChange={productForm.handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="form3Example1q">
                      Image
                    </label>
                    <input
                      type="text"
                      id="image"
                      value={productForm.values.image}
                      onChange={productForm.handleChange}
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="btn btn-success btn-lg mb-1">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
