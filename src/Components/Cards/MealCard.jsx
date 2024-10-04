import React from 'react';
import {Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import FavoriteButton from "../Buttons/FavoriteButton.jsx";

function MealCard({recipe}) {
    const navigate = useNavigate();

    //avand in vedere ca nu avem un ID al retetelor, deoarece ele vin prin GEMINI API, o sa le cautam/gestionam dupa numele lor
    // numele retetei fiind si referinta catre ele
    const handleCardClick = () => {
        navigate(`/recipe/${encodeURIComponent(recipe.recipeName)}`, {
            state: {recipe}  // prin acest state transferam obiectul gasit
        });
    };

    //aceasta functie cosmetizeaza aspectul cardului prin taierea caracterelor din titlurile
    //retetelor si adaugarea "..." in schimb
    function truncateStringByWidth(str, maxWidth, font = '16px Outfit') { //numarul maxim de caractere
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;

        // verificam lungimea totala a stringului
        if (context.measureText(str).width > maxWidth) {
            // Keep truncating until it fits
            while (context.measureText(str).width > maxWidth) {
                str = str.slice(0, -1); // stergem doar un caracter o data, pentru a vedea cat este necesar
            }
            return str + '...';
        }
        return str; // daca e in dimensiuni normale si arata bine, il returnam asa cum e
    }

    return (
        <div>
            <Card onClick={handleCardClick} className={"cardMeal mb-3"}>
                <Card.Body className={"d-flex gap-3 align-items-center p-0 cardBody"}>
                    <div className={"cardImage"}>
                    </div>
                    <div className={"w-100 p-3"}>
                        <h5>{truncateStringByWidth(recipe.recipeName, 150)}</h5>
                        <p className={"mb-0 fw-light"}>{recipe.recipePreparationTime}.</p>
                    </div>
                    <div className={"d-flex align-items-center p-3"}>
                        <FavoriteButton recipe={recipe}/>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default MealCard;