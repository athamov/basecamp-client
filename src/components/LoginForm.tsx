import React, {FC, useContext, useState} from 'react';
import { Link } from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import LoginImage from "./login.png"

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

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

          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                >Remember me</label
              >
            </div>
            <a href="#!" className="text-gray-800">Forgot password?</a>
          </div>

          <div className="text-center lg:text-left">
            <Link
              to="/"
              className="inline-block CustomButton"
              onClick={() => store.userStore.login(email, password)}
            >
              Login
            </Link>
            <button 
              //onClick={() => store.registration(email, password)}
            ></button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <Link
                to="/register"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    );
};

export default observer(LoginForm);


