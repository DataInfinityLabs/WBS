'use client';

import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconSend,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import axios from 'axios';
import classes from './NavbarMinimal.module.css';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  path?: string;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  {
    icon: IconHome2, label: 'Home',
    path: '/',
  },
  {
    icon: IconSend, label: 'Send Message',
    path: '/send_message',
  },
  {
    icon: IconGauge, label: 'Analytics',
    path: '/analytics',
  },

  {
    icon: IconSettings, label: 'Settings',
    path: '/settings',
  },
];

export function NavbarMinimal() {
  const currentPath = usePathname();
  const router = useRouter();

  console.log(currentPath);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={currentPath === link.path}
      onClick={() => {
        if (currentPath !== link.path) {
          router.push(link.path);
        }
      }
      }
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink
          onClick={async () => {
            //   send a post request to /api/logout
            await axios.post('/auth/logout');
            window.location.href = '/login';
          }
          }
          icon={IconLogout}
          label="Logout"
        />
      </Stack>
    </nav>
  );
}
