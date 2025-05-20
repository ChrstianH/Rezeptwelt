import axios from "axios";
import RecipePage from "../pages/RecipePage";
import { useEffect, useState } from "react";
import RecipesData from "../types/recipesData";

export default function MostPopular() {
  const [mostPopular, setMostPopular] = useState<RecipesData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8080").then((recipes) => {
      setMostPopular(recipes.data ?? []);
    });
  }, []);

  return (
    <div className="most-popular">
      <h3>Die beliebtesten Rezepte</h3>
      <div className="most-popular-cards">
        {mostPopular?.map((recipe: RecipesData) => (
          <RecipePage key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
