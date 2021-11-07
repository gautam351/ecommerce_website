const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
  getAllUsers,
  getSingleUser,
  updateuserRole,
  deleteUser,
} = require("../controllers/userController");
const { logoutUser, isAuthUser, AuthRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forget").post(forgetPassword);

// reset password and auto login after that
router.route("/password/reset/:token").put(resetPassword);

// get user details
router.route("/me").get(isAuthUser, getUserDetails);

// update user password
router.route("/password/update").put(isAuthUser, updateUserPassword);

// update user profile
router.route("/me/update").put(isAuthUser, updateUserDetails);

// get all users admin
router.route("/admin/users").get(isAuthUser, AuthRoles("admin"), getAllUsers);

// get sigle user admin

router.route("/admin/:id").get(isAuthUser, AuthRoles("admin"), getSingleUser)
.put(isAuthUser,AuthRoles("admin"),updateuserRole)
.delete(isAuthUser,AuthRoles("admin"),deleteUser);

module.exports = router;
