import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase.js";
import MealCard from "../Cards/MealCard.jsx";

const FavoriteRecipes = () => {
    const [data, setData] = useState([]);

    // fetch-ul citeste toate inserarile din db, din tabela de Favorite
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'favoriteRecipes'));
            const items = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(items);   //stocam in data toate inserarile venite din db
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className={"fw-bold mt-5"}>Favorites</h1>
            <ul>
                {data.map((item, index) => (  //iteram asupra array-ului de retete si le afisam sub forma de carduri
                    <MealCard
                        key={index}
                        recipe={item}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FavoriteRecipes;