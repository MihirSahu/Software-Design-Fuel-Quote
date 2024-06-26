import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { Notifications } from '@mantine/notifications';
// import { HeaderTabs } from '@/components/Navbar/HeaderTabs';

export const metadata = {
  title: 'Fuelonomy',
  description: 'Your one-stop-shop for fuel quotes!',
};

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {/*<HeaderTabs />*/}
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
