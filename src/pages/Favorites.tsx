import { useContext } from "react";
import { GlobalContext } from "../context";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const { favoriteList } = useContext(GlobalContext);
  return (
    <>
      <div className="m-3">
        <h3 className="text-center">FAVORITE RECIPE LIST</h3>
      </div>
      <div className="d-flex flex-wrap justify-content-center flex-grow-1">
        {favoriteList && favoriteList.length ? (
          favoriteList.map((item) => (
            <div
              className="result-wrapper p-3 m-3 rounded-2 shadow"
              key={item.id}
            >
              <img
                src={item.image_url}
                alt={item.title.slice(0, 30)}
                className="image-wrapper"
              />
              <div className="title mt-3">
                <div className="small text-success">{item.publisher}</div>
                <div className="mb-2 fs-5">{item.title}</div>
              </div>
              <NavLink to={`/recipe-details/${item.id}`}>
                <button className="btn btn-success">View Recipe</button>
              </NavLink>
            </div>
          ))
        ) : (
          <div className="container p-3">
            <h2 className="text-center text-danger">
              No recipe on your Favorite List.
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
