import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuotePage from './app/quote/page';
import { MantineProvider } from '@mantine/core';
import { notifications } from '@mantine/notifications';

// Mock useRouter from next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn().mockResolvedValue(true),
    replace: jest.fn().mockResolvedValue(true),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    basePath: '/',
    locale: 'en-US',
    locales: ['en-US'],
    defaultLocale: 'en-US',
    isReady: true,
    isPreview: false,
    isLocaleDomain: false,
    domainLocales: {},
  }),
  // Additional properties and methods can be added as needed
}));

jest.mock('@mantine/notifications', () => ({
  show: jest.fn(),
}));

describe('QuotePage Interactions', () => {
  beforeEach(() => {
    render(
      <MantineProvider>
        <QuotePage />
      </MantineProvider>
    );
  });

  it('Renders input fields successfully', () => {
    expect(screen.getByPlaceholderText('15')).toBeInTheDocument(); // Gallons Requested
    expect(screen.getByPlaceholderText('1234 Main Street')).toBeInTheDocument(); // Delivery Address
    expect(screen.getByPlaceholderText('Enter Date')).toBeInTheDocument(); // Assuming a placeholder for Delivery Date
  });

  it('Allows typing in form fields', () => {
    fireEvent.change(screen.getByPlaceholderText('15'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('1234 Main Street'), {
      target: { value: '5678 Secondary Road' },
    });
    expect(screen.getByPlaceholderText('15')).toHaveValue('20');
    expect(screen.getByPlaceholderText('1234 Main Street')).toHaveValue('5678 Secondary Road');
  });

  it('Submits form and shows success on successful submission', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ message: 'Quote requested!' }),
      })
    ) as jest.Mock;

    fireEvent.change(screen.getByPlaceholderText('15'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('1234 Main Street'), {
      target: { value: '5678 Secondary Road' },
    });

    fireEvent.click(screen.getByRole('button', { name: /request/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(notifications.show).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Success',
          message: 'Quote requested!',
          color: 'teal',
        })
      );
    });
  });
});
