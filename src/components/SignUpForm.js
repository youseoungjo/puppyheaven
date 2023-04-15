import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddressInput from './AddressInput';
import axios from 'axios';


function SignUpForm() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [zonecode, setZonecode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');


    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    
    const navigate = useNavigate();

    const handleIdChange = (event) => {
      setId(event.target.value);
      const regex = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{7,24}$/;
      if(regex.test(event.target.value)) {
        setIdValid(true);
      } else {
        setIdValid(false);
      }
    }
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      const regex = /^.*(?=^.{7,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
      if(regex.test(event.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    }
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    }
  
    const handleBirthdayChange = (event) => {
      setBirthday(event.target.value);
    }
    const handleZonecodeChange = (event) => {
      event.preventDefault();
      setZonecode(event.target.value);
    }
    const handleAddressChange = (event) => {
      event.preventDefault();
      setAddress(event.target.value);
    }
    const handleDetailAddressChange = (event) => {
      event.preventDefault();
      setDetailAddress(event.target.value);
    }
    // const handleInputChange = (event) => {
    //   setZonecode(event.target);
    //   setAddress(event.target);
    //   setDetailAddress(event.target);
    // }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
        id: id,
        password: password,
        name: name,
        birthday: birthday,
        zonecode: zonecode,
        address: address,
        detailAddress: detailAddress
      };
      console.log(`submit! ${id} ${password} ${name} ${birthday} ${zonecode} ${address} ${detailAddress}`);
      console.log(data);

      axios.post('http://localhost:3001/signup', data)
      .then(response => {
        console.log(response.data);
        navigate('/')
      })
      .catch(error => {
        console.log('404error');
        if (error.response.status === 409) {
          alert('중복된 아이디입니다.');
        } else {
          alert('회원가입에 실패했습니다.');
        }
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="SignUp">
          <p>애견헤븐</p>
          <div className="form_wrap">
            <div className="id_form">
              <label>아이디</label>
              <input className="id_input" type="text" value={id} onChange={handleIdChange} />
              <div className="inputError">
              {
                !idValid && id.length > 0 && (
                  <div>7자 이상 24자 이하로 작성해주세요</div>
                )
              }  
            </div>
            </div>
            <div className="pw_form">
              <label>비밀번호</label>
              <input className="pw_input" type="password" value={password} onChange={handlePasswordChange} />
              <div className="inputError">
              {
                !pwValid && password.length > 0 && (
                  <div>영문, 숫자, 특수문자 모두 포함 8자 이상 입력</div>
                )
              }
            </div>
            
            </div>
            <div className="name_form">
              <label>이름</label>
              <input className="name_input" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="birth_form">
              <label>생년월일</label>
              <input className="birth_input" type="date" value={birthday} onChange={handleBirthdayChange} />
            </div>
            <div className="zonecode_form">
              <label>우편번호</label>
              <input className="zonecode_input" type="text" name="zonecode" value={zonecode} onChange={handleZonecodeChange} />
            </div>

            <div className="address_form">
              <label>주소</label>
              <input className="address_input" type="text" name="address" value={address} onChange={handleAddressChange} /> 
              <AddressInput setZonecode={setZonecode} setAddress={setAddress} setDetailAddress={setDetailAddress}/>
            </div>
            <div className="detailAddress_form">
              <label>상세 주소:</label>
              <input  className="detailAddress_input"type="text" name="detailAddress" value={detailAddress} onChange={handleDetailAddressChange} />
            </div>
            <div>
              <button type="submit">회원가입</button>
            </div>
            <div>
              <a href="/" class="link-light">로그인 화면으로 돌아가기</a>
            </div>
          </div>
        </div>
      </form>
    );
  }
export default SignUpForm;