import React,  {useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminShoppingMall = () => {
    const navigate = useNavigate();

    const [store, setStore] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [deliveryFee, setDeliveryFee] = useState('');
    const [kg, setKg] = useState('');

    const handleStoreChange = (event) => {
        setStore(event.target.value);
        if (event.target.value==="11번가"){
            setImage("https://img.danawa.com/cmpny_info/images/TH201_logo.gif");
        } else if(event.target.value==="G마켓"){
            setImage("https://img.danawa.com/cmpny_info/images/EE128_logo.gif");
        } else if(event.target.value==="쿠팡"){
            setImage("https://img.danawa.com/cmpny_info/images/TP40F_logo.gif");
        }
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }
    const handleDeliveryFeeChange = (event) => {
        setDeliveryFee(event.target.value);
    }
    const handleKgChange = (event) => {
        setKg(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const malldata = {
            store: store,
            name: name,
            price: price,
            url: url,
            image: image,
            deliveryFee: deliveryFee,
            kg: kg,
        };
        console.log(`submit! ${store} ${name} ${price} ${url} ${image} ${deliveryFee} ${kg}`);
        console.log(malldata);
        axios.post('http://localhost:3001/mallregister', malldata)
        .then(response => {
          console.log(response.data);
          alert('쇼핑몰 상품이 등록 되었습니다!');
          navigate('/admin')
        })
        .catch(error => {
          console.log('404error');
        });
    }

    // const handleRemove = async (event) => {
    //     event.preventDefault();
    //     const removedata = {
    //         store: store,
    //         name: name,
    //         kg: kg,
    //     };
    //     console.log(`submit! ${name} ${kg}`);
    //     console.log(removedata);
    //     axios.post('http://localhost:3001/mallremove', removedata)
    //     .then(response => {
    //       console.log(response.data);
    //       alert('쇼핑몰 상품이 삭제 되었습니다!');
    //       navigate('/admin')
    //     })
    //     .catch(error => {
    //       console.log('404error');
    //     });
    // }


    return (
        <div className='AdminShoppingMall'>
            <div className='shoppingmall_content'>
                <form onSubmit={handleSubmit}>
                    <div className="shoppingMallName_form">
                        <label>쇼핑몰</label>
                        <select className="category_input" value={store} onChange={handleStoreChange}>
                            <option>쇼핑몰을 선택해주세요</option>
                            <option value="11번가">11번가</option>
                            <option value="G마켓">G마켓</option>
                            <option value="쿠팡">쿠팡</option>
                        </select>
                    </div>
                    <div className="productName_form">
                        <label>상품명</label>
                        <input className="productName_input" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="price_form">
                        <label>가격</label>
                        <input className="price_input" type="number" value={price} onChange={handlePriceChange} />
                    </div>
                    <div className="url_form">
                        <label>url</label>
                        <input className="url_input" type="text" value={url} onChange={handleUrlChange} />
                    </div>
                    <div className="freight_form">
                        <label>배달비</label>
                        <input className="freight_input" type="number" value={deliveryFee} onChange={handleDeliveryFeeChange} />
                    </div>
                    <div className="weight_form">
                        <label>중량</label>
                        <input className="weight_input" type="number" value={kg} onChange={handleKgChange} />
                    </div>

                    <div>
                        <button type="submit">쇼핑몰 상품 등록</button>
                    </div>
                </form>
                {/* <form onSubmit={handleRemove}>
                    <div className="shoppingMallName_form">
                        <label>삭제할 상품의 쇼핑몰</label>
                        <select className="category_input" value={store} onChange={handleStoreChange}>
                            <option>쇼핑몰을 선택해주세요</option>
                            <option value="11번가">11번가</option>
                            <option value="G마켓">G마켓</option>
                            <option value="쿠팡">쿠팡</option>
                        </select>
                    </div>
                    <div className="weight_form">
                        <label>삭제할 상품명</label>
                        <input className="productName_input" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="weight_form">
                        <label>삭제할 상품의 중량</label>
                        <input className="weight_input" type="number" value={kg} onChange={handleKgChange} />
                    </div>
                    <div>
                        <button type="submit">쇼핑몰 상품 삭제</button>
                    </div>
                </form> */}
            </div>
        </div>
    )
}


export default AdminShoppingMall;