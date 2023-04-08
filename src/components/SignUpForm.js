import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddressInput from './AddressInput';
import axios from 'axios';


function SignUpForm() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    //const [address, setAddress] = useState({ zonecode: '', address: '', detailAddress: '' });

    const navigate = useNavigate();

    const handleIdChange = (event) => {
      setId(event.target.value);
    }
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    }
  
    const handleBirthdayChange = (event) => {
      setBirthday(event.target.value);
    }
    //const handleInputChange = (event) => {
      //const { name, value } = event.target;
      //setAddress({ ...address, [name]: value });
    //}
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
      id: id,
      password: password,
      name: name,
      birthday: birthday,
      //address: address
      };
      console.log(`submit! ${id} ${password} ${name} ${birthday}`);
      console.log(data);

      axios.post('http://localhost:3001/signup', data)
      .then(response => {
      console.log(response.data);
      navigate('/')
      })
      .catch(error => {
      console.log('404error');
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
            </div>
            <div className="pw_form">
              <label>비밀번호</label>
              <input className="pw_input" type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="name_form">
              <label>이름</label>
              <input className="name_input" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="birth_form">
              <label>생년월일</label>
              <input className="birth_input" type="date" value={birthday} onChange={handleBirthdayChange} />
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