import { component$ } from '@qwik.dev/core'
import type { Section } from '~/models/section'
import { TabLink } from './tab-link'
import { useLocation } from '@qwik.dev/router'
import { BotMessageSquareIcon, PackageIcon, SettingsIcon } from '~/integrations/react/lucide-icons'

const tabs: Section[] = [
  {
    name: "Sessions",
    icon: <BotMessageSquareIcon />,
    href: "/",
    activePattern: /^\/?$/,
  },
  {
    name: "Models",
    icon: <PackageIcon />,
    href: "/models/",
    activePattern: /^\/models(\/*.)?/,
  },
]

const footerTabs: Section[] = [
  {
    name: "Settings",
    icon: <SettingsIcon />,
    href: "/settings/",
    activePattern: /^\/settings(\/*.)?/,
  },
]

export const AppBar = component$(() => {
  const { url: { pathname } } = useLocation()

  return (
    <nav class="flex flex-col border-r border-border px-1 py-1">
      <div class="grow flex flex-col">
        {tabs.map(({ name, icon, href, activePattern, onClick }) => (
          <TabLink
            key={`app-bar-tab-${name}`}
            href={href}
            name={name}
            onClick$={onClick ? () => onClick() : undefined}
            active={activePattern?.test(pathname)}
          >
            {icon}
          </TabLink>
        ))}
      </div>

      <div class="shrink-0 flex flex-col">
        {footerTabs.map(({ name, icon, href, activePattern, onClick }) => (
          <TabLink
            key={`app-bar-footer-tab-${name}`}
            href={href}
            name={name}
            onClick$={onClick ? () => onClick() : undefined}
            active={activePattern?.test(pathname)}
          >
            {icon}
          </TabLink>
        ))}
      </div>
    </nav>
  )
})
