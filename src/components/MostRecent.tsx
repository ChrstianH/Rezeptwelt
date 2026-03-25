import RecipesData from "../types/recipesData";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";

export default function MostRecent() {
  const [mostRecent, setMostRecent] = useState<RecipesData[]>();

  useEffect(() => {
    axios
      .get("https://rezeptwelt-backend.onrender.com/getMostRecent")
      .then((recipes) => {
        setMostRecent(recipes.data ?? []);
      });
  }, []);

  return (
    <div className="most-recent">
      <h3>Die neuesten Rezepte</h3>

      {mostRecent?.map((recipe: RecipesData) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
