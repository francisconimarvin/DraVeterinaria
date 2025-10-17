import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // Icono de animacion Spinner simple
  const Spinner = () => (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  // Mientras Auth0 verifica si el usuario está logueado
  if (isLoading) {
    return <Spinner />;
  }

  // Si no está autenticado, redirige a login
  if (!isAuthenticated) {
    loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    return <Spinner />;
  }

  // Si está autenticado, renderiza el contenido protegido
  return children;
}

export default ProtectedRoute;
