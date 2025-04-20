import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import { useEffect, useState } from "react";

export default function Overview() {
  const [session, setSession] = useState<string>("");
  const [session2, setSession2] = useState<string>("");
  const navigation = useNavigate();

  useEffect(() => {
    fetchSession();
    loadSession();
    checkSession();
  }, []);

  async function fetchSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
    } else {
      if (data.session?.access_token) {
        //console.log(data.session.access_token);
        setSession(data.session.access_token);
        //setSession(data.session);
      }
    }
  }

  async function loadSession() {
    const { data } = await supabase
      .from("SupaBase-Session")
      .select()
      .order("id");

    if (data) {
      //console.log(data[0].Session);
      setSession2(data[0].Session);

      //setSession(data.Session);
    }
  }

  function checkSession() {
    if (session2 === session) {
      console.log("Check");

      navigation("/overview");
    }
  }

  async function logOut() {
    const {} = await supabase
      .from("SupaBase-Session")
      .update({ Session: "" })
      .eq("id", 1);

    const {} = await supabase.auth.signOut();

    navigation("/");
  }

  return (
    <>
      <h1>Übersichtsseite</h1>
      <p>Hier refreshen</p>
      <button onClick={logOut}>Ausloggen</button>
    </>
  );
}
