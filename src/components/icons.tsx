import type { IconName } from "../data"

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#icon-${name}`} />
    </svg>
  )
}

export function IconSprite() {
  return (
    <svg className="svg-sprite" aria-hidden="true">
      <symbol id="icon-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="icon-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></symbol>
      <symbol id="icon-github" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2.2c-3.4.8-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.2-3.2 4.4 4.4 0 0 1 .1-3.2s1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.4 4.4 0 0 1 .1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A11.4 11.4 0 0 0 12 .8Z" /></symbol>
      <symbol id="icon-arrow" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24"><path d="M12 3 4.5 6v5.4c0 4.8 3.1 7.8 7.5 9.6 4.4-1.8 7.5-4.8 7.5-9.6V6L12 3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></symbol>
      <symbol id="icon-code" viewBox="0 0 24 24"><path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 2l-4 20" /></symbol>
      <symbol id="icon-document" viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6zM14 2v6h5M9 12h7M9 16h7" /></symbol>
      <symbol id="icon-unlock" viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0 1 9.7-1.7M5 10h14v11H5z" /></symbol>
      <symbol id="icon-users" viewBox="0 0 24 24"><path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 2 18.5V20M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17 3.2a4 4 0 0 1 0 7.6M22 20v-1.5a4.5 4.5 0 0 0-3.4-4.4" /></symbol>
      <symbol id="icon-crm" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2M15 14.2a4 4 0 0 1 6 3.5V20" /></symbol>
      <symbol id="icon-bars" viewBox="0 0 24 24"><path d="M5 20v-7M12 20V7M19 20V3" /></symbol>
      <symbol id="icon-workflow" viewBox="0 0 24 24"><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /><path d="M9.5 7h5M17 9.5v5M14.5 17H9a3 3 0 0 1-3-3v-1" /></symbol>
      <symbol id="icon-chat" viewBox="0 0 24 24"><path d="M4 4h16v12H9l-5 4z" /><path d="M9 10h.01M12 10h.01M15 10h.01" /></symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24"><path d="M3 5h18v14H3zM3 6l9 7 9-7" /></symbol>
      <symbol id="icon-wave" viewBox="0 0 24 24"><path d="M2 13h4l2-6 4 12 3-9 2 3h5" /></symbol>
      <symbol id="icon-sort" viewBox="0 0 12 16"><path fill="currentColor" stroke="none" d="m6 2 3 4H3l3-4Zm0 12-3-4h6l-3 4Z" /></symbol>
      <symbol id="icon-heart" viewBox="0 0 24 24"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" /></symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></symbol>
      <symbol id="icon-server" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="7" rx="1" /><rect x="4" y="14" width="16" height="7" rx="1" /><path d="M8 6.5h.01M8 17.5h.01M12 10v4" /></symbol>
      <symbol id="icon-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="m12 12 7-9M17 3h2v2" /></symbol>
      <symbol id="icon-scale" viewBox="0 0 24 24"><path d="M12 3v18M6 6h12M5 6 2 13h6L5 6ZM19 6l-3 7h6l-3-7ZM8 21h8" /></symbol>
    </svg>
  )
}
