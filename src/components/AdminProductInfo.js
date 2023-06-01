import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminProductInfo = () => {
    const navigate = useNavigate();

    const [categoryid, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    // const [imgFile, setImgFile] = useState('');
    const [age, setAge] = useState('');
    const [maker, setMaker] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [content, setContent] = useState('');

    const handleCategoryIdChange = (event) => {
        const selectedCategoryId = event.target.value;
        setCategoryId(selectedCategoryId);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }
    const handleMakerChange = (event) => {
        setMaker(event.target.value);
    }
    const handleIngredientChange = (event) => {
        setIngredient(event.target.value);
    }
    const handleContentChange = (event) => {
        setContent(event.target.value);
    }
    const handleImageChange = (event) => {
        setImage(event.target.value);
        // setImgFile('');
    }

    // const handleFileInputChange = (event) => {
    //     const file = event.target.files[0];
    //     setImgFile(file.name);

    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const fileUrl = reader.result;
    //       setImage(fileUrl);
    //     };
    //     reader.readAsDataURL(file);
    // };



    const handleSubmit = async (event) => {
        event.preventDefault();
        const productdata = {
            categoryid: categoryid,
            name: name,
            image: image,
            age: age,
            maker: maker,
            ingredient: ingredient,
            content: content,
        };

        axios.post('http://localhost:3001/productregister', productdata)
        .then(response => {
          console.log(response.data);
          alert('상품이 등록 되었습니다!');
          navigate('/admin')
        })
        .catch(error => {
          console.log('404error');
        });
    }


    return (
        <div className='AdminProductInfo'>
            <div className='info_content'>
                <form onSubmit={handleSubmit}>
                    {/* <label>상품 등록</label> */}
                    <div className="name_form">
                        <label>카테고리</label>
                        <select className="category_input" value={categoryid} onChange={handleCategoryIdChange}>
                            <option>카테고리를 선택해주세요</option>
                            <option value="1">애견 사료</option>
                            <option value="2">애견 장난감</option>
                            <option value="3">애견 용품</option>
                        </select>
                    </div>
                    <div className="name_form">
                        <label>상품명</label>
                        <input className="name_input" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="imgUrl_form">
                        <label>이미지 주소</label>
                        <input
                        className="imgUrl_input"
                        type="text"
                        value={image}
                        onChange={handleImageChange}
                        />
                    </div>
                    {/* <div className="file_form">
                        <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileInputChange}
                        />
                        {/* <div>{fileName}</div> */}
                    {/* </div> */}
                    <div className="age_form">
                        <label>연령</label>
                        <input className="age_input" type="text" value={age} onChange={handleAgeChange} />
                    </div>
                    <div className="manufacturer_form">
                        <label>제조사</label>
                        <input className="manufacturer_input" type="text" value={maker} onChange={handleMakerChange} />
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
                        <button type="submit">상품 등록</button>
                    </div>

                </form>
            </div>
            
        </div>
    )
}

export default AdminProductInfo;
