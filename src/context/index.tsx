import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ContextTypeProviderProps {
  children: React.ReactNode;
}

interface recipe {
  id: number;
  image_url: string;
  title: string;
  publisher: string;
}

type ContextType = {
  searchParam: string;
  recipeList: recipe[];
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  isLoading: boolean;
  setIsLaoding: React.Dispatch<React.SetStateAction<boolean>>;
  searchedTitle: string;
  setSearchedTitle: React.Dispatch<React.SetStateAction<string>>;
  favoriteList: recipe[];
  setFavoriteList: React.Dispatch<React.SetStateAction<never[]>>;
  handleFavorite: () => void;
};

export const GlobalContext = createContext({} as ContextType);

export const GlobalState = ({ children }: ContextTypeProviderProps) => {
  const [searchParam, setSearchParam] = useState("");
  const [recipeList, setrecipeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [favoriteList, setFavoriteList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setrecipeList(data?.data?.recipes);
        setSearchedTitle(searchParam);
        setSearchParam("");
        setIsLoading(false);
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function handleFavorite(getCurrentItem: recipe) {
    console.log(getCurrentItem);
    const copyFavoriteList = [...favoriteList];
    const index = copyFavoriteList.findIndex(
      (item) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      copyFavoriteList.push(getCurrentItem);
    } else {
      copyFavoriteList.splice(index);
    }

    setFavoriteList(copyFavoriteList);

    console.log(favoriteList);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        recipeList,
        isLoading,
        searchedTitle,
        favoriteList,
        setFavoriteList,
        handleFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
