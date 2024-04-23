// /app/__tests__/login.test.tsx

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../login/page';
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';

// Mocking necessary modules

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

describe('LoginPage Render and Interaction', () => {
  const WrappedLoginPage = () => (
    <MantineProvider>
      <LoginPage />
    </MantineProvider>
  );

  it('Renders email and password inputs', () => {
    render(<WrappedLoginPage />);
    expect(screen.getByPlaceholderText('new_user_1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
  });

  it('Allows typing in email and password fields', () => {
    render(<WrappedLoginPage />);
    fireEvent.change(screen.getByPlaceholderText('new_user_1'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password' } });
    expect(screen.getByPlaceholderText('new_user_1')).toHaveValue('user@test.com');
    expect(screen.getByPlaceholderText('********')).toHaveValue('password');
  });

  it('Submits form and shows success notification on valid login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'You have been logged in!' }),
      })
    ) as jest.Mock;

    render(<WrappedLoginPage />);

    fireEvent.change(screen.getByPlaceholderText('new_user_1'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('********'), { target: { value: 'password' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Since fetching is asynchronous, we need to wait for elements to appear
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/auth/login', expect.any(Object)); // You can refine this to match your exact fetch call
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Success',
          message: 'You have been logged in!',
          color: 'teal',
        })
      );
    });
  });

  // Add more tests here
});
