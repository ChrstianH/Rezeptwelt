import axios, { AxiosError } from "axios";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import DetailsHero from "../components/DetailsHero";
import { useUserContext } from "../context/userContext";
import RecipeData from "../types/recipesData";

export default function DetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const { user } = useUserContext();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await supabase.from("recipes").delete().eq("id", id!);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/recipe`, { params: { recipe_id: id } })
      .then((recipe) => {
        setRecipe(recipe.data[0] as RecipeData);
      });
  }, []);

  if (!recipe) return;

  return (
    <main>
      <DetailsHero name={recipe.name} image_url={recipe.image_url} />
      <div className="details">
        {user && (
          <div className="edit">
            <Link to={`/edit-recipe/${id}`}>
              <img
                src="/img/writing-icon.svg"
                alt="Bearbeiten"
                title="Bearbeiten"
              />
            </Link>
            <button onClick={handleDelete}>
              <img src="/img/recycle-bin.svg" alt="Löschen" title="Löschen" />
            </button>
          </div>
        )}
        <div className="details-ingredients">
          <h3>Zutaten</h3>
          {/*           <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul> */}
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
    </main>
  );
}
