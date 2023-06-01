import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {

  const admin = {
    id : 'admin',
    pw : '1234'
  }

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const navigate = useNavigate();
  const logoOnClick = () => {
    navigate('/');
  };

  const handleInputId = (e) => {
    setInputId(e.target.value);
    const regex = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{7,24}$/;
    if(regex.test(inputId)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    const regex = /^.*(?=^.{7,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(regex.test(inputPw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  

  const onClickLoginButton = async () => {
    if(inputId === admin.id && inputPw === admin.pw){
      alert('관리자 로그인에 성공했습니다.');
      navigate("/admin");
    } else {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        id: inputId,
        pw: inputPw,
      });
      if (response.data.success) {
        //토큰을 localStorage에 저장
        localStorage.setItem('token', response.data.token);
        alert("로그인에 성공했습니다.");
        navigate("/");
      } else {
        alert("회원 정보가 없습니다.");
      }
    } catch (error) {
      console.log('error');
      alert("서버와의 통신에 실패했습니다.");
    }
  }
    // //User로그인
    // if(inputId === User.id && inputPw === User.pw){
    //   alert('로그인에 성공했습니다.');
    //   navigate("/");
    // } else {
    //   alert('회원 정보가 없습니다.');
    // }
  };


  return (
    <div className="LogIn">

      <div onClick={logoOnClick}>
        <img src="logo.png" alt="로고 이미지" width="405px" height="200px" style={{ marginBottom: '15px', cursor: 'pointer' }} onClick={()=>navigate('/')}/>
      </div>

        <div className="form_wrap">
        
          <div className="id_form">
            <input className="id_input" type="text" value={inputId} onChange={handleInputId} placeholder="아이디"/>
            <div className="inputError">
              {
                !idValid && inputId.length > 0 && (
                  <div>올바른 아이디를 입력해주세요</div>
                )
              }  
            </div>
          </div>

          <div className="pw_form">
            <input className="pw_input" type="password" value={inputPw} onChange={handleInputPw} placeholder="비밀번호"/>
            <div className="inputError">
              {
                !pwValid && inputPw.length > 0 && (
                  <div>영문, 숫자, 특수문자 모두 포함 8자 이상 입력</div>
                )
              }
            </div>
          </div>
        

          <div>
          <button onClick={onClickLoginButton}>로그인</button>
          <div className="join-btn" onClick={()=>navigate('/join')}>아직 회원이 아니신가요?</div>
          </div>
        </div>

    </div>
  );
};

export default LogIn;
