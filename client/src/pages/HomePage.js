import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [auth,setAuth] = useAuth()
  return (
    <Layout title={"ECommerce - Home"}>
      <div className="HomePage" >
      <p className="text-white text-text-nowrap" >{JSON.stringify(auth , null , 4)}</p>
      <h2 className="m-0 p-0">hello world</h2>
      </div>
    </Layout>
  );
}
