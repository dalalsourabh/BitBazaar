import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {

    const nav = useNavigate();

    function handleLogin() {
        nav("/login");
    }

    function handleLogout() {
        localStorage.setItem('authTokenKST', "");
        localStorage.setItem('userIdKST', "");
        document.getElementById("logoutAlert").style.display = 'block';

        setTimeout(() => {
            document.getElementById("logoutAlert").style.display = 'none';
            nav('/');
        }, 1500);
    }

    function handleProfileClick() {
        nav("/userPage");
    }

    function handleSell() {
        if (!localStorage.getItem('authTokenKST')) {
            document.getElementById("loginAlert").style.display = 'block';
            setTimeout(() => {
                document.getElementById("loginAlert").style.display = 'none';
                nav('/login');
            }, 1500);
        } else {
            nav('/sellItem');
        }
    }

    return (
        <div>
            <header className="header">
                <nav class="navbar bg-body-tertiary bg-secondary">
                    <div class="container-fluid">
                        <a class="navbar-brand text-reset" href="/">
                            <p class="text-light">Team KST</p>
                        </a>

                        <div>
                            <button onClick={handleSell} type="button" class="btn btn-secondary">Sell Item</button>
                            {!localStorage.getItem('authTokenKST') && <button onClick={handleLogin} type="button" class="btn btn-secondary">Login</button>}
                            {localStorage.getItem('authTokenKST') && <button onClick={handleLogout} type="button" class="btn btn-secondary">Logout</button>}
                            {localStorage.getItem('authTokenKST') && <button onClick={handleProfileClick} type="button" class="btn btn-secondary"><i class="fa-solid fa-user"></i></button>}
                        </div>
                    </div>
                </nav>
                <div id="logoutAlert" class="alert alert-danger container " role="alert" style={{ display: 'none' }}>
                    Logged Out!!!
                </div>
                <div id="loginAlert" class="alert alert-danger container " role="alert" style={{ display: 'none' }}>
                    Need to Login First!!!
                </div>
            </header>
        </div>
    );

}

export default Header;



