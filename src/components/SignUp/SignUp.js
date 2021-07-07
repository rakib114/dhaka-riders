import { Typography, Button, FormControlLabel, Checkbox } from "@material-ui/core";
import { Grid, Paper, Avatar, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config";
import NavBar from "../NavBar/NavBar";
import { useContext } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const SignUp = () => {
    const paperStyle = {
        padding: "30px  20px",
        height: "60vh",
        width: 300,
        margin: "40px auto",
    };
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: '',
        password: "",
        error: '',
        success: '',
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
        console.log(user.name);
        if (user.name && user.email && user.phone && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    // console.log(user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message
                    setUser(newUserInfo);

                });

        }
        event.preventDefault();
    }
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
            }).catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                setUser(newUserInfo);
            });
    }
    return (
        <Grid>
            <NavBar></NavBar>
            <p>Name: {user.name}</p>
            <Paper elevation={20} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={{ background: "#ff6e40" }}>
                        {" "}
                        <AddCircleOutlineIcon />{" "}
                    </Avatar>
                    <h2>Sign Up</h2>
                    <Typography variant="caption">
                        Please fill this form to create an account
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit} action="">
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        placeholder="Enter Full Name"
                        fullWidth
                        required
                        name='name'
                        type="text"
                    />
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        placeholder="Enter Email"
                        fullWidth
                        required
                        name='email'
                        type="email"
                    />
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="Phone "
                        variant="outlined"
                        placeholder="Enter Phone Number"
                        fullWidth
                        required
                        name='phone'
                        type="tel"
                    />
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="Password "
                        variant="outlined"
                        placeholder="Enter Password"
                        fullWidth
                        required
                        name='password'
                        type="password"
                    />
                    <TextField
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        id="outlined-basic"
                        label="Confirm Password "
                        variant="outlined"
                        placeholder="Enter Password Again"
                        fullWidth
                        required
                        name='password'
                        type="password"
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="I accept all terms and conditions."
                    />
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        style={{ margin: "8px 0px", background: "#ff6e40" }}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
            <p style={{ color: 'red', textAlign: 'center' }}>{user.error} </p>
            <div style={{ borderBottom: '1px solid black', textAlign: 'center' }} ><b>or</b></div>
            <div style={{ textAlign: 'center' }} className='mt-4' >
                <Button variant="contained" color="primary" onClick={handleGoogleSignIn} >
                    Use Google
                </Button>
            </div>
        </Grid>
    );
};

export default SignUp;
