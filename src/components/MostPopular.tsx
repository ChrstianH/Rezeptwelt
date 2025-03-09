import RecipePage from "../pages/RecipePage";
import { QueryData } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MostPopular() {
  const [mostPopular, setMostPopular] = useState<RecipesData>([]);

  const getMostPopularRecipes = async () => {
    const recipes = await supabase
      .from("recipes")
      .select("id, image_url, name, description")
      .order("rating", { ascending: false })
      .limit(3);
    return recipes;
  };
  useEffect(() => {
    getMostPopularRecipes().then((result) => {
      setMostPopular(result.data ?? []);
    });
  }, []);

  type RecipesData = QueryData<ReturnType<typeof getMostPopularRecipes>>;

  return (
    <div className="most-popular">
      <h3>Die beliebtesten Rezepte</h3>
      <div className="most-popular-cards">
        {mostPopular?.map((recipe) => (
          <RecipePage key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
