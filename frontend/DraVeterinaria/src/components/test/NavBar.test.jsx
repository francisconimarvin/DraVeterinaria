import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar.jsx';

describe('Componente Navbar',() => {
    it('debe contener los botones con navegación',() => {
        render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
        );
        const linkAgendamiento = screen.getAllByRole('button', { name: /Agenda cita/i }); 
        const linkLogin = screen.getAllByRole('button', { name: /Iniciar sesión/i });

        expect(linkAgendamiento[0]).toBeInTheDocument();
        expect(linkLogin[0]).toBeInTheDocument(); // el [0] es para que me devuelva el primero, tengo 2 ya que uno es para escritorio y el optro para moviles
    })
});