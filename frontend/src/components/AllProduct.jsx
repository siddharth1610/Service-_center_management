import axios from "axios";
import React, { useEffect, useState } from "react";
import {ProductCard} from "./ProductCard"

const AllProduct = ({ title }) => {
const [products,setProduct] = useState([])
useEffect(() => {
  const fetchproduct = async () => {
    const { data } = await axios.get("http://localhost:8000/api/v1/product/allProduct", {
      withCredentials: true,
    });
    setProduct(data.data);
    console.log(data.data);
  };
  fetchproduct();
}, []);
  



  return (
    <>
      <div style={{display:"flex",justifyContent:"space-evenly",marginLeft:"40px"}}>
        
        
        {
          products.map((item)=>{
            return(
              <ProductCard {...item} key={item._id} />
            )
          })
        }
      </div>
    </>
  );
};

export default AllProduct;
