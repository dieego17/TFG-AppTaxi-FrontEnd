/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import { BrowserRouter } from 'react-router-dom'; 
import '@testing-library/jest-dom'; 
import { vi } from 'vitest'; 
import Login from './Login'; 
import { login } from '../../services/login'; 
import { useBackendError } from '../../auth/useBackEndErrorContext'; 

vi.mock('../../services/login'); // Mockeo de la función de login
vi.mock('../../auth/useBackEndErrorContext'); // Mockeo del hook de contexto de errores de backend

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Antes de cada prueba, limpiamos todos los mocks de vitest
    useBackendError.mockReturnValue({ backendError: false }); // Mockeo del hook de error de backend para devolver false
  });

  test('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Verificamos que los elementos del formulario de login estén en la interfaz
    expect(screen.getByPlaceholderText(/Introduce tu correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
  });

  test('validates email correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Introduce tu correo electrónico/i);

    // Simulamos un cambio y blur en el campo de correo electrónico con un valor inválido
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    // Verificamos que se muestre el mensaje de error correspondiente
    expect(screen.getByText(/Introduzca un correo válido/i)).toBeInTheDocument();

    // Simulamos un cambio y blur en el campo de correo electrónico con un valor válido
    fireEvent.change(emailInput, { target: { value: 'valid.email@example.com' } });
    fireEvent.blur(emailInput);

    // Verificamos que el mensaje de error desaparezca
    expect(screen.queryByText(/Introduzca un correo válido/i)).not.toBeInTheDocument();
  });

  test('validates password correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/Introduce tu contraseña/i);

    // Simulamos un cambio y blur en el campo de contraseña con una contraseña demasiado corta
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    // Verificamos que se muestre el mensaje de error correspondiente
    expect(screen.getByText(/Debe tener al menos 8 caracteres./i)).toBeInTheDocument();

    // Simulamos un cambio y blur en el campo de contraseña con una contraseña sin caracteres especiales
    fireEvent.change(passwordInput, { target: { value: 'NoSpecialChar8' } });
    fireEvent.blur(passwordInput);

    // Verificamos que se muestre el mensaje de error correspondiente
    expect(screen.getByText(/Debe tener caracteres especiales./i)).toBeInTheDocument();

    // Simulamos un cambio y blur en el campo de contraseña con una contraseña válida
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.blur(passwordInput);

    // Verificamos que los mensajes de error desaparezcan
    expect(screen.queryByText(/Debe tener al menos 8 caracteres./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Debe tener caracteres especiales./i)).not.toBeInTheDocument();
  });

  test('shows error on incorrect login', async () => {
    // Mockeamos que la función de login devuelve un error de credenciales incorrectas
    login.mockRejectedValueOnce(new Error('Usuario o contraseña incorrectos'));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Introduce tu correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/Introduce tu contraseña/i);
    const submitButton = screen.getByText(/Iniciar Sesión/i);

    // Simulamos cambios en los campos de correo y contraseña y un clic en el botón de inicio de sesión
    fireEvent.change(emailInput, { target: { value: 'valid.email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.click(submitButton);

    // Esperamos a que aparezca el mensaje de error de credenciales incorrectas
    const errorMessage = await screen.findByText(/Usuario o contraseña incorrectos/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls login service on form submit', async () => {
    // Mockeamos que la función de login devuelve una respuesta exitosa
    login.mockResolvedValueOnce({});

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Introduce tu correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/Introduce tu contraseña/i);
    const submitButton = screen.getByText(/Iniciar Sesión/i);

    // Simulamos cambios en los campos de correo y contraseña y un clic en el botón de inicio de sesión
    fireEvent.change(emailInput, { target: { value: 'valid.email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123!' } });
    fireEvent.click(submitButton);

    // Verificamos que la función de login haya sido llamada con las credenciales correctas
    expect(login).toHaveBeenCalledWith({
      correo_electronico: 'valid.email@example.com',
      contraseña: 'ValidPassword123!',
    });
  });
});
