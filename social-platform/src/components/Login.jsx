import { useState,  useRef} from "react";
import {  useNavigate, Link} from "react-router-dom";

const Login=()=>{
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorDisplay, setErrorDisplay] = useState('');
  const navigate = useNavigate();

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
          delete data[0].website;
          localStorage.setItem("currentUser", JSON.stringify(data[0]));
          navigate(`/users/${data[0].id}/home`);
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
    isUserExist(usernameValue, passwordValue);
  };

  return(
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameRef} required noValidate/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} required noValidate/>
      </div>
      <button type="submit">Submit</button>
    </form>
     <Link to="/register">registration</Link>
     {errorDisplay && <p className='commentArea'>{errorDisplay}</p>}
      </>
    )
}
export default Login;