import {
    Grid,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config";
import NavBar from "../NavBar/NavBar";
import { useContext, } from "react";
import { userContext } from "../../App";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const LogIn = () => {
    const paperStyle = {
        padding: 20,
        height: "60vh",
        width: 300,
        margin: "40px auto",
    };
    const [user, setUser] = useState({
        email: "",
        password: "",
        error: "",
        success: "",
        name: '',
    });
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleBlur = (event) => {
        let isFormVaild = true;
        if (event.target.name === "email") {
            isFormVaild = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const passwordValid = event.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(event.target.value);
            isFormVaild = passwordValid && passwordNumber;
        }
        if (isFormVaild) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    };
    const handleSubmit = (event) => {
        if (user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        event.preventDefault();
    };
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                const { displayName, email } = user;
                const signedInUser = { name: displayName, email }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(signedInUser);
            }).catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
            });
    }
    return (
        <Grid>
            <NavBar></NavBar>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={{ background: "#ff6e40" }}>
                        {" "}
                        <LockOutlinedIcon />{" "}
                    </Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit} action="">
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="email"
                        variant="outlined"
                        placeholder="Enter Email"
                        fullWidth
                        required
                        type="email"
                        name="email"
                    />
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "15px" }}
                        id="outlined-basic"
                        label="password"
                        variant="outlined"
                        placeholder="Enter Password"
                        fullWidth
                        required
                        type="password"
                        name="password"
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Remember Me"
                    />
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        style={{ margin: "8px 0px", background: "#ff6e40" }}
                    >
                        Sign in
                    </Button>
                </form>
                <Typography style={{ margin: "5px 0px" }}>
                    <Link href="#" style={{ color: "#ff6e40" }}>
                        Forgot Password?
                    </Link>
                </Typography>
                <Typography style={{ margin: "8px 0px" }}>
                    {" "}
                    Don’t have an account?
                    <Link style={{ color: "#ff6e40" }} to="/signup">
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            <p style={{ color: "red", textAlign: "center" }}>
                {" "}
                <b>{user.error}</b>{" "}
            </p>
            <div style={{ borderBottom: '1px solid black', textAlign: 'center' }} ><b>or</b></div>
            <div style={{ textAlign: 'center' }} className='mt-4' >
                <Button variant="contained" color="primary" onClick={handleGoogleSignIn} >
                    Use Google
                </Button>
            </div>
        </Grid>
    );
};

export default LogIn;