import { useState, createContext, useContext, useRef} from "react";
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate, useParams} from "react-router-dom";

const ContinueRegistration=({currentPage, setCurrentPage})=>{
 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: '',
        phone: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name.includes('.')) {
          const [parentKey, childKey] = name.split('.');
          setFormData((prevData) => ({
            ...prevData,
            [parentKey]: {
              ...prevData[parentKey],
              [childKey]: value,
            },
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form Data:', formData);
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
    
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
    
          <label>
            Street:
            <input type="text" name="street" value={formData.street} onChange={handleChange} />
          </label>
    
          <label>
            Suite:
            <input type="text" name="suite" value={formData.suite} onChange={handleChange} />
          </label>
    
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </label>
    
          <label>
            Zipcode:
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
          </label>
    
          <label>
            Geo:
            <input type="text" name="geo" value={formData.geo} onChange={handleChange} />
          </label>
    
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
    
          <label>
            Company Name:
            <input type="text" name="company.name" value={formData.company.name} onChange={handleChange} />
          </label>
    
          <label>
            Catchphrase:
            <input type="text" name="company.catchPhrase" value={formData.company.catchPhrase} onChange={handleChange} />
          </label>
    
          <label>
            BS:
            <input type="text" name="company.bs" value={formData.company.bs} onChange={handleChange} />
          </label>
    
          <button type="submit">Submit</button>
        </form>
      );
    };
export default ContinueRegistration;