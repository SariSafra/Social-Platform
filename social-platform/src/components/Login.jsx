import { useState, createContext, useContext, useRef} from "react";
import { current_page_context } from "./CurrentPageContext";
import { Form, Link, useNavigate } from "react-router-dom";
const Login=()=>{

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
 
const PasswordValidation=(passwordValue)=>{
    const passwordRegex = /^[a-z]*[a-z]\.[a-z]+$/;
    if (!passwordRegex.test(passwordValue)) {
      setPasswordError('Password must contain at least 3 characters, including dot.');
    } 
    else {
      setPasswordError('');
    }
}

const UserNameValidation=(userValue)=>{
    const userNameRegex =/^[a-zA-Z0-9]+$/;
    if (!userNameRegex.test(userValue)) {
        setUserNameError('User name may contain only english letters or numbers');
    } 
    else {
        setUserNameError('');
    }
}

const handlePasswordChange=()=>{
    const passwordValue = passwordRef.current.value;
    PasswordValidation(passwordValue);
}

const handleUsernameChange=()=>
{
    const usernameValue = usernameRef.current.value;
    UserNameValidation(usernameValue);

}
  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    PasswordValidation(passwordValue);
    UserNameValidation(usernameValue);
    if(passwordError!=""||userNameError!="")
        return;
    
  };

  return(
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameRef} required onChange={handleUsernameChange} noValidate/>
        {userNameError && <p style={{ color: 'red' }}>{userNameError}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required onChange={handlePasswordChange} noValidate/>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
     <Link to="/register"> registration</Link>
     <h1>Login</h1>
       </>
    )
}
export default Login;