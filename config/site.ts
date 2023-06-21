export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Gestionale Ore",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Login",
      href: "/login",
    },
  ],
  links: {
    github: "https://github.com/saphitv/GestionaleOre",
    docs: "https://ui.shadcn.com",
  },
}
