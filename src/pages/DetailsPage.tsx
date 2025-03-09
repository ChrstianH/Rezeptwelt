import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { QueryData } from "@supabase/supabase-js";
import DetailsHero from "../components/DetailsHero";
import { useUserContext } from "../context/userContext";

export default function DetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const { user } = useUserContext();

  const getRecipe = async () => {
    const recipe = await supabase
      .from("recipes")
      .select("id, image_url, name, instructions, description, ingredients(*)")
      .eq("id", id!)
      .single();
    return recipe;
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await supabase.from("recipes").delete().eq("id", id!);
  };

  useEffect(() => {
    getRecipe().then((result) => setRecipe(result.data));
  }, []);

  type RecipeData = QueryData<ReturnType<typeof getRecipe>>;

  if (!recipe) return;

  return (
    <div>
      <DetailsHero name={recipe?.name} image_url={recipe?.image_url} />{" "}
      <div className="details">
        {user && (
          <div className="edit">
            <Link to={`/edit-recipe/${id}`}>
              <img
                src="../src/assets/img/writing-icon.svg"
                alt="Bearbeiten"
                title="Bearbeiten"
              />
            </Link>
            <button onClick={handleDelete}>
              <img
                src="../src/assets/img/recycle-bin.svg"
                alt="Löschen"
                title="Löschen"
              />
            </button>
          </div>
        )}
        <div className="details-ingredients">
          <h3>Zutaten</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="details-instructions">
          <h3>Zubereitung</h3>
          <article>{recipe.instructions}</article>
        </div>
        <div className="details-add-info">
          <h3>Zusätzliche Informationen</h3>
          <article>{recipe.description}</article>
        </div>
      </div>
    </div>
  );
}
