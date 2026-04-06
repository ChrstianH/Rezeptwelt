import IngredientsData from "./ingredientsData";
import InstructionsData from "./instructionsData";

type RecipesData = {
  id: number;
  name: string;
  description: string;
  instructions: InstructionsData[];
  ingredients: IngredientsData[];
  image_url: string | null;
};
export default RecipesData;
