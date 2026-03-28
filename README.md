# Calburn Nutrition – React + Tailwind CSS Website

## Quick Start
```bash
npm install
npm start
```
Opens at http://localhost:3000

---

## Complete Folder & File Structure

```
calburn-nutrition/
│
├── public/
│   ├── index.html
│   └── images/                        ← ALL PRODUCT & BACKGROUND IMAGES HERE
│       ├── whey-protein.png           → Whey Protein product
│       ├── isopure.png                → Isopure product
│       ├── hulk.png                   → Hulk Weight Gainer
│       ├── masculus-mass.png          → Masculus Mass
│       ├── transformer.png            → Transformer Mass Gainer
│       ├── phantom.png                → Phantom Pre-Workout
│       ├── creatine.png               → Creatine
│       ├── bcaa.png                   → BCAA
│       ├── one-shot.png               → One Shot
│       ├── thor.png                   → Thor Pre-Workout
│       ├── l-glutamine.png            → L-Glutamine
│       ├── l-arginine-pre.png         → L-Arginine (Pre-Workout)
│       ├── l-arginine-tab.png         → L-Arginine (Tablet)
│       ├── omega-3.png                → Omega-3
│       ├── multi-vitamin.png          → Multi Vitamin
│       ├── calcium.png                → Calcium
│       ├── biotin.png                 → Biotin
│       ├── testosterone-booster.png   → Testosterone Booster
│       ├── hero-man.png               → About page athlete image
│       ├── hero-athlete.png           → Home PowerFormulation athlete
│       ├── bg-1.jpg                   → Hero slider background – Slide 1
│       └── bg-2.jpg                   → Hero slider background – Slide 2
│
├── src/
│   ├── index.js                       ← React entry point
│   ├── index.css                      ← Global styles + Tailwind + Google Fonts
│   ├── App.jsx                        ← Router + layout wrapper
│   │
│   ├── data/
│   │   └── products.js                ← ALL product data (image, name, stats, nutrition)
│   │
│   ├── hooks/
│   │   └── useReveal.js               ← Scroll-reveal IntersectionObserver hook
│   │
│   ├── components/
│   │   │
│   │   ├── common/                    ← Reusable UI primitives
│   │   │   ├── Button.jsx             → primary / outline / ghost / white / dark
│   │   │   ├── SectionTitle.jsx       → eyebrow + heading + subtitle
│   │   │   ├── PageHero.jsx           → dark hero banner for inner pages
│   │   │   ├── ProductCard.jsx        → card with REAL product image + stats
│   │   │   ├── NutritionTable.jsx     → nutrition facts table
│   │   │   └── StatsBar.jsx           → orange stats strip
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx             → fixed top nav + MEGA DROPDOWN + mobile drawer
│   │   │   └── Footer.jsx             → 4-column dark footer
│   │   │
│   │   └── sections/                  ← Home page section blocks
│   │       ├── HeroSection.jsx        → bg-1.jpg/bg-2.jpg backgrounds + product tiles
│   │       ├── FeaturedCategories.jsx → product image tiles grid
│   │       ├── CtaBanner.jsx          → orange #RECONSTRUCTYOURSELF banner
│   │       ├── ValuesSection.jsx      → 4 core value cards
│   │       ├── PowerFormulation.jsx   → hero-athlete.png + features
│   │       ├── HomeFeaturedProducts.jsx → 3 product cards with images
│   │       └── ContactCta.jsx         → dark CTA strip
│   │
│   └── pages/
│       ├── Home.jsx          → Assembles all home sections
│       ├── About.jsx         → hero-man.png athlete in Welcome section
│       ├── Products.jsx      → filterable grid with real product images
│       ├── ProductDetail.jsx → large product image hero + tabs
│       ├── Gallery.jsx       → product image grid/list + video lightbox
│       └── Contact.jsx       → office locations + validated form
│
├── package.json
└── tailwind.config.js
```

---

## Image Usage Map

| Image File              | Used In                                          |
|-------------------------|--------------------------------------------------|
| `whey-protein.png`      | ProductCard, ProductDetail, Gallery              |
| `isopure.png`           | ProductCard, ProductDetail, Gallery              |
| `hulk.png`              | ProductCard, ProductDetail, Gallery, HeroSection |
| `masculus-mass.png`     | ProductCard, ProductDetail, Gallery, HeroSection |
| `transformer.png`       | ProductCard, ProductDetail, Gallery, HeroSection |
| `whey-protein.png`      | ProductCard, ProductDetail, Gallery, HeroSection |
| `phantom.png`           | ProductCard, ProductDetail, Gallery              |
| `creatine.png`          | ProductCard, ProductDetail, Gallery              |
| `bcaa.png`              | ProductCard, ProductDetail, Gallery              |
| `one-shot.png`          | ProductCard, ProductDetail, Gallery              |
| `thor.png`              | ProductCard, ProductDetail, Gallery              |
| `omega-3.png`           | ProductCard, ProductDetail, Gallery              |
| `multi-vitamin.png`     | ProductCard, ProductDetail, Gallery              |
| `calcium.png`           | ProductCard, ProductDetail, Gallery              |
| `biotin.png`            | ProductCard, ProductDetail, Gallery              |
| `testosterone-booster.png` | ProductCard, ProductDetail, Gallery           |
| `hero-man.png`          | `pages/About.jsx` – Welcome section              |
| `hero-athlete.png`      | `components/sections/PowerFormulation.jsx`       |
| `bg-1.jpg`              | `components/sections/HeroSection.jsx` – slide 1 |
| `bg-2.jpg`              | `components/sections/HeroSection.jsx` – slide 2 |

---

## Pages & Routes

| Route             | Page           | Description                                  |
|-------------------|----------------|----------------------------------------------|
| `/`               | Home           | Hero slider + categories + values + products |
| `/about`          | About          | Story + values + athlete image               |
| `/products`       | Products       | Filterable grid — supports `?cat=` param     |
| `/products/:id`   | ProductDetail  | Tabbed: Overview / Nutrition / Usage         |
| `/gallery`        | Gallery        | Grid/List view + category cards + videos     |
| `/contact`        | Contact        | 4 offices + validated contact form           |

---

## Products Dropdown Menu Structure

```
Products (Navbar)
├── Whey Proteins     → Whey Protein, Isopure
├── Weight Gainer     → Hulk, Masculus Mass
├── Mass Gainer       → Transformer
├── Pre Workouts      → Phantom, L-Glutamine, L-Arginine, Creatine, BCAA, One Shot, Thor
└── Tablets Capsule   → Omega-3, Multi Vitamin, Calcium, Biotin, L-Arginine, Testosterone Booster
```

---

## To Add More Product Images

1. Copy your image to `public/images/your-product.png`
2. In `src/data/products.js`, find the product and set:
   ```js
   image: "/images/your-product.png",
   ```
3. The image automatically appears in: ProductCard, ProductDetail hero, Gallery, FeaturedCategories, HeroSection tiles.

---

## Customisation Tips

- **Brand colour** → change `brand-500` in `tailwind.config.js`
- **Add a product** → append to `PRODUCTS` array in `src/data/products.js`
- **Real videos** → replace placeholder `<div>` in `Gallery.jsx` with `<video>` or YouTube `<iframe>`
- **Contact form** → replace `setTimeout` mock in `Contact.jsx` with your API call (EmailJS, Formspree, etc.)
