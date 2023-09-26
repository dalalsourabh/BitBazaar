import React, { useEffect, useState } from "react";
import axios from "axios"; 
function ItemCard(props) {

    const [seller,setSeller]=useState({});

    async function fetchData(){
        await axios
            .get("http://localhost:8000/user/profile/"+props.sellerID)
            .then(function (response) {
                setSeller(response.data);
            });
    }

    useEffect(()=>{
        fetchData();
    },[])

    async function delClick(){

        await axios.delete("http://localhost:8000/item/deleteItem/"+props.itemID,
        { headers: { 'authTokenKST': localStorage.getItem('authTokenKST') } })
        .then(function(response){
            window.location.reload();
        })

    }

    return (
        <div className=" card item mx-10" id="card">
            <img className="card-img-top" src={props.image} alt="NA" />
            <div className="card-body">
                <p className="card-title title">{props.title}</p>
                <p className="card-text description">  &#8377; {props.price}</p>
                <p className="card-text description">{props.description}</p>
            </div>
            {props.check && <i id="del" onClick={delClick} class="fa-solid fa-trash-can" style={{color: "#ff0000;"}}></i>}
        </div>
    );
}

export default ItemCard;