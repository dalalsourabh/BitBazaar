import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const nav = useNavigate();
    const [user, setUser] = useState({
        Name: "",
        Mobile: "",
        Email: "",
        Password: ""
    });

    const [flag, setFlag] = useState(0);

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            Name: user.Name,
            Mobile: user.Mobile,
            Email: user.Email,
            Password: user.Password
        };

        await axios.post('http://localhost:8000/user/register', data)
            .then((response) => {
                console.log(response);
                if (response.data === "Register successful") {
                    setFlag(2);
                    setTimeout(() => {
                        nav('/');
                    }, 2000);
                }
                else {
                    setFlag(1);
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000);

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className="container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-group ">
                    <label for="exampleInputEmail1">Name</label>
                    <input name="Name" onChange={handleChange} value={user.Name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" />
                </div>
                <div class="form-group ">
                    <label for="exampleInputEmail1">Mobile no</label>
                    <input name="Mobile" onChange={handleChange} value={user.Mobile} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your mobile no" />
                </div>
                <div class="form-group ">
                    <label for="exampleInputEmail1">Email address</label>
                    <input name="Email" onChange={handleChange} value={user.Email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input name="Password" onChange={handleChange} value={user.Password} type="password" class="form-control" id="exampleInputPassword1" placeholder="Create a strong password" />
                </div>
                <div class="form-group">
                    <p>Already a user? <a href="/login">Login</a></p>
                </div>
                <button type="submit" class="btn btn-secondary">Submit</button>
            </form>
            {flag === 1 && <div className="container">
                <div class="alert alert-danger container " role="alert">
                    Registration failed as the user alraedy exists.
                </div>
            </div>}
            {flag === 2 && <div className="container">
                <div class="alert alert-success container " role="alert">
                    Registration Successful!!!
                </div>
            </div>}

        </div>
    );
}

export default Register;