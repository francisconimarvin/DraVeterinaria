import { render, screen, fireEvent } from '@testing-library/react';
import Scheduling from '../Scheduling.jsx';

describe('Componente Scheduling', () => {
    it('debe avanzar del paso 1 (Mascota) al paso 2 (Tutor) al completar correctamente los campos', () => {
        render(<Scheduling />);

        // Completar campos del paso 1
        fireEvent.change(screen.getByPlaceholderText(/Especie/i), { target: { value: 'Perro' } });
        fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'Firulais' } });
        fireEvent.change(screen.getByPlaceholderText(/Edad/i), { target: { value: '3' } });
        fireEvent.change(screen.getByPlaceholderText(/Raza/i), { target: { value: 'Labrador' } });
        fireEvent.change(screen.getByPlaceholderText(/Antecedentes médicos/i), { target: { value: 'Ninguno' } });

        // Click en “Siguiente”
        const botonSiguiente = screen.getByRole('button', { name: /Siguiente/i });
        fireEvent.click(botonSiguiente);

        // Verificar que se muestre el paso 2 (Tutor)
        expect(screen.getByText(/Registro de Tutor/i)).toBeInTheDocument();
    });
});