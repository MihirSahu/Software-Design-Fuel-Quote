// app/__tests__/quote.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuotePage from '../quote/page';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';

jest.mock('next/navigation', () => require('../__mocks__/next_navigation'));

jest.mock('@mantine/notifications', () => ({
  notifications: {
    show: jest.fn(),
  },
}));

describe('QuotePage Tests', () => {
  const WrappedQuotePage = () => (
    <MantineProvider>
        <QuotePage />
    </MantineProvider>
  )

  // Test_01
  it('Renders gallonsRequested, deliveryAddress, and deliveryDate fields', () => {
    render(<WrappedQuotePage />);
    expect(screen.getByPlaceholderText('15')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('45 Park Place, New York, NY 10007')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('')).toBeInTheDocument();
  });

  // Test_02
  it('Allows typing in fields', () => {
    render(<WrappedQuotePage />);

    // Simulating user input
    fireEvent.change(screen.getByPlaceholderText('15'), {target: { value: 500 } });
    fireEvent.change(screen.getByPlaceholderText('45 Park Place, New York, NY 10007'), { target: { value: '123 Test St, Austin, TX 78701' } });
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: '2025-01-01' } });

    // Assertions to check if input fields have expected values
    expect(screen.getByPlaceholderText('15')).toHaveValue(500);
    expect(screen.getByPlaceholderText('45 Park Place, New York, NY 10007')).toHaveValue('123 Test St, Austin, TX 78701');
    expect(screen.getByPlaceholderText('')).toHaveValue('2025-01-01');
  });
  
  // Test 04
  it('Rejects quote generation for missing Gallons Requested', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Please specify the gallons requested.'})
      })
    ) as jest.Mock;
    
    render(<WrappedQuotePage />);

    fireEvent.change(screen.getByPlaceholderText('15'), {target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('45 Park Place, New York, NY 10007'), { target: { value: '123 Test St, Austin, TX 78701' } });
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: '2025-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /get quote/i }));

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Missing Amount',
          message: 'Please specify the gallons requested.',
          color: 'red',
        })
      );
    });
  });

  // Test 05
  it('Rejects quote generation for non-int entered for Gallons Requested', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Please specify the gallons requested.'})
      })
    ) as jest.Mock;
    
    render(<WrappedQuotePage />);

    fireEvent.change(screen.getByPlaceholderText('15'), {target: { value: 'Twelve' } });
    fireEvent.change(screen.getByPlaceholderText('45 Park Place, New York, NY 10007'), { target: { value: '123 Test St, Austin, TX 78701' } });
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: '2025-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /get quote/i }));

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Missing Amount',
          message: 'Please specify the gallons requested.',
          color: 'red',
        })
      );
    });
  });

  // Test 05
  it('Rejects quote generation for missing Delivery Date', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Please specify the delivery date.'})
      })
    ) as jest.Mock;
    
    render(<WrappedQuotePage />);

    fireEvent.change(screen.getByPlaceholderText('15'), {target: { value: 500 } });
    fireEvent.change(screen.getByPlaceholderText('45 Park Place, New York, NY 10007'), { target: { value: '123 Test St, Austin, TX 78701' } });
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: '' } });

    fireEvent.click(screen.getByRole('button', { name: /get quote/i }));

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Missing Delivery Date',
          message: 'Please specify the delivery date.',
          color: 'red',
        })
      );
    });
  });

  // Test 06
  it('Rejects quote generation for invalid address format', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Please enter a valid address.'})
      })
    ) as jest.Mock;
    
    render(<WrappedQuotePage />);

    fireEvent.change(screen.getByPlaceholderText('15'), {target: { value: 500 } });
    fireEvent.change(screen.getByPlaceholderText('45 Park Place, New York, NY 10007'), { target: { value: 'hey that is pretty good' } });
    fireEvent.change(screen.getByPlaceholderText(''), { target: { value: '2025-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /get quote/i }));

    await waitFor(() => {
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Invalid Address',
          message: 'Please enter a valid address.',
          color: 'red',
        })
      );
    });
  });

  // Add more test here

});
