import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        Location: credentials.location
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      alert("Account created successfully");
      navigate("/login"); //  navigate after register
    } else {
      alert("Invalid details");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={credentials.location}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>

        <Link to="/login" className="m-3 btn btn-danger">
          Already a user
        </Link>

      </form>
    </div>
  );
}
            