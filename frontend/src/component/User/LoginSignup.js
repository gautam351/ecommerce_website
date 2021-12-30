import { React, useRef, useState, useEffect } from "react";
import "./LOginSignup.css";
import Loader from "../layout/Loader/Loader";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login ,register} from "../../actions/userActions";
import { useAlert } from "react-alert";
import { red } from "@material-ui/core/colors";

function LoginSignup() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location=useLocation();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  let navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [avatar, setavatar] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  );
  const [avatarPreview, setavatarPreview] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  );
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const switchTabs = (e, dest) => {
    if (dest == "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (dest == "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log(" login submitted");
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    console.log("register submitted");
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };
const redirect= location.search?location.search.split("=")[1]:"/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated,redirect]);

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          {/* login form */}
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <EmailIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setloginEmail(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockIcon />
              <input
                type="password"
                required
                placeholder="password"
                value={loginPassword}
                onChange={(e) => setloginPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot">Forget Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>

          {/* signup form */}
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
           
          >
            <div className="SignUpName">
              <PersonIcon />
              <input type="text" placeholder="Email " required name="name" onChange={registerDataChange} />
            </div>

            <div className="signUpEmail">
              <EmailIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="SignUpPassword">
              <LockIcon />
              <input type="password" required placeholder="password"      name="password"  value={password} onChange={registerDataChange} />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview " />
              <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}  />
              
            </div>
           <b> <sub> NOTE: File Size&lt;750kb</sub></b>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginSignup;
