import { useState, createContext, useContext, useRef,useEffect} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";

const ContinueRegistration=({username, password})=>{
  

  const fields = {
    id:0,
    name: '',
    username:'',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat:"0",
        lng:"0"
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
 
  const [userDetails,setUserDetails] = useState(fields);
  const [errorDisplay, setErrorDisplay] = useState(fields);
  const [globalError,setGlobalError]=useState("");
  const navigate = useNavigate();


 useEffect(() => {
   const findId = async () => {
    const newId = await findMaxId;
    setUserDetails({...userDetails, "id": newId, "username": username,"website": password }) ;
  };
  findId(); 
  }, []);
useEffect(()=>{
  setGlobalError("");
},[userDetails])
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

      const handleChange = (e) => {
        console.log(userDetails);
        const { name, value } = e.target;
        let internalName=name;
        if (name.includes('.')) {
          const [parentKey, childKey] = name.split('.');
          internalName=childKey;
          setUserDetails((prevData) => ({ ...prevData,   [parentKey]: { ...prevData[parentKey], [childKey]: value}}));
        } else {
          setUserDetails((prevData) => ({ ...prevData, [name]: value}));
        }

       const checkValidation = (validFunc, errorString = `Invalid ${internalName}.`)=>{
        if (name.includes('.')) {
          const [parentKey, childKey] = name.split('.');
          setErrorDisplay((prevData) => ({...prevData, [parentKey]:{ ...prevData[parentKey], [childKey]: !validFunc(value)? errorString :""}}));
        } else {
          setErrorDisplay((prevData) => ({...prevData,[name]:!validFunc(value)? errorString :""}));
        }
      }

        switch(internalName){
            case "name":
            case "street":
            case "city":
            case "catchPhrase":
            case "bs": 
              checkValidation(isValidString); break;
            case "email":
              checkValidation(isValidEmail, "Email address must contain '.' and '@'."); break;
            case "suite":
              checkValidation(isValidSuite); break;
            case "zipcode":
            case "phone": 
              checkValidation(isValidNumber); break;
            default : break;
        }
      };

      const isObjectEmpty = (obj) => {
        for (const key in obj) {
          if (typeof obj[key] === 'object') {
            if (!isObjectEmpty(obj[key])) {
              return false;
            }
          } else if (obj[key] !=='' && obj[key] !== 0 && obj[key] !=="0") {
            return false;
          }
        }
        return true;
      };
    
      const findMaxId = fetch(`http://localhost:3000/users`)
      .then(response => {
       if (!response.ok) {
         throw new Error(`Request failed with status: ${response.status}`);
       }
       return response.json();
     })
     .then(data => {
      if (Array.isArray(data) && data.length > 0) {
         return Math.max(...data.map(item => item.id))+1;} 
     else return 1;   
     })
     .catch(error => {
       console.error(error);
       setGlobalError("Server error. try again later.")      
     });
      
     const postRequest=()=>{
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
        else 
       { 
        navigate('/home');
      }
      }).catch(error => {
        console.error(error);
        setGlobalError("Server error. try again later.")      
      })
     }

      const handleSubmit = (e) => {
        e.preventDefault();
        if(!isObjectEmpty(errorDisplay)){
          return;
        }
          localStorage.clear();
          localStorage.setItem("currentUser", JSON.stringify(userDetails));
          postRequest();
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={userDetails.name} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.name}</p>}<br/> 
    
          <label>
            Email:
            <input type="email" name="email" value={userDetails.email} onChange={handleChange} required noValidate/>
          </label>
           {<p style={{ color: 'red' }}>{errorDisplay.email}</p>}<br/>
    
          <label>
            Street:
            <input type="text" name="address.street" value={userDetails.address.street} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.address.street}</p>}<br/>
    
          <label>
            Suite:
            <input type="text" name="address.suite" value={userDetails.address.suite} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.address.suite}</p>}<br/>
    
          <label>
            City:
            <input type="text" name="address.city" value={userDetails.address.city} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.address.city}</p>}<br/>
     <label>
            Zipcode:
            <input type="text" name="address.zipcode" value={userDetails.address.zipcode} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.address.zipcode}</p>}<br/>
    
          <label>
            Phone:
            <input type="text" name="phone" value={userDetails.phone} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.phone}</p>}<br/>
    
          <label>
            Company Name:
            <input type="text" name="company.name" value={userDetails.company.name} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.company.name}</p>}<br/>
    
          <label>
            Catchphrase:
            <input type="text" name="company.catchPhrase" value={userDetails.company.catchPhrase} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.company.catchPhrase}</p>}<br/>
    
          <label>
            BS:
            <input type="text" name="company.bs" value={userDetails.company.bs} onChange={handleChange} required noValidate/>
          </label>
          {<p style={{ color: 'red' }}>{errorDisplay.company.bs}</p>}<br/>
    
          <button type="submit">Submit</button>
          {<p style={{ color: 'red' }}>{globalError}</p>}<br/>
        </form>
      
      );
    };
export default ContinueRegistration;