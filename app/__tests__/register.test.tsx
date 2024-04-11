import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from '../register/page'; 
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

describe('RegisterPage Render and Interaction', () => {
  const WrappedRegisterPage = () => (
    <MantineProvider>
      <RegisterPage />
    </MantineProvider>
  );

  it('Renders email and password inputs', () => {
    render(<WrappedRegisterPage />);
    expect(screen.getByPlaceholderText('new_user_1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
  });

  it('Allows typing in email and password fields', () => {
    render(<WrappedRegisterPage />);
    fireEvent.change(screen.getByPlaceholderText('new_user_1'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password123' } });
    expect(screen.getByPlaceholderText('new_user_1')).toHaveValue('user@example.com');
    expect(screen.getByPlaceholderText('********')).toHaveValue('password123');
  });

  it('Submits form and shows success notification on successful registration', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'You have been logged in!' }),
      })
    ) as jest.Mock;

    render(<WrappedRegisterPage />);

    fireEvent.change(screen.getByPlaceholderText('new_user_1'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/auth/signup', expect.any(Object));
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Success',
          message: 'You have been logged in!',
          color: 'teal',
        })
      );
    });
  });

  it('Shows error notification for invalid email input', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400, // Assuming 400 Bad Request for validation errors
        json: () => Promise.resolve({ error: 'Please enter a valid email address.' }),
      })
    ) as jest.Mock;

    render(<WrappedRegisterPage />);

    // Simulate user input with an invalid email and a valid password
    fireEvent.change(screen.getByPlaceholderText('new_user_1'), {
      target: { value: 'invalid-email' },
    }); // Invalid email
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password123' } }); // Valid password

    // Simulate clicking the submit button
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Use waitFor to wait for the expected error notification to be shown
    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          message: 'Please enter a valid email address.',
          color: 'red',
        })
      );
    });
  });

  it('Shows error notification for password being too short.', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400, // Assuming 400 Bad Request for validation errors
        json: () => Promise.resolve({ error: 'Password must be at least 6 characters long.' }),
      })
    ) as jest.Mock;

    render(<WrappedRegisterPage />);

    // Simulate user input with a short password
    fireEvent.change(screen.getByPlaceholderText('new_user_1'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'passw' } }); // Password too short

    // Simulate clicking the submit button
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the error notification
    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          message: 'Password must be at least 6 characters long.',
          color: 'red',
        })
      );
    });
  });

  // Add more tests here
});
