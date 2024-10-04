import React from 'react';
import {useLocation, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import FavoriteButton from "../Components/Buttons/FavoriteButton.jsx";

const RecipeDetails = () => {
    const {recipeName} = useParams();  // preiau din params reteta
    const location = useLocation();

    const recipe = location.state?.recipe;    //verific daca exista reteta venita din params
    console.log(recipe)
    return (
        <div>
            <Container>
                {recipe ? (
                    <div>
                        <Row className="justify-content-center">
                            <Col md={10}>
                                <Row className={"mt-5"}>
                                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"leftCol"}>
                                        <div className="recipeImage">
                                        </div>
                                        <div className={"d-flex justify-content-between align-items-center mt-5"}>
                                            <h4 className={"fw-bold mb-0 text-wrap pe-3"}>{recipe.recipeName}</h4>
                                            <FavoriteButton recipe={recipe}/>
                                        </div>
                                        <p className={"fw-light"}>{recipe.recipePreparationTime}</p>
                                    </Col>
                                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className={"fw-light"}>
                                        <p>Ingredients:</p>
                                        <ul>
                                            {recipe.recipeIngredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                        <p className={"mt-5"}>Instructions:</p>
                                        <ol>
                                            {recipe.recipeInstructions ? (
                                                Array.isArray(recipe.recipeInstructions) ? (
                                                    recipe.recipeInstructions.map((step, index) => (
                                                        <li key={index} className={"m-0"}>
                                                            {step.trim().replace(/^\d+\.\s*/, '')}
                                                        </li>
                                                    ))
                                                ) : (
                                                    typeof recipe.recipeInstructions === 'string' &&
                                                    recipe.recipeInstructions.split(/\s*(?=\d+\.\s)/).map((step, index) => (
                                                        <li key={index} className={"m-0"}>
                                                            {step.trim().replace(/^\d+\.\s*/, '')}
                                                        </li>
                                                    ))
                                                )
                                            ) : (
                                                <li>No instructions found.</li>
                                            )}
                                        </ol>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <div>Recipe not found</div>
                )}
            </Container>
            );

        </div>
    );
};

export default RecipeDetails;