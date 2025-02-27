import { component$ } from '@builder.io/qwik'
import { Section } from '~/models/section'
import { BotMessageSquareIcon, PackageIcon, SettingsIcon } from "lucide-react"
import { qwikify$ } from "@builder.io/qwik-react"
import { TabLink } from './tab-link'
import { useLocation } from '@builder.io/qwik-city'

const QBotMessageSquareIcon = qwikify$(BotMessageSquareIcon)
const QPackageIcon = qwikify$(PackageIcon)
const QSettingsIcon = qwikify$(SettingsIcon)

const tabs: Section[] = [
  {
    name: "Sessions",
    icon: <QBotMessageSquareIcon />,
    href: "/",
    activePattern: /^\/?$/,
  },
  {
    name: "Models",
    icon: <QPackageIcon />,
    href: "/models",
    activePattern: /^\/models(\/*.)?/,
  },
]

const footerTabs: Section[] = [
  {
    name: "Settings",
    icon: <QSettingsIcon />,
    href: "/settings",
    activePattern: /^\/settings(\/*.)?/,
  },
]

export const AppBar = component$(() => {
  const loc = useLocation()

  return (
    <nav class="flex flex-col border-r border-border px-1 py-1">
      <div class="grow flex flex-col">
        {tabs.map(({ name, icon, href, activePattern, onClick }) => (
          <TabLink
            key={`app-bar-tab-${name}`}
            href={href}
            name={name}
            onClick$={onClick ? () => onClick() : undefined}
            active={activePattern?.test(loc.url.pathname)}
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
            active={activePattern?.test(loc.url.pathname)}
          >
            {icon}
          </TabLink>
        ))}
      </div>
    </nav>
  )
})
