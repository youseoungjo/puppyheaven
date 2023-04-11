import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';


function AddressInput(props) {
  const { setAddress } = props;

  const handleComplete = (data) => {
    setAddress({
      zonecode: data.zonecode,
      address: data.address,
      detailAddress: '',
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    new window.daum.Postcode({
      oncomplete: handleComplete,
    }).open();
    return false;
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>주소 검색</button>
    </div>
  );
}
  
  export default AddressInput;