import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";
import { useEffect, useState } from "react";

export default function Overview() {
  const navigation = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const { data: stroredSession } = await supabase
        .from("SupaBase-Session")
        .select("*")
        .order("id");

      if (
        session &&
        stroredSession &&
        session.access_token === stroredSession[0].Session
      ) {
        console.log("Check");
        navigation("/overview");
      }
    };

    checkSession();
  }, []);

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
