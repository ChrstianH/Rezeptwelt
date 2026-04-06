//import { getStorageURL } from "../lib/supabase";

export default function DetailsHero(props: {
  name: string;
  image_url: string | null;
}) {
  // const getStorageURL = (path: string | null) => {
  //   if (path === null) return null;
  //   const URL = "/rezeptwelt/" + path;
  //   return URL;
  // };

  //const background = props.image_url;
  //const imageFullPath = getStorageURL(background);

  const imgStyle = {
    backgroundImage: props.image_url
      ? `url(https://rezeptwelt-backend.onrender.com/static-images/rezeptwelt/${props.image_url}.jpg)`
      : `url(https://placehold.co/600x900)`,
  };

  return (
    <div className="details-hero" style={imgStyle}>
      <h2 className="details-hero-text">{props.name}</h2>
    </div>
  );
}
