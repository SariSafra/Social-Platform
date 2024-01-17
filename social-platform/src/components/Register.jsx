import { useState, createContext, useContext, useRef, useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";
import ContinueRegistration from "./ContinueRegistration";

const Register=()=>{
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [errorDisplay, setErrorDisplay] = useState('');
  const [continueRegistation, setContinueRegistation] = useState(false);




const PasswordValidation=(passwordValue, errorArea)=>{
    const passwordRegex = /^[a-z]*[a-z]\.[a-z]+$/;
    if (!passwordRegex.test(passwordValue)) {
      errorArea('Password must contain at least 3 characters, including dot.');
    } 
    else {
      errorArea('');
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
    setErrorDisplay("");
    const passwordValue = passwordRef.current.value;
    PasswordValidation(passwordValue, setPasswordError);
}

const handleConfirmPasswordChange=()=>{
  setErrorDisplay("");
  const passwordValue = confirmPasswordRef.current.value;
  PasswordValidation(passwordValue, setConfirmPasswordError);
}

const handleUsernameChange=()=>
{
    setErrorDisplay("");
    const usernameValue = usernameRef.current.value;
    UserNameValidation(usernameValue);
}

 const isUsernameExist=(usernameValue)=>{
  fetch(`http://localhost:3000/users?username=${usernameValue}`)
  .then(response => {
   if (!response.ok) {
     throw new Error(`Request failed with status: ${response.status}`);
   }
   return response.json();
 })
 .then(data => {
   if (Object.keys(data).length === 0) {
    setContinueRegistation(true);
    } 
    else {
    setErrorDisplay("Username already exists. Please choose a different username.")
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
    const confirmPasswordValue = confirmPasswordRef.current.value;
   let isConfirmationSucceeded = true;
    if(confirmPasswordValue!=passwordValue){
      isConfirmationSucceeded = false;
     setErrorDisplay("Password confirmation failed. try again.");
    }
    if(passwordError==""&&confirmPasswordError=="" && userNameError==""&& errorDisplay=="" && isConfirmationSucceeded==true){
      isUsernameExist(usernameValue);}
  };
 
  return(<>
    {continueRegistation ? (
       <ContinueRegistration username={usernameRef.current.value} password= {passwordRef.current.value} />
    ) : (
    <>
    <h1>Register</h1>
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} required onChange={handleConfirmPasswordChange} noValidate/>
        {confirmPasswordError && <p style={{ color: 'red' }}>{confirmPasswordError}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
     <Link to="/login">login</Link>
     {errorDisplay && <p style={{ color: 'red' }}>{errorDisplay}</p>}
    </>
    )}
</>
  )
 }
export default Register;