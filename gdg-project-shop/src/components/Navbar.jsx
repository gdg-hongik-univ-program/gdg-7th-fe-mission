import {useNavigate, Link} from "react-router";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isManage,setIsManage] = useState(false);

  const handleClick = ()=> {
    setIsManage(!isManage);
  }

  const moveing = () => {
    if(isManage) navigate("/")
    else navigate("/manage")
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src="/gdg-favicon.svg" width="40px"/>
      </Link>
      
      <div>
        <button onClick={() => navigate("/category")}>카테고리 필터링</button>
        <button onClick={() => navigate("/price-bound")}>가격 범위 필터링</button>
        <button onClick={() => navigate("/sort")}>상품 정렬</button>
      </div>
      <button id="manage" onClick={()=>{moveing(); handleClick();}}>{isManage ? '소비자' : '관리자'}</button> 
    </nav>
  )
}

export default Navbar;