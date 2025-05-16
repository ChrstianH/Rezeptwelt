import { Link } from "react-router-dom";
import { getStorageURL } from "../lib/supabase";

export default function RecipePage(props: {
  recipe: {
    id: string;
    image_url: string | null;
    name: string;
    description: string;
  } | null;
}) {
  const imageFullPath = getStorageURL(props.recipe!.image_url);
  return (
    <div className="recipe-page">
      <Link to={`/recipe/${props.recipe!.id}`}>
        <img
          src={imageFullPath || "https://placehold.co/600x900"}
          alt={props.recipe!.name}
        />
      </Link>
      <div className="info">
        <h3>{props.recipe!.name}</h3>
        <p>{props.recipe?.description}</p>
        <Link to={`/recipe/${props.recipe!.id}`} className="to-recipe">
          Zum Rezept
        </Link>
      </div>
    </div>
  );
}
