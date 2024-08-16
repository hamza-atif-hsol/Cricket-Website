import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import axios from 'axios';
import Login from './Components/Login';

jest.mock('axios');

  describe('Login Component', () => {
    beforeEach(() => {
      jest.spyOn(Storage.prototype, 'setItem');
      localStorage.clear();
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test('handles successful login', async () => {
      const mockResponse = { data: { user: 'hamza@gmail.com', token: '12345678' } };
      axios.post.mockResolvedValueOnce(mockResponse);
  
      render(
        <Router>
          <Login />
        </Router>
      );
  
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' },
      });
  
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
      await waitFor(() =>
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'user-info',
          JSON.stringify(mockResponse.data)
        )
      );
  
      expect(screen.getByText(/Login Successfull/i)).toBeInTheDocument();
    });
  

  test('handles login failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Login Failed'));

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'hamza@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '1234567' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));


    await waitFor(() =>
      expect(screen.getByText(/Login Failed!!/i)).toBeInTheDocument()
    );
  });

  test('redirects to /home on successful login', async () => {
    localStorage.setItem(
      'user-info',
      JSON.stringify({ user: 'testUser', token: '123456' })
    );

    render(
      <Router>
        <Login />
      </Router>
    );

    await waitFor(() =>
      expect(screen.getByText(/Login Successfull/i)).toBeInTheDocument()
    );
  });
});
