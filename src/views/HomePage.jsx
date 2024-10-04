import React, {useState} from 'react';
import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {GoogleGenerativeAI} from "@google/generative-ai";
import SuggestedRecipes from "../Components/Sections/SuggestedRecipes.jsx";
import FavoriteRecipes from "../Components/Sections/FavoriteRecipes.jsx"; // Import useNavigate for redirection

const HomePage = () => {
    const genAI = new GoogleGenerativeAI("AIzaSyD6t-ajiVvYeNECkBTO9By3eF3tv3M32Hg");
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

    const [recipes, setRecipes] = useState([]);
    const [recipesInput, setRecipesInput] = useState("");    //inputul pentru cerinta userului
    const [loading, setLoading] = useState(false); //pentru loading spinner, la inceput este fals, ulterior cand se va apasa cautare, va fi true

    //preluam din input valoarea care este introdusa
    const handleInputChange = (e) => {
        setRecipesInput(e.target.value);
    };

    // nu am gasit ca Gemini sa ofere un raspuns JSON, asa ca am facut un prompt care sa fie format din cerinta userului si in spate
    // sa fie o cerinta default
    const prompt = recipesInput + " Give me 5 recipes and the response in JSON format containing only the recipeName, recipeInstructions, recipePreparationTime and recipeIngredients.";

    //functie care apeleaza API-ul si genereaza raspunsul
    const generateContentAndLog = async (e, prompt) => {
        e.preventDefault();
        //verific daca exista continut in input
        if (recipesInput !== '') {
            setLoading(true); // loading va fi true, pentru a fi afisat, pana inca nu s-au gasit retetele
            try {
                const result = await model.generateContent(prompt);
                let responseText = result.response.text();
                responseText = responseText.replace(/```json|```/g, '');    //deoarece JSON-ul a venit cu acele caractere "```json", le-am eliminat
                const jsonResponse = JSON.parse(responseText);   //am facut parse la JSON
                setRecipes(jsonResponse);
            } catch (error) {
                console.error("Error generating response:", error);
            } finally {    //doar dupa ce s-au introdus retetele in variabila recipes, setez din nou loading la false
                setLoading(false);
            }
        } else {   //daca nu, il avertizez pe user sa introduca ceva in input
            alert("No recipes found! Please type something.");
        }
    };

    //functie care permite tastarea cerintei de catre user in input si apasarea tastei "ENTER" pentru a incepe generarea AI
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            generateContentAndLog(e, prompt); // functia care va fi apelata cand e apasata tasta
        }
    };

    return (
        <div>
            <Container>
                <Row className="justify-content-center py-5">
                    <Col xs={12} sm={12} md={6} lg={6} xl={5}>
                        <Form className="d-flex">
                            <Form.Group className="searchBox w-100">
                                <Form.Control
                                    type="text"
                                    placeholder="What do you feel like eating?"
                                    className="me-2 rounded-pill py-2 px-3"
                                    aria-label="Search"
                                    onChange={handleInputChange}
                                    id="searchBar"
                                    onKeyDown={(e) => {
                                        handleKeyDown(e)
                                    }}
                                />
                                <Button
                                    onClick={(e) => generateContentAndLog(e, prompt)}
                                    variant="link"
                                    className={"text-decoration-none"}
                                >
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </Button>
                            </Form.Group>
                        </Form>
                        {loading ? (
                            <div className="text-center">
                                <Spinner className={"mt-3"} animation="border" variant="dark"/>
                            </div>
                        ) : (
                            // am gandit aici 2 componente care sa se schimbe in functie de continut
                            //daca exista retete in variabila recipes, adica daca userul deja a facut o cautare,
                            // pe ecran vor fi afisate acele retete gasite de AI
                            // daca inca nu s-a facut nicio cautare, vor fi afisate FavoriteRecipes ale userului, care pot fi sterse si apoi adaugate din nou la favorite
                            recipes.length !== 0 ? (
                                <SuggestedRecipes
                                    recipes={recipes}
                                    loading={loading}
                                    generateAgain={generateContentAndLog}
                                    prompt={prompt}
                                />
                            ) : (
                                <FavoriteRecipes/>
                            )
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomePage;
