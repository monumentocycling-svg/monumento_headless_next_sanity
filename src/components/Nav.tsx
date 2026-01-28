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
          {/* Contenedor con proporción tipo “recuadro negro” */}
          <span className={styles.logoBox}>
            <Image
              src="/logo.png"
              alt="Monumento Taller Café"
              fill
              priority
              quality={100}
              sizes="(max-width: 640px) 210px, 320px"
              className={styles.logo}
            />
          </span>
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
