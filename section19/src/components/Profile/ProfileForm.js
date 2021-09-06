import { useRef, useContext, useState } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredPassword = passwordInputRef.current.value;

    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBzvWAveSGgBJLdgSyJotAoN-orOm0ivCE',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }

    authCtx.logout();
    history.replace('/auth');
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInputRef} />
      </div>
      <div>
        {error && <p className={classes.error}>{error.message}</p>}
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
