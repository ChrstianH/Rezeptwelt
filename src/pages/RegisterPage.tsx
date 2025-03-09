import { useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: vorname,
          last_name: nachname,
        },
      },
    });
    if (result.error) {
      alert(result.error.message);
    } else {
      setUser(result.data.user);
      alert("Bitte bestätige deine Registrierung per E-Mail");
      navigate("/");
    }
  };

  return (
    <div className="signInUp">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vorname">Vorname</label>
        <input
          type="text"
          name="vorname"
          id="vorname"
          placeholder="Vornaame"
          value={vorname}
          onChange={(e) => setVorname(e.target.value)}
        />
        <label htmlFor="nachname">Nachname</label>
        <input
          type="text"
          name="nachname"
          id="nachname"
          placeholder="Nachname"
          value={nachname}
          onChange={(e) => setNachname(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="john.doe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Registrieren</button>
      </form>
    </div>
  );
}
