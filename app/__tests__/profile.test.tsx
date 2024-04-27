import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from '../profile/page';
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';

jest.mock('next/navigation', () => require('../__mocks__/next_navigation'));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

// Mock fetch globally in your test file
global.fetch = jest.fn(
  () =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      json: () =>
        Promise.resolve({
          data: [
            {
              name: 'John Doe',
              address_line_1: '1234 Main Street',
              address_line_2: 'Apt 5',
              city: 'New York City',
              state: 'NY',
              zip_code: '12345',
            },
          ],
        }),
    } as Response) // Casting as Response to fit fetch signature
);

describe('ProfilePage Render and Interaction', () => {
  const WrappedProfilePage = () => (
    <MantineProvider>
      <ProfilePage />
    </MantineProvider>
  );

  // Test 01
  it('Renders all fields for input', async () => {
    await act(async () => {
      render(<WrappedProfilePage />);
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('1234 Main Street')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Apt 5')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('New York City')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('NY')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('12345')).toBeInTheDocument();
    });
  });

  // Test 02
  it('allows all input fields to be updated', async () => {
    await act(async () => {
      render(<WrappedProfilePage />);
    });

    const fullNameInput = screen.getByPlaceholderText('John Doe');
    const addressLine1Input = screen.getByPlaceholderText('1234 Main Street');
    const addressLine2Input = screen.getByPlaceholderText('Apt 5');
    const cityInput = screen.getByPlaceholderText('New York City');
    const zipCodeInput = screen.getByPlaceholderText('12345');

    await act(async () => {
      fireEvent.change(fullNameInput, { target: { value: 'Jane Smith' } });
      fireEvent.change(addressLine1Input, { target: { value: '5678 Market Street' } });
      fireEvent.change(addressLine2Input, { target: { value: 'Suite 9' } });
      fireEvent.change(cityInput, { target: { value: 'Boston' } });
      fireEvent.change(zipCodeInput, { target: { value: '02118' } });
    });

    expect(fullNameInput).toHaveValue('Jane Smith');
    expect(addressLine1Input).toHaveValue('5678 Market Street');
    expect(addressLine2Input).toHaveValue('Suite 9');
    expect(cityInput).toHaveValue('Boston');
    expect(zipCodeInput).toHaveValue('02118');
  });

  // Test 03
  it('displays an error notification for non-numeric zip code', async () => {
    await act(async () => {
      render(<WrappedProfilePage />);
    });

    const zipCodeInput = screen.getByPlaceholderText('12345');
    const saveButton = screen.getByRole('button', { name: /save/i });

    await act(async () => {
      fireEvent.change(zipCodeInput, { target: { value: 'abcde' } });
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Validation Error',
          message: 'Zip Code must contain only numeric characters.',
          color: 'red',
        })
      );
    });
  });

  // Test 04
  it('displays an error notification for zip code that does not have 5 digits', async () => {
    await act(async () => {
      render(<WrappedProfilePage />);
    });

    const zipCodeInput = screen.getByPlaceholderText('12345');
    const saveButton = screen.getByRole('button', { name: /save/i });

    await act(async () => {
      fireEvent.change(zipCodeInput, { target: { value: '1234' } });
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Validation Error',
          message: 'Zip Code must contain only numeric characters.',
          color: 'red',
        })
      );
    });
  });

  // Test 05
  it('displays a success notification on successful save', async () => {
    await act(async () => {
      render(<WrappedProfilePage />);
    });

    // Simulate filling the form and clicking save
    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('1234 Main Street'), { target: { value: '4321 Side Street' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Success',
          message: 'Profile updated!',
          color: 'teal',
        })
      );
    });
  });

  


});
