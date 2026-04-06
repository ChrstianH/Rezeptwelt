import { Link } from "react-router-dom";
// import { getStorageURL } from "../lib/supabase";
import RecipesData from "../types/recipesData";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RecipeCard(props: { recipe: RecipesData }) {
  //  const imageFullPath = getStorageURL(props.recipe!.image_url);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await axios.get(
          `https://rezeptwelt-backend.onrender.com/getImage/`,
          {
            params: { imageName: props.recipe!.image_url },
          },
        );
        setImageUrl(image.data ?? []);
      } catch (error) {
        setImageUrl(null);
      }
    };

    fetchData();
  }, [props.recipe]);

  /* return (
    <div className="recipe-page">
        console.log(image.data);
        setImageUrl(image.data ?? []);
      })
      .catch(() => {
        setImageUrl(null);
      });
  }, [props.recipe]); */

  return (
    <div className="recipe-page">
      <Link to={`/recipe/${props.recipe!.id}`}>
        <img
          src={
            imageUrl
              ? `https://rezeptwelt-backend.onrender.com/static-images/rezeptwelt/${imageUrl}.jpg`
              : "https://placehold.co/600x900"
          }
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
