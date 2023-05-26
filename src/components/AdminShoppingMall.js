import React,  {useState } from 'react'

const AdminShoppingMall = () => {

    const [shoppingMallName, setShoppingMallName] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [url, setUrl] = useState('');
    const [freight, setFreight] = useState('');
    const [weight, setWeight] = useState('');

    const handleShoppingMallNameChange = (event) => {
        setShoppingMallName(event.target.value);
    }
    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }
    const handleFreightChange = (event) => {
        setFreight(event.target.value);
    }
    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            shoppingMallName: shoppingMallName,
            productName: productName,
            price: price,
            url: url,
            freight: freight,
            weight: weight,
        };
    }


    return (
        <div className='AdminShoppingMall'>
            <div className='shoppingmall_content'>
                <form onSubmit={handleSubmit}>
                    <div className="shoppingMallName_form">
                        <label>쇼핑몰명</label>
                        <input className="shoppingMallName_input" type="text" value={shoppingMallName} onChange={handleShoppingMallNameChange} />
                    </div>
                    <div className="productName_form">
                        <label>상품명</label>
                        <input className="productName_input" type="text" value={productName} onChange={handleProductNameChange} />
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
                        <input className="freight_input" type="number" value={freight} onChange={handleFreightChange} />
                    </div>
                    <div className="weight_form">
                        <label>중량</label>
                        <input className="weight_input" type="number" value={weight} onChange={handleWeightChange} />
                    </div>

                    <div>
                        <button type="submit">추가하기</button>
                    </div>

                </form>
            </div>
        </div>
    )
}


export default AdminShoppingMall;