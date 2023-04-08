import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate();

    return (
        <div className="Main">
            <button onClick={()=>navigate('/map')}>지도 보기</button>
            <button onClick={()=>navigate('/shop')}>상점 보기</button>
            <button onClick={()=>navigate('/video')}>영상 보기</button>
        </div>
    );
};

export default Main;
