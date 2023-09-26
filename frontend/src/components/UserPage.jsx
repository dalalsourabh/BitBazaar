import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";


function UserPage() {

    const [itemList, setItemList] = useState([]);

    async function fetchData() {
        await axios
            .get("http://localhost:8000/item/userItems/" + localStorage.getItem('userIdKST'),
                { headers: { 'authTokenKST': localStorage.getItem('authTokenKST') } })
            .then(function (response) {
                setItemList(response.data);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Your Items</h1>
            <div class="row row-cols-1 row-cols-md-3 g-4 pb-5 pl-4 pr-4 pt-4">
                {Array.isArray(itemList) ? itemList.map(ele => (
                    <ItemCard itemID={ele._id} title={ele.Title} description={ele.Description} price={ele.Price} sellerID={ele.SellerID} image={ele.Image} check={true}/>
                )) : []}
            </div>
        </div>
    )

}

export default UserPage;