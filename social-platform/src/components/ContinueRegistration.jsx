import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { runId } from "./Tools";
const ContinueRegistration = ({ username, password }) => {

  const fields = {
    id: '',
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: "0",
        lng: "0"
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  }

  const [userDetails, setUserDetails] = useState(fields);
  const [errorDisplay, setErrorDisplay] = useState(fields);
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getNewId = async () => {
      const newId = await runId("nextUserId");
      setUserDetails({ ...userDetails, "id": newId, "username": username, "website": password });
    }
    getNewId();
  }, []);

  useEffect(() => {
    setGlobalError("");
  }, [userDetails])

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const isValidSuite = (inputString) => {
    const regex = /^[a-zA-Z0-9.]{1,20}$/;
    return regex.test(inputString);
  };
  const isValidString = (inputString) => {
    const regex = /^[a-zA-Z\s-]{1,30}$/;
    return regex.test(inputString);
  };
  const isValidNumber = (inputString) => {
    const regex = /^[-0-9]+$/;
    return regex.test(inputString);
  };

  const checkValidation = (name, internalName, value, validFunc, errorString = `Invalid ${internalName}.`) => {
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setErrorDisplay((prevData) => ({ ...prevData, [parentKey]: { ...prevData[parentKey], [childKey]: !validFunc(value) ? errorString : "" } }));
    } else {
      setErrorDisplay((prevData) => ({ ...prevData, [name]: !validFunc(value) ? errorString : "" }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let internalName = name;
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      internalName = childKey;
      setUserDetails((prevData) => ({ ...prevData, [parentKey]: { ...prevData[parentKey], [childKey]: value } }));
    } else {
      setUserDetails((prevData) => ({ ...prevData, [name]: value }));
    }
    switch (internalName) {
      case "name":
      case "street":
      case "city":
      case "catchPhrase":
      case "bs":
        checkValidation(name, internalName, value, isValidString); break;
      case "email":
        checkValidation(name, internalName, value, isValidEmail, "Email address must contain '.' and '@'."); break;
      case "suite":
        checkValidation(name, internalName, value, isValidSuite); break;
      case "zipcode":
      case "phone":
        checkValidation(name, internalName, value, isValidNumber); break;
      default: break;
    }
  };

  const isObjectEmpty = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (!isObjectEmpty(obj[key])) {
          return false;
        }
      } else if (obj[key] !== '' && obj[key] !== 0 && obj[key] !== "0") {
        return false;
      }
    }
    return true;
  };

  const postRequest = () => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      else {
        const updatedUser = { ...userDetails };
        delete updatedUser["website"];
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        navigate(`/users/${userDetails.id}/home`);
      }
    }).catch(error => {
      console.error(error);
      setGlobalError("Server error. try again later.")
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isObjectEmpty(errorDisplay)) {
      return;
    }
    postRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Personal Information:</h4>
      <label>
        Name:
        <input type="text" name="name" value={userDetails.name} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.name}</p>}

      <label>
        Email:
        <input type="email" name="email" value={userDetails.email} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.email}</p>}

      <label>
        Phone:
        <input type="text" name="phone" value={userDetails.phone} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.phone}</p>}

      <h4>Address:</h4>
      <label>
        Street:
        <input type="text" name="address.street" value={userDetails.address.street} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.address.street}</p>}

      <label>
        Suite:
        <input type="text" name="address.suite" value={userDetails.address.suite} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.address.suite}</p>}

      <label>
        City:
        <input type="text" name="address.city" value={userDetails.address.city} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.address.city}</p>}
      <label>
        Zipcode:
        <input type="text" name="address.zipcode" value={userDetails.address.zipcode} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.address.zipcode}</p>}

      <h4>Company:</h4>
      <label>
        Company Name:
        <input type="text" name="company.name" value={userDetails.company.name} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.company.name}</p>}

      <label>
        Catchphrase:
        <input type="text" name="company.catchPhrase" value={userDetails.company.catchPhrase} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.company.catchPhrase}</p>}

      <label>
        BS:
        <input type="text" name="company.bs" value={userDetails.company.bs} onChange={handleChange} required noValidate />
      </label>
      {<p className='commentArea'>{errorDisplay.company.bs}</p>}<br />

      <button className="addButton" type="submit">Register</button>
      {<p className='commentArea'>{globalError}</p>}<br />
    </form>

  );
};
export default ContinueRegistration;