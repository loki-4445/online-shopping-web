import './Login.css';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sample } from '../../contests/Usercontest/Users';
function Login() {
  const navigate = useNavigate();
  const { currUser, login, logout,error } = useContext(sample);
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onRegister(data) {
    login(data);
  }

  useEffect(() => {
    if (currUser) {
      navigate('/user-profile');
    }
  }, [currUser, navigate]);

  return (
    <div className="row">
      <div className="mx-auto mt-5 text-center col-11 col-sm-8 col-md-6">
        {currUser ? (
          <div className="mt-5 card form mx-auto p-5 bg-light">
            <h3>You are logged in</h3>
            <button className="bg-danger text-center text-white mt-5" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <form className="mt-5 card form mx-auto p-5 bg-light" onSubmit={handleSubmit(onRegister)}>
            {error.lenght!=0&&<p className='bg-warning text-danger text-center'>{error}</p>}
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
            <div>
              <button type="submit" className="bg-success text-center text-white mt-5">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
