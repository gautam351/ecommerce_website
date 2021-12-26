import {React,useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import "./UpdatePassword.css"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { updatePassword } from '../../actions/userActions';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { clearErrors } from '../../actions/userActions';
function UpdatePassword({user,isAuthenticated}) {
    

   let navigate=useNavigate();
   const { error, isUpdated, loading } = useSelector((state) => state.profile);
   const alert = useAlert();
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
 const  dispatch = useDispatch();
    useEffect(() => {
     
        if(!isAuthenticated)navigate("/login");
      
    }, [isAuthenticated])
    
    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(updatePassword(myForm));
      };
    
      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("Profile Updated Successfully");
    
         navigate("/account");
    
          dispatch({
            type: UPDATE_PASSWORD_RESET,
          });
        }
      }, [dispatch, error, alert, navigate, isUpdated]);
    return (
       <>
       <MetaData  title={"reset password"} />

       <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Passwordd</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>


       </>
    )
}

export default UpdatePassword
