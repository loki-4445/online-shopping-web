import './Register.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let [registers, setRegister] = useState([]);
  // For fetching errors
  let [err, setErr] = useState("");
  let [usererr,SetUserErr]=useState('')
  let navigate = useNavigate();

  // To handle the form
  async function handleform(data) {
    console.log(data);
    setRegister([...registers, data]);
    try {
      let res = await fetch("http://localhost:4000/user-api/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });
      let info = await res.json();
      if (info.message === "User created") {
        navigate('/login');
      } else if (info.message === "User already exists") {
        console.log("User exists")
        SetUserErr("USER ALREADY EXISTS");
      } else {
        setErr(info.message);
      }
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <div className="row">
      <div className="mx-auto mt-5 text-center">
      {usererr.length!=0 && <p className='bg-warning text-danger'>{usererr}</p>}
        <form className='mt-5 card form mx-auto p-5 bg-light' onSubmit={handleSubmit(handleform)}>
          <div className="username mt-2">
            <label htmlFor="username">User name</label>
            <input type="text" name="username" id="username" {...register('username', { required: true })} />
            {errors.username && <p className="text-danger">Username is required</p>}
          </div>
          <div className="password mt-4">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" {...register('password', { required: true })} id="password" />
            {errors.password && <p className="text-danger">Password is required</p>}
          </div>
          <div className="email mt-4">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" {...register('email', { required: true })} />
            {errors.email && <p className="text-danger">Email is required</p>}
          </div>
          <div className="number mt-4">
            <label htmlFor="number">Phone</label>
            <input type="number" name="number" id="number" {...register('number', { required: true })} />
            {errors.number && <p className="text-danger">Phone number is required</p>}
          </div>
          <div>
            <button type="submit" className='bg-success text-center text-white mt-5'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
