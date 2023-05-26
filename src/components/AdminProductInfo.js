import React, { useState } from 'react'

const AdminProductInfo = () => {

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [imgFile, setImgFile] = useState('');
    const [age, setAge] = useState('');
    const [manufacturer, setMenufacturer] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [content, setContent] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }
    const handleManufacturerChange = (event) => {
        setMenufacturer(event.target.value);
    }
    const handleIngredientChange = (event) => {
        setIngredient(event.target.value);
    }
    const handleContentChange = (event) => {
        setContent(event.target.value);
    }
    const handleImgUrlChange = (event) => {
        setImgUrl(event.target.value);
        setImgFile('');
    }

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setImgFile(file.name);

        const reader = new FileReader();
        reader.onload = () => {
          const fileUrl = reader.result;
          setImgUrl(fileUrl);
        };
        reader.readAsDataURL(file);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            name: name,
            imgUrl: imgUrl,
            age: age,
            manufacturer: manufacturer,
            ingredient: ingredient,
            content: content,
        };
    }


    return (
        <div className='AdminProductInfo'>
            <div className='info_content'>
                <form onSubmit={handleSubmit}>
                    <div className="name_form">
                        <label>상품명</label>
                        <input className="name_input" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    {/* <div className="imgUrl_form">
                        <label>이미지 주소</label>
                        <div className="imgUrl_input_container">
                            <input
                            className="imgUrl_input"
                            type="text"
                            value={imgUrl}
                            onChange={handleImgUrlChange}
                            />
                            <input
                            className="file_input_hidden"
                            type="file"
                            id="fileInput"
                            onChange={handleFileInputChange}
                            />
                        </div>
                    </div> */}
                    <div className="imgUrl_form">
                        <label>이미지 주소</label>
                        <input
                        className="imgUrl_input"
                        type="text"
                        value={imgUrl}
                        onChange={handleImgUrlChange}
                        />
                    </div>
                    <div className="file_form">
                        <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileInputChange}
                        />
                        {/* <div>{fileName}</div> */}
                    </div>
                    <div className="age_form">
                        <label>연령</label>
                        <input className="age_input" type="text" value={age} onChange={handleAgeChange} />
                    </div>
                    <div className="manufacturer_form">
                        <label>제조사</label>
                        <input className="manufacturer_input" type="text" value={manufacturer} onChange={handleManufacturerChange} />
                    </div>
                    <div className="ingredient_form">
                        <label>주원료</label>
                        <input className="ingredient_input" type="text" value={ingredient} onChange={handleIngredientChange} />
                    </div>
                    <div className="content_form">
                        <label>특징</label>
                        <textarea className="content_input" type="text" value={content} onChange={handleContentChange} />
                    </div>


                    <div>
                        <button type="submit">상품 추가</button>
                    </div>

                </form>
            </div>
            
        </div>
    )
}

export default AdminProductInfo;