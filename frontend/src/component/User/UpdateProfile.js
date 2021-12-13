import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { updateProfile,loadUser ,clearErrors} from "../../actions/userActions";
import { useDispatch,useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Laoder from "../layout/Loader/Loader"
import "./UpdateProfile.css"
import Loader from "../layout/Loader/Loader";
function UpdateProfile({ user, isAuthenticated }) {
  let navigate = useNavigate();
  const  dispatch = useDispatch();
  const alert=useAlert();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setavatar] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  );
  const [avatarPreview, setavatarPreview] = useState(
    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
  );


  const updateProfileSubmit=(e)=>{
      e.preventDefault();
      const myForm=new FormData();
      myForm.set("name",name);
      myForm.set("email",email);
      myForm.set("avatar",avatar);
      dispatch(updateProfile(myForm));

  }
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarPreview(reader.result);
        setavatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setavatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);


  return (
    <>
      <MetaData title={"update profile"} />
{loading?<Loader/>:
<>

<div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>

          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>

</>
}
     
    </>
  );
}

export default UpdateProfile;
