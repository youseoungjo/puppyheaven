import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';


function AddressInput(props) {
  const { setZonecode } = props;
  const { setAddress } = props;
  const { setDetailAddress } = props;

  const handleComplete = (data) => {
    setZonecode(data.zonecode);
    setAddress(data.address);
    setDetailAddress('');
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