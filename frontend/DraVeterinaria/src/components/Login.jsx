import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <button className = "px-5 py-3 bg-transparent hover:bg-green-500 text-black hover:text-white border border-black hover:border-transparent rounded" onClick={() => loginWithRedirect()}>Iniciar sesión</button>
  )
}

export default Login