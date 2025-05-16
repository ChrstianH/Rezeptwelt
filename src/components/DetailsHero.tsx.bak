import { getStorageURL } from "../lib/supabase";

export default function DetailsHero(props: {
  name: string;
  image_url: string | null;
}) {
  const background = props.image_url;

  const imageFullPath = getStorageURL(background);

  const imgStyle = {
    backgroundImage: `url(${imageFullPath || "https://placehold.co/600x900"}`,
  };

  return (
    <div className="details-hero" style={imgStyle}>
      <h2 className="details-hero-text">{props.name}</h2>
    </div>
  );
}
