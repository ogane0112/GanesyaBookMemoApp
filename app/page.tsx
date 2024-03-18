
import { createClient } from "@/utils/supabase/server";
import Link from "next/link"
import Search from "@/app/components/Search"
import Header from "@/app/components/Header/Header"

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <>
      <Search />
    </>
  );
}
