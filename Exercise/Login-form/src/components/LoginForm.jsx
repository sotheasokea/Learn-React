import { useState } from 'react'
import './LoginForm.css'

export function LoginForm(){
  const [isShownPassword, setIsShownPassword] = useState(false);

  function ShowPassword(){
    setIsShownPassword(isShownPassword? false : true);
  }

  return (
    <div className='login-form-container'>
      <p className="title-website">Hello, welcome to my website </p>
      <div className="input-container">
        <div>
          <input 
            placeholder="Email"
            className="input-text"
            />  
        </div>
        <div>
          <input
            placeholder="Password"
            className="input-text"
            type={isShownPassword? "text":"password"}
          />
          <button
            className="show-hide-paasword-button"
            onClick={ShowPassword}
          >{isShownPassword? "Hide" : "Show"}</button>
        </div>
      </div>
      <div className='button-container'>
        <button
          className="button-login"
        >Login</button>
        <button
          className="button-sign-up"
        >Sign up</button>
      </div>
    </div>
  );
}