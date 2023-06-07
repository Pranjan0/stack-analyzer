import React, { useEffect, useState } from 'react'

const ProductListing = () => {

    const [productList, setProductList] = useState([]);
    
    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/product/getall');

        const {result} = await res.json();
        console.log(result);
        setProductList(result);
    }

    useEffect(() => {
      fetchProducts();
    }, [])
    

    const displayProducts = () => {
        return productList.map(product => (
            <div className="col-lg-4 col-md-12 mb-4">
        <div className="card">
          <div
            className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/belt.webp"
              className="w-100" alt=""
            />
            <a href="#!">
              <div className="mask">
                <div className="d-flex justify-content-start align-items-end h-100">
                  <h5>
                    <span className="badge bg-primary ms-2">New</span>
                  </h5>
                </div>
              </div>
              <div className="hover-overlay">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                />
              </div>
            </a>
          </div>
          <div className="card-body">
            <a href="" className="text-reset">
              <h5 className="card-title mb-3">{product.title}</h5>
            </a>
            <a href="" className="text-reset">
              <p>{product.category}</p>
            </a>
            <h6 className="mb-3">₹{product.price}</h6>
          </div>
        </div>
      </div>
        ))
    }

  return (
    <section style={{ backgroundColor: "#eee" }}>
  <div className="text-center container py-5">
    <h4 className="mt-4 mb-5">
      <strong>Bestsellers</strong>
    </h4>
    <div className="row">
      {displayProducts()}
  </div>
  </div>
</section>

  )
}

export default ProductListing