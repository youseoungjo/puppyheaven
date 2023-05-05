import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {

  const User = {
    id : '12345678',
    pw : '!123qwerty'
  }

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const navigate = useNavigate();

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
    // try {
    //   const response = await axios.post("http://localhost:3001/login", {
    //     id: inputId,
    //     pw: inputPw,
    //   });
    //   if (response.data.success) {
    //     alert("로그인에 성공했습니다.");
    //     navigate("/main");
    //   } else {
    //     alert("회원 정보가 없습니다.");
    //   }
    // } catch (error) {
    //   console.log('error');
    //   alert("서버와의 통신에 실패했습니다.");
    // }
    if(inputId === User.id && inputPw === User.pw){
      alert('로그인에 성공했습니다.');
      navigate("/main");
    } else {
      alert('회원 정보가 없습니다.');
    }
  };


  return (
    <div className="LogIn">
        <img src="shortlogo.png" alt="로고 이미지"></img>

        <div className="form_wrap">
        
          <div className="id_form">
            <label>ID</label>
            <input className="id_input" type="text" value={inputId} onChange={handleInputId} />
            <div className="inputError">
              {
                !idValid && inputId.length > 0 && (
                  <div>올바른 아이디를 입력해주세요</div>
                )
              }  
            </div>
          </div>

          <div className="pw_form">
            <label>Password</label>
            <input className="pw_input" type="password" value={inputPw} onChange={handleInputPw}/>
            <div className="inputError">
              {
                !pwValid && inputPw.length > 0 && (
                  <div>영문, 숫자, 특수문자 모두 포함 8자 이상 입력</div>
                )
              }
            </div>
          </div>
          
          <div>
          <a href="/find" class="link-light">아이디/비밀번호 찾기</a>
          </div>

          <div>
          <button onClick={onClickLoginButton}>로그인</button>
          <button onClick={()=>navigate('/join')}>회원가입</button>
          </div>
        </div>

    </div>
  );
};

export default LogIn;