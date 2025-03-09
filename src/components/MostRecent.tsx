import RecipePage from "../pages/RecipePage";
import { QueryData } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function MostRecent() {
  const [mostRecent, setMostRecent] = useState<RecipesData>([]);

  const getMostRecentRecipes = async () => {
    const recipes = await supabase
      .from("recipes")
      .select("id, image_url, name, description")
      .order("created_at", { ascending: false })
      .limit(3);
    return recipes;
  };
  useEffect(() => {
    getMostRecentRecipes().then((result) => setMostRecent(result.data ?? []));
  }, []);

  type RecipesData = QueryData<ReturnType<typeof getMostRecentRecipes>>;

  return (
    <div className="most-recent">
      <h3>Die neuesten Rezepte</h3>

      {mostRecent?.map((recipe) => (
        <RecipePage key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
