import axios from "axios";
import { useEffect, useState } from "react";
import RecipesData from "../types/recipesData";
import RecipeCard from "./RecipeCard";

export default function MostPopular() {
  const [mostPopular, setMostPopular] = useState<RecipesData[]>([]);

  useEffect(() => {
    axios
      .get("https://rezeptwelt-backend.onrender.com/getMostPopular")
      .then((recipes) => {
        setMostPopular(recipes.data ?? []);
      });
  }, []);

  return (
    <div className="most-popular">
      <h3>Die neuesten Rezepte</h3>
      <div className="most-popular-cards">
        {mostPopular?.map((recipe: RecipesData) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
