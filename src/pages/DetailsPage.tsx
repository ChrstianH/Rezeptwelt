import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import DetailsHero from "../components/DetailsHero";
import { useUserContext } from "../context/userContext";
import RecipeData from "../types/recipesData";
import InstructionsData from "../types/instructionsData";
import RecipesData from "../types/recipesData";
import IngredientsData from "../types/ingredientsData";

export default function DetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const { user } = useUserContext();

  console.log(id);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // await supabase.from("recipes").delete().eq("id", id!);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeResponse, instructionsResponse, ingredientsResponse] =
          await Promise.all([
            axios.get(`https://rezeptwelt-backend.onrender.com/recipe`, {
              params: { recipe_id: id },
            }),
            axios.get(
              `https://rezeptwelt-backend.onrender.com/getInstructions`,
              {
                params: { recipe_id: id },
              }
            ),
            axios.get(
              `https://rezeptwelt-backend.onrender.com/getIngredients`,
              {
                params: { recipe_id: id },
              }
            ),
          ]);

        const recipeData: RecipesData = recipeResponse.data[0];
        if (!recipeData) {
          return;
        }

        const instructionsData: InstructionsData[] = instructionsResponse.data;
        const ingredientsData: IngredientsData[] = ingredientsResponse.data;
        const combinedRecipe: RecipeData = {
          ...recipeData,
          instructions: instructionsData,
          ingredients: ingredientsData,
        };
        setRecipe(combinedRecipe);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
          <ul>
            {recipe.ingredients.map((ingredient: IngredientsData) => (
              <li key={ingredient.id}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="details-instructions">
          <h3>Zubereitung</h3>
          <ol>
            {recipe.instructions.map((instruction: InstructionsData) => (
              <li key={instruction.id}>{instruction.instruction_text}</li>
            ))}
          </ol>
        </div>
        <div className="details-add-info">
          <h3>Zusätzliche Informationen</h3>
          <article>{recipe.description}</article>
        </div>
      </div>
    </main>
  );
}
