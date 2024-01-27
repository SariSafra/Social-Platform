import { useState } from "react";
import { Link } from "react-router-dom";
import ContinueRegistration from "./ContinueRegistration";

const Register = () => {

  const fields = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  const [userDetails, setUserDetails] = useState(fields);
  const [errorDisplay, setErrorDisplay] = useState(fields);
  const [globalError, setGlobalError] = useState('');
  const [continueRegistation, setContinueRegistation] = useState(false);

  const isUsernameExist = (usernameValue) => {
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
          setGlobalError("Username already exists. Please choose a different username.")
        }
      })
      .catch(error => {
        console.error(error);
        setGlobalError("Server error. try again later.")
      });
  }

  const isObjectEmpty = (obj) => {
    for (const key in obj) {
      if (obj[key] !== '' && obj[key] !== 0 && obj[key] !== "0") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isObjectEmpty(errorDisplay)) return;
    if (userDetails.confirmPassword != userDetails.password) {
      setGlobalError("Password confirmation failed. try again.");
      return;
    }
    isUsernameExist(userDetails.username);
  };

  const isValidUsername = (inputString) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(inputString);
  };

  const isValidPassword = (inputString) => {
    const regex = /^[a-z]*[a-z]\.[a-z]+$/;
    return regex.test(inputString);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
    switch (name) {
      case "username":
        setErrorDisplay((prevData) => ({ ...prevData, [name]: !isValidUsername(value) ? "User name may contain only english letters or numbers" : "" }));
        break;
      case "password":
        setErrorDisplay((prevData) => ({ ...prevData, [name]: !isValidPassword(value) ? "Password must contain at least 3 characters, including dot." : "" }));
        break;
      default: break;
    }
  };

  return (<>
    {continueRegistation ? (
      <ContinueRegistration username={userDetails.username} password={userDetails.password} />
    ) : (
      <>
        <h1 className="title">Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={userDetails.username} onChange={handleChange} required noValidate />
          </label><br />
          <span className='commentArea'>{errorDisplay.username}</span><br />

          <label>
            Password:
            <input type="password" name="password" value={userDetails.password} onChange={handleChange} required noValidate />
          </label><br />
          <span className='commentArea'>{errorDisplay.password}</span><br />

          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" value={userDetails.confirmPassword} onChange={handleChange} required noValidate />
          </label><br />
          <span className='commentArea'>{errorDisplay.confirmPassword}</span><br />

          <button className="addButton" type="submit">Continue registration</button>
        </form>
        <Link className="link" to="/login">login</Link>
        {globalError && <p className='commentArea'>{globalError}</p>}
      </>
    )}
  </>
  )
}
export default Register;