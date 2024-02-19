import { Link } from "react-router-dom";

const NoPageFound = () => {
  return (
    <div className="container p-5 d-flex flex-column justify-content-center">
      <h2>Hey! You are lost!</h2>
      <Link to={"/"}>
        <button type="submit" className="btn btn-primary">
          Go back home
        </button>
      </Link>
    </div>
  );
};

export default NoPageFound;
