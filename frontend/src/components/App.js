import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import Header from "../non-components/Header";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import UserPage from "./UserPage";
import SellItem from "./SellItem";


function App() {

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/userPage" element={<UserPage/>}></Route>
                    <Route path="/sellItem" element={<SellItem/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;