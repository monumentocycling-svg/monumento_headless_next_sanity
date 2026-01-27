"use client";

import Image from "next/image";
import styles from "./WhatsappButton.module.css";

type Props = {
  phoneNumber: string;
};

export default function WhatsappButton({ phoneNumber }: Props) {
  const waDigits = String(phoneNumber).replace(/\D/g, "");
  const href = `https://wa.me/${waDigits}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.wrapper}
      aria-label="Abrir WhatsApp"
    >
      <span className={styles.iconWrap}>
        <Image src="/icons/whatsapp.png" alt="" width={18} height={18} />
      </span>
      <span className={styles.label}> WhatsApp</span>
    </a>
  );
}
