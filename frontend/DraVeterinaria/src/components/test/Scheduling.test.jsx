import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Scheduling from '../Scheduling.jsx';

// --- Preparación de Mocks ---
// Mock de window.alert para evitar que detenga el test al finalizar el flujo
beforeAll(() => {
  vi.spyOn(window, 'alert').mockImplementation(() => {});
});  // esto es para que no tire el alert y esté esa funcion vacia  

afterAll(() => {
  window.alert.mockRestore();
});
// afterAll restaura el fucionamiento  original de navegador


// --- Función Auxiliar para avanzar al Paso 3 ---
// Esta función simula la interacción para completar los pasos 1 y 2
const goToStep3 = () => {

    // Paso 1: Rellenar y avanzar (Mascota)

    fireEvent.change(screen.getByPlaceholderText(/Especie/i), { target: { value: 'Perro' } });
    fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'Firulais' } });
    fireEvent.change(screen.getByPlaceholderText(/Edad/i), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText(/Raza/i), { target: { value: 'Poodle' } });
    fireEvent.change(screen.getByPlaceholderText(/Antecedentes médicos/i), { target: { value: 'Ninguno' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    
    // Paso 2: Rellenar y avanzar (Tutor)
    // Usamos el placeholder correcto para RUT
    fireEvent.change(screen.getByPlaceholderText(/RUT/i), { target: { value: '12345678-9' } }); 
    // Usamos la label o placeholder correcto para Nombre
    fireEvent.change(screen.getByPlaceholderText(/^Nombre$/i), { target: { value: 'Juan Nieves' } });
    fireEvent.change(screen.getByPlaceholderText(/Teléfono/i), { target: { value: '912345678' } });
    fireEvent.change(screen.getByPlaceholderText(/Dirección/i), { target: { value: 'Castle BLack' } });
    fireEvent.change(screen.getByPlaceholderText(/^Correo$/i), { target: { value: 'jnieves@nightswatch.wo' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirmar correo/i), { target: { value: 'jnieves@nightswatch.wo' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Siguiente/i }));
    
    // Asunción: Ahora estamos en el Paso 3
};


describe('Componente Scheduling', () => {
    
    it('debe avanzar del paso 1 (Mascota) al paso 2 (Tutor) al completar correctamente los campos', () => {
        render(<Scheduling />); // renderizar el componente scheduling

        // 1. Completar campos del paso 1
        fireEvent.change(screen.getByPlaceholderText(/Especie/i), { target: { value: 'Perro' } });
        fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'Firulais' } });
        fireEvent.change(screen.getByPlaceholderText(/Edad/i), { target: { value: '3' } });
        fireEvent.change(screen.getByPlaceholderText(/Raza/i), { target: { value: 'Labrador' } });
        fireEvent.change(screen.getByPlaceholderText(/Antecedentes médicos/i), { target: { value: 'Ninguno' } });

        // 2. Click en “Siguiente”
        const botonSiguiente = screen.getByRole('button', { name: /Siguiente/i });
        fireEvent.click(botonSiguiente);

        //3.  Verificar que se muestre el paso 2 (Tutor)
        expect(screen.getByText(/Registro de Tutor/i)).toBeInTheDocument();
    });

   it('debe calcular y mostrar el precio correcto al seleccionar Tipo "vacuna" y Subtipo "Rabia"', async () => {
        render(<Scheduling />);  // renderizar mi componente
        
        // 1. Avanzar hasta el Paso 3 usando la función auxiliar
        goToStep3();

        // 2. Interacción 1: Seleccionar Tipo de Servicio "vacuna"
        const selectTipo = screen.getByDisplayValue('Seleccionar servicio');
        fireEvent.change(selectTipo, { target: { value: 'vacuna' } });

        // 3. Esperar a que aparezca el select de Subtipo (es condicional)
        let selectSubtipo;
        await waitFor(() => { //await es funcion asíncrona
             // Buscamos el select de subtipo, usando el texto de su opción por defecto
            selectSubtipo = screen.getByDisplayValue('Seleccionar subtipo');
            expect(selectSubtipo).toBeInTheDocument();
        });

        // 4. Interacción 2: Seleccionar Subtipo "Rabia"
        fireEvent.change(selectSubtipo, { target: { value: 'Rabia' } });

        // 5. Verificación Final: Comprobar que el precio (20000) se muestra en pantalla
        expect(screen.getByText(/Precio: \$20000/i)).toBeInTheDocument();
    });
});