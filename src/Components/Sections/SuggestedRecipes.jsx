import React from 'react';
import {Button, Spinner} from "react-bootstrap";
import MealCard from "../Cards/MealCard.jsx";

function SuggestedRecipes({recipes, loading, generateAgain, prompt}) {
    return (
        <div>
            <h1 className={"fw-bold mt-5"}>Suggested Recipes</h1>
            {loading ? (  //daca inca nu au venit din API retetele, va fi afisat un spinner, pe baza unei variabile boolene loading
                <div className="text-center">
                    <Spinner className={"mt-3"} animation="border" variant="dark"/>
                </div>
            ) : (
                recipes.map((recipe, index) => (
                    <MealCard
                        key={index}
                        recipe={recipe}
                    />
                ))
            )}
            <div className={"d-flex justify-content-center mt-5"}>
                <Button type="button" onClick={(e) => generateAgain(e, prompt)}
                        className={"dontLikeButton text-decoration-none fw-medium py-2"}>I
                    don't like these</Button>
            </div>
        </div>
    );
};

export default SuggestedRecipes;