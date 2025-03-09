import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

type Ingredient = {
  name: string;
  quantity?: number | null | undefined;
  unit?: string | null | undefined;
  additional_info?: string | null | undefined;
  recipe_id: string | null;
};
type Category = {
  id: string;
  name: string;
};

export default function RecipeCreatePage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const portionsRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const ingrNameRef = useRef<HTMLInputElement>(null);
  const ingrQuantRef = useRef<HTMLInputElement>(null);
  const ingrUnitRef = useRef<HTMLInputElement>(null);
  const ingrInfoRef = useRef<HTMLInputElement>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const createNewLine: React.MouseEventHandler<HTMLButtonElement> = () => {
    const i_name = ingrNameRef.current!.value;
    const i_quantity = ingrQuantRef.current!.value;
    const i_unit = ingrUnitRef.current!.value;
    const i_info = ingrInfoRef.current!.value;

    const newIngredient: Ingredient = {
      name: i_name,
      quantity: Number(i_quantity),
      unit: i_unit || null,
      additional_info: i_info || null,
      recipe_id: null,
    };

    const updatedIngredients = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const result = await supabase
      .from("recipes")
      .insert({
        name: nameRef.current!.value,
        description: descRef.current!.value,
        servings: Number(portionsRef.current!.value),
        instructions: instructionsRef.current!.value,
        category_id: categoryRef.current!.value,
      })
      .select("id")
      .single();

    const iResult = await supabase.from("ingredients").insert(
      ingredients.map((ingredient: Ingredient) => ({
        name: ingredient.name,
        quantity: Number(ingredient.quantity) || null,
        unit: ingredient.unit || null,
        additional_info: ingredient.additional_info || null,
        recipe_id: result.data!.id,
      }))
    );

    const file = fileRef.current?.files?.[0] || null;

    let imagePath: string | null = null;

    if (file) {
      const uploadResult = await supabase.storage
        .from("recipePhotos")
        .upload(`${result.data!.id}/${crypto.randomUUID()}`, file, {
          upsert: true,
        });
      imagePath = uploadResult.data?.fullPath || null;
    }

    await supabase
      .from("recipes")
      .update({
        image_url: imagePath,
      })
      .eq("id", result.data!.id);
    if (result.error || iResult.error) {
      if (iResult.error) {
        alert(iResult.error.message);
      } else {
        alert(result.error?.message);
      }
    } else {
      alert("Neues Rezept angelegt");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const result = await supabase.from("categories").select("id, name");
    setCategories(result.data ?? []);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" ref={nameRef} />
          </div>
          <div>
            <label htmlFor="description">Beschreibung</label>
            <input
              type="text"
              name="description"
              id="description"
              ref={descRef}
            />
          </div>
          <div>
            <label htmlFor="portions">Anzahl der Portionen</label>
            <input
              type="number"
              name="portions"
              id="portions"
              ref={portionsRef}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="instructions">Anleitung</label>
            <textarea
              cols={80}
              rows={8}
              name="instructions"
              id="instructions"
              ref={instructionsRef}
            />
          </div>
          <div>
            <label htmlFor="category">Kategorie</label>
            <select name="category" id="category" ref={categoryRef}>
              {categories.map((category: { id: string; name: string }) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button>Rezept anlegen</button>

        <div>
          <input type="file" ref={fileRef} />
        </div>

        <div>
          <h3>Zutaten</h3>
          <div>
            <label htmlFor="ingr_name">Name</label>
            <input
              type="text"
              name="ingr_name"
              id="ingr_name"
              ref={ingrNameRef}
            />
          </div>
          <div>
            <label htmlFor="ingr_quantity">Menge</label>
            <input
              type="number"
              name="ingr_quantity"
              id="ingr_quantity"
              ref={ingrQuantRef}
            />
          </div>
          <div>
            <label htmlFor="ingr_unit">Einheit</label>
            <input
              type="text"
              name="ingr_unit"
              id="ingr_unit"
              ref={ingrUnitRef}
            />
          </div>
          <div>
            <label htmlFor="ingr_info">Zusätzl. Informationen</label>
            <input
              type="text"
              name="ingr_info"
              id="ingr_info"
              ref={ingrInfoRef}
            />
          </div>
          <div>
            <button type="button" onClick={createNewLine}>
              ➕
            </button>
          </div>
        </div>
      </form>

      <div>
        <ul>
          {ingredients.map((ingredient: Ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}{" "}
              {ingredient.additional_info ?? ""}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
