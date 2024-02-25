import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { GlobalContext } from "../context";

interface ingredientsItem {
  description: string;
  quantity: number;
}

interface recipes {
  cooking_time: number;
  image_url: string;
  ingredients: ingredientsItem[];
  publisher: string;
  servings: 4;
  source_url: string;
  title: string;
  id: number;
}
const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<recipes>();
  const { handleFavorite, favoriteList } = useContext(GlobalContext);
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => {
        console.log(res.data.data.recipe);
        if (res.data.data) {
          setRecipeDetails(res.data.data.recipe);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      <div className="container recipe-wrapper">
        <div className="image-holder p-2 mt-lg-3">
          <img
            src={recipeDetails?.image_url}
            alt=""
            width={500}
            height={400}
            className="rounded"
          />
        </div>
        <div className="info-holder p-5">
          <h6 className="text-success">
            Publisher: {recipeDetails?.publisher}
          </h6>
          <h2>{recipeDetails?.title}</h2>

          <div className="text-warning mb-3">
            Serving: {recipeDetails?.servings} People | Cooking Time:
            {recipeDetails?.cooking_time}mins
          </div>

          <button
            onClick={() => handleFavorite(recipeDetails)}
            className="btn btn-success"
          >
            {favoriteList.findIndex((item) => item.id === recipeDetails?.id) !==
            -1
              ? "Remove from Favorite"
              : "Save as Favorite"}
          </button>
          <NavLink to={"/"}>
            <button className="btn btn-success mx-2">View more Recipe</button>
          </NavLink>
          <div>
            <h3 className="my-3">Ingridients</h3>
            <div className="d-flex flex-wrap gap-2">
              {recipeDetails?.ingredients.map((ingredient, index) => (
                <button key={index} className="btn bg-primary-subtle rounded-3">
                  <span>
                    {ingredient.quantity ? `(${ingredient.quantity})` : null}
                  </span>
                  {ingredient.description}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
