import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductCompare = () => {
  const { id } = useParams();
  const [productdata, setProductdata] = useState({});

  useEffect(() => {
    const getProductdata = async () => {
      const response = await axios.get(`http://localhost:3001/productdata/${id}`);
      setProductdata(response.data);
    };
    getProductdata();
  }, [id]);

  return (
    <div className="ProductCompare">
        <table>
            <tr><td rowspan="3"><img src={productdata.image} alt={productdata.name} width="120" height="100" /></td><td>G마켓</td><td></td></tr>
            <tr><td>쿠팡</td><td></td></tr>
            <tr><td>11번가</td><td></td></tr>
        </table>
    </div>
  );
};

export default ProductCompare;