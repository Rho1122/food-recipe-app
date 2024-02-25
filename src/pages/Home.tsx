import { useContext } from "react";
import { GlobalContext } from "../context";
import { NavLink } from "react-router-dom";

const Home = () => {
  const { searchedTitle, isLoading, recipeList } = useContext(GlobalContext);
  console.log(recipeList);

  return (
    <>
      <div className="wrapper d-flex flex-wrap justify-content-center flex-grow-1">
        {isLoading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden text-center">Loading...</span>
          </div>
        )}
        <div className="container my-2">
          <h3 className="text-center">
            {recipeList && recipeList.length
              ? `${searchedTitle.toUpperCase()} RECIPE ${
                  recipeList.length
                } results`
              : null}
          </h3>
        </div>
        {recipeList && recipeList.length ? (
          recipeList.map((item) => (
            <div
              className="result-wrapper p-3 m-3 rounded-2 shadow"
              key={item.id}
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="image-wrapper"
              />
              <div className="title mt-3">
                <div className="small text-success">{item.publisher}</div>
                <div className="recipe-title mb-2 fs-5">
                  {item.title.length > 20
                    ? item.title.slice(0, 20) + "..."
                    : item.title}
                </div>
              </div>
              <NavLink to={`recipe-details/${item.id}`}>
                <button className="btn btn-success">View Recipe</button>
              </NavLink>
            </div>
          ))
        ) : (
          <div className="container p-3">
            <h2 className="text-center text-danger">
              No recipe to show! please enter a recipe.
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
