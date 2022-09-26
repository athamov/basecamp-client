import React, {FC, useContext, useState,useEffect} from 'react';
import { observer } from "mobx-react-lite";
import { StoreContext } from '../../context/store-context';
import {Link,useNavigate} from 'react-router-dom';
import LoginImage from "./login.png"

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState('')
    const store = useContext(StoreContext);
    let navigate = useNavigate();
    useEffect(() => {
      let isAuth = store.user;
      if (isAuth.id) {
        navigate('/user');
      }
    })

    const handleClick = (event:any) =>{
      event.preventDefault();
      let isLogin = store.login(email, password);
      isLogin.then((e:any) => {
        alert(e)
        if(e==='logged in successfully') navigate('/user');
      }).catch((e:any) => {
        alert(e)
        setError(e);
      })
    }
    return (
        <section className="h-screen">
            <div className="px-6 h-full text-gray-800">
                <div
                className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                <div
                    className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                >
                    <img
                    src={LoginImage}
                    className="w-full"
                    alt="Sample"
                    />
                </div>
                <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                  {error && <div className="w-full bg-red">{error}</div>}
                    <form>
          {/* <!-- Email input --> */}
          <div className="mb-6">
            <input
              type="text"
              className="form-control CustomInput"
              id="exampleFormControlInput1"
              placeholder="Email address"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* <!-- Password input --> */}
          <div className="mb-6">
            <input
              type="password"
              className="form-control CustomInput"
              id="exampleFormControlInput2"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="text-center lg:text-left">
          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <Link
                to="/register"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</Link>
            </p>
            <button
              onClick={handleClick}
              className="inline-block CustomButton Blue"
            > 
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    );
};

export default observer(LoginForm);