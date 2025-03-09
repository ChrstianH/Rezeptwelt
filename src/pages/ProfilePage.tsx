import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../context/userContext";
import { supabase, getStorageURL } from "../lib/supabase";

export default function ProfilePage() {
  const { user } = useUserContext();

  if (!user) {
    return;
  }
  const fileRef = useRef<HTMLInputElement>(null);

  const [vorname, setVorname] = useState<string | null | undefined>("");
  const [nachname, setNachname] = useState<string | null | undefined>("");
  const [profilePath, setProfilePath] = useState("");

  const getUser = async () => {
    const profile = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    return profile;
  };

  const handleFileUpload = async () => {
    const file = fileRef.current?.files?.[0] || null;

    let imagePath: string | null = null;

    if (file) {
      const uploadResult = await supabase.storage
        .from("profilePhotos")
        .upload(`${user.id}/${crypto.randomUUID()}`, file, { upsert: true });
      imagePath = uploadResult.data?.fullPath || null;
    }

    await supabase
      .from("profiles")
      .update({
        profilePhoto_url: imagePath,
      })
      .eq("id", user.id);
  };

  useEffect(() => {
    getUser().then((result) => {
      setVorname(result.data?.first_name);
      setNachname(result.data?.last_name);
      setProfilePath(result.data?.profilePhoto_url!);
    });
  }, []);

  let imageURL: string | null = null;
  if (profilePath) {
    imageURL = getStorageURL(profilePath);
  }

  return (
    <div className="profile">
      <h2>Profil</h2>
      <div>
        <div className="profileData">
          <div>
            <p>
              Name: {vorname} {nachname}
            </p>
            <p>E-Mail: {user?.email}</p>
            <p>Angelegt: {new Date(user?.created_at!).toLocaleDateString()}</p>
            <p>
              Zuletzt geändert:{" "}
              {new Date(user?.updated_at!).toLocaleDateString()}
            </p>
            <p>
              letzte Anmeldung:{" "}
              {new Date(user?.last_sign_in_at!).toLocaleDateString()}
            </p>
          </div>
          <div>
            <input type="file" ref={fileRef} />
            <button onClick={handleFileUpload}>Upload</button>
          </div>
        </div>
        <img src={imageURL || "https://placehold.co/600x900"} alt="" />
      </div>
    </div>
  );
}
