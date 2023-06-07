import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import app_config from '../../config';

const ProductListing = () => {
  const [productList, setProductList] = useState([]);
  const { apiurl } = app_config;

  const fetchProducts = async () => {
    const res = await fetch(apiurl + '/product/getall');

    const { result } = await res.json();
    console.log(result);
    setProductList(result);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const res = await fetch(`${apiurl}/product/delete/${id}`, {
      method: 'DELETE'
    });

    const { result } = await res.json();
    console.log(result);
    fetchProducts();
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Delete Product Successfull'
    });
  };

  const displayProducts = () => {
    return productList.map((product) => (
      <tr>
        <td>
          <div className="d-flex align-items-center">
            <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style={{ width: '45px', height: '45px' }} className="rounded-circle" />
            <div className="ms-3">
              <p className="fw-bold mb-1">{product.title}</p>
            </div>
          </div>
        </td>
        <td>
          <p className="fw-normal mb-1">₹ {product.price}</p>
        </td>
        <td>
          <span className="badge badge-success rounded-pill d-inline">{product.category}</span>
        </td>
        <td>
          <button type="button" className="btn btn-primary btn-sm btn-rounded">
            {' '}
            <i className="fas fa-edit    "></i> Edit
          </button>
        </td>
        <td>
          <button type="button" className="btn btn-danger btn-sm btn-rounded" onClick={(e) => deleteProduct(product.id)}>
            {' '}
            <i className="fas fa-trash    "></i> Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#8cc8ff' }}>
      <header className="bg-dark">
        <div className="container py-5">
          <p className="display-4 fw-bold text-white">Manage Products</p>
        </div>
      </header>
      <div className="container mt-5">
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th className="text-center" colspan="2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{displayProducts()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListing;
