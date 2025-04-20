import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  interface SessionDataType {
    id: number;
    session: string;
  }

  const [signinUserEMail, setSigninUserEMail] = useState<string>("");
  const [signinUserPassword, setSigninUserPassword] = useState<string>("");
  const [session, setSession] = useState<SessionDataType>({
    id: 0,
    session: "",
  });
  const navigation = useNavigate();

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    const { data } = await supabase
      .from("SupaBase-Session")
      .select()
      .order("id");

    if (data) {
      console.log(data);
      setSession({ ...session, id: data[0].id, session: data[0].Session });
    }
  }

  async function signIn() {
    if (signinUserEMail !== "" && signinUserPassword !== "") {
      const { data } = await supabase.auth.signInWithPassword({
        email: signinUserEMail,
        password: signinUserPassword,
      });

      if (data) {
        if (data.session?.access_token) {
          if (session.id === 0) {
            console.log(data.session);
            addSession(data.session.access_token);
          } else {
            updateSession(data.session.access_token);
          }

          navigation("/overview");
        }
      } else {
        alert();
      }
    }
  }

  async function addSession(newSession: string) {
    const {} = await supabase
      .from("SupaBase-Session")
      .insert({ Session: newSession });
  }

  async function updateSession(newSession: string) {
    const {} = await supabase
      .from("SupaBase-Session")
      .update({ Session: newSession })
      .eq("id", session.id);
  }

  return (
    <>
      <h1>React + Vite error Page after refresh SupaBase Übung</h1>
      <br />
      <br />
      <h1>SignIn</h1>
      <div>
        <input
          type="text"
          value={signinUserEMail}
          onChange={(event) => {
            setSigninUserEMail(event.target.value);
          }}
          name=""
        />
        <input
          type="password"
          value={signinUserPassword}
          onChange={(event) => {
            setSigninUserPassword(event.target.value);
          }}
          name=""
        />
        <button onClick={signIn}>Anmelden</button>
      </div>
    </>
  );
}
