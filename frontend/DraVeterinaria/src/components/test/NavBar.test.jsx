//Nota:
//realizar este install
//  npm install --save-dev @vitejs/plugin-react @testing-library/react @testing-library/jest-dom vitest
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import { vi } from 'vitest';

// Mock de Auth0
const loginWithRedirectMock = vi.fn();
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,        // Usuario no autenticado
    loginWithRedirect: loginWithRedirectMock,
  }),
}));

describe('Navbar sin autenticación', () => {
  it('llama a loginWithRedirect al hacer clic en "Iniciar sesión"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Navbar />} />
        </Routes>
      </MemoryRouter>
    );

    // Tomamos el primer botón "Iniciar sesión" (desktop)
    const botonLogin = screen.getAllByRole('button', { name: /iniciar sesión/i })[0];
    expect(botonLogin).toBeInTheDocument();

    // Simulamos clic
    fireEvent.click(botonLogin);

    // Verificamos que loginWithRedirect fue llamado
    expect(loginWithRedirectMock).toHaveBeenCalled();
  });
});