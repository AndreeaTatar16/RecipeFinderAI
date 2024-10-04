import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase/firebase.js";
import {faHeart as faRegularHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faSolidHeart} from "@fortawesome/free-solid-svg-icons";

const FavoriteButton = (props) => {
    const recipe = props.recipe;

    const [isFavorite, setIsFavorite] = useState(false);   //la inceput cand reteta nu e salvata inca la favorita, variabila este false
    const [favoriteDocId, setFavoriteDocId] = useState(null);     //inserarea cu reteta favorita

    // cauta in baza de date, in tabela de Favorite, reteta pe care trebuie sa o compar, dupa numele retetei
    useEffect(() => {
        const checkIfFavorite = async () => {
            const q = query(collection(db, 'favoriteRecipes'), where('recipeName', '==', recipe.recipeName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {   //daca s-a gasit ceva, isFavorite va fi true
                setIsFavorite(true);
                const docId = querySnapshot.docs[0].id;  // primul id gasit care corespunde cautarii
                setFavoriteDocId(docId);
            }
        };

        checkIfFavorite();
    }, [recipe.recipeName]);   //se executa in functie de schimbarea lui recipeName


    //functie care adauga sau sterge din baza de date reteta. in functie de preferinte
    const toggleFavorite = async (recipe) => {
        if (isFavorite) {
            // daca este deja in tabela, o stergem, cand userul apasa inca o data butonul
            if (favoriteDocId) {
                await deleteDoc(doc(db, 'favoriteRecipes', favoriteDocId));  //stergem din db dupa id-ul retetei gasite
                setIsFavorite(false);
                setFavoriteDocId(null);  // se sterge referinta pentru id-ul retetei
            }
        } else {
            // daca reteta nu se regaseste in tabela, o adaugam
            const docRef = await addDoc(collection(db, 'favoriteRecipes'), {
                recipeName: recipe.recipeName,
                recipeIngredients: recipe.recipeIngredients,
                recipeInstructions: recipe.recipeInstructions,
                recipePreparationTime: recipe.recipePreparationTime,
                recipeIsFavorite: true
            });
            setIsFavorite(true);  // se modifica si campul pentru a putea gestiona si UI-ul, daca isFavorite e true, atunci e inima solid, daca nu, e regular
            setFavoriteDocId(docRef.id);  // stocam noua referinta catre reteta adaugata, pentru a o putea sterge ulterior
        }
    }

    return (
        <div>
            <Button onClick={() => toggleFavorite(props.recipe)} variant="link" className={"text-decoration-none"}>
                {isFavorite ? (<FontAwesomeIcon icon={faSolidHeart} size="2xl" color="#65558F"
                                                className={"loveIcon"}/>) : (
                    <FontAwesomeIcon icon={faRegularHeart} size="2xl" color="#65558F"
                                     className={"loveIcon"}/>)}
            </Button>
        </div>
    );
};

export default FavoriteButton;