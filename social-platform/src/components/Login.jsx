import { useState, createContext, useContext, useRef} from "react";
import {  BrowserRouter as Router, Route, Routes ,Form, Link, useNavigate ,useParams} from "react-router-dom";

const Login=({setCurrentPage})=>{
  const { action } = useParams();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [errorDisplay, setErrorDisplay] = useState('');

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

const isUserExist=(usernameValue, passwordValue)=>{
  fetch(`http://localhost:3000/users?username=${usernameValue}`)
   .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (Object.keys(data).length === 0) {
      setErrorDisplay("Username does not exist in the system, to register click on registration.");      
    } else {
         if(data[0].website===passwordValue){
        {       
          localStorage.setItem(data[0].username, JSON.stringify(data[0]));
          setCurrentPage(action?'home':"home");
          // const history = useHistory();
          // history.push('/home');
        }
      }  else
          setErrorDisplay("wrong username or password.")
    }
  })
  .catch(error => {
    console.error(error);
    setErrorDisplay("Server error. try again later.")      
  });
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    if(passwordError=="" && userNameError == "")
      isUserExist(usernameValue, passwordValue);
  };

  return(
    <>
    <h1>Login</h1>
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
     {errorDisplay && <p style={{ color: 'red' }}>{errorDisplay}</p>}
       </>
    )
}
export default Login;