import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Signup from './Components/Signup';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Signup form with all elements', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );
  
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByText(/Already Have a Account\? Sign In/i)).toBeInTheDocument();
  });
  

  test('submits form and handles success', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'fake-token' } });
  
    render(
      <Router>
        <Signup />
      </Router>
    );
  
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Sheikh' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Hamza' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'sheikh.hamza@test.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://100.80.80.84:3000/Register", {
        firstName: 'Sheikh',
        lastName: 'Hamza',
        email: 'sheikh.hamza@test.com',
        password: 'password123'
      });
      expect(localStorage.getItem('admin-info')).toBe(JSON.stringify({ token: 'fake-token' }));
    });
  
    // await waitFor(() => {
    //     expect(screen.queryByText(/Registration Successfull/i)).toBeInTheDocument();
    // });
  });
  

  test('handles registration failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Registration Failed'));
  
    render(
      <Router>
        <Signup />
      </Router>
    );
  
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: '1234567' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '987tre' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'johnoecom' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123' } });
  
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  
    // await waitFor(() => {
    //     expect(screen.queryByText(/Registration Failed!!/i)).toBeInTheDocument();
    // });
  });
  
});
