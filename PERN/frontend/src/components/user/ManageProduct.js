import React, {useEffect, useState} from 'react';

const ManageProduct = () => {

    const [productList, setProductList] = useState([]);

    const getProductList = async () => {
        const response = await fetch("http://localhost:5000/product/getall");
        const data = await response.json();
        setProductList(data);
        console.log(data);
    }

    useEffect(() => {
        getProductList();
    }, [])
    

  return (
    <div>ManageProduct</div>
  )
}

export default ManageProduct