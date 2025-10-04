import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button className = "px-5 py-3 bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 hover:border-transparent rounded"onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Cerrar sesión
    </button>
  );
};

export default Logout