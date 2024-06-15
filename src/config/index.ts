
export const PRODUCT_CATEGORIES = [
  {
    label: "Syrups",
    value: "ui_syrups" as const,
    featured: [
      {
        name: "Essentials",
        href: "#",
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Best Sellers",
        href: "#",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Antibiotics",
    value: "ui_antibiotics" as const,
    featured: [
      {
        name: "Our picks",
        href: "#",
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Best Sellers",
        href: "#",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

export const NAV_ITEMS = [
  {
    label: "Manufacturers",
    value: "manufacturers" as const,
  },
];
