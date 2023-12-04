import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { NavbarMinimal } from '@/components/shared/navbar/NavbarMinimal';
import { getSupabaseServerClient } from './utils/supabase_server_client';


export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default async function RootLayout({ children }: { children: any }) {
  const supabaseClient = getSupabaseServerClient();

  const { data } = await supabaseClient.auth.getSession();




  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {data.session && <NavbarMinimal />}
          <div style={{ flex: 1, marginLeft: data.session ? '70px' : '0' }}>
            {/* Content will appear here after the Navbar */}
            {children}
          </div>

        </MantineProvider>
      </body>
    </html>
  );
}
