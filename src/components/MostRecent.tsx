import RecipesData from "../types/recipesData";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { Link } from "react-router-dom";

export default function MostRecent() {
  const [mostRecent, setMostRecent] = useState<RecipesData[]>();

  useEffect(() => {
    axios
      .get("https://rezeptwelt-backend.onrender.com/getAllRecipes")
      .then((recipes) => {
        setMostRecent(recipes.data ?? []);
      });
  }, []);

  return (
    <div className="most-recent">
      <h3>Alle Rezepte</h3>

      <ul>
        {mostRecent?.map((recipe: RecipesData) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
