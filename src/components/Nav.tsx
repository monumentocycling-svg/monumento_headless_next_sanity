// src/components/Nav.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const items = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/cafe", label: "Café" },
  { href: "/taller", label: "Taller" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Monumento">
          <Image
            src="/logo.png"
            alt="Monumento Taller Café"
            width={1600}
            height={450}
            priority
            quality={100}
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          {items.map((it) => {
            const active =
              it.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(it.href);

            return (
              <Link
                key={it.href}
                href={it.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
