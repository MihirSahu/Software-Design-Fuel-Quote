'use client';

import cx from 'clsx';
import { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './HeaderTabs.module.css';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { usePathname } from 'next/navigation';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

const tabs = [
  'Quote',
  'History',
];

export function HeaderTabs() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const {push} = useRouter();
  const pathname = usePathname();

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab} key={tab} onClick={() => push(tab.toLowerCase())}>
      {tab}
    </Tabs.Tab>
  ));

  if (pathname !== '/login' && pathname !== '/register') {
    return (
      <div className={classes.header}>
        <Container className={classes.mainSection} size="md">
          <Group justify="space-between">
            <Image src="/favicon.png" alt='Header image' width={50} height={50} />

            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: 'pop-top-right' }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                >
                  <Group gap={7}>
                    {/*<Avatar src={user.image} alt={user.name} radius="xl" size={20} />*/}
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user.name}
                    </Text>
                    <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={() => push('/profile')}
                >
                  Account settings
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                  }
                  onClick={
                    async () => {
                      const response = await fetch('/auth/logout', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                        },
                      })
                      if (response.status === 200) {
                        push('/')
                        notifications.show({
                          title: 'Success',
                          message: 'You have been logged out!',
                          color: 'teal',
                        });
                      }
                      else {
                        const error = await response.json();
                        notifications.show({
                          title: 'Error',
                          message: error['error'],
                          color: 'red',
                        });
                      }
                    }
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
        <Container size="md">
          <Tabs
            defaultValue="Home"
            variant="outline"
            visibleFrom="sm"
            classNames={{
              root: classes.tabs,
              list: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
        </Container>
      </div>
    );
  }
}