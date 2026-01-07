"use client";

import { useRouter } from "next/navigation";
import styles from "./admin-layout.module.scss";
import axios from "axios";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await axios("/api/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className={styles.adminLayout}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>A</div>
          <div>
            <div className={styles.brandTitle}>Admin Panel</div>
            <div className={styles.brandSubtitle}>Next.js • v1.0.0</div>
          </div>
        </div>

        <ul className={styles.nav}>
          <li className={`${styles.navItem} ${styles.active}`}>
            📊 Dashboard
          </li>
          <li className={styles.navItem}>👥 Users</li>
          <li className={styles.navItem}>📦 Products</li>
          <li className={styles.navItem}>⚙️ Settings</li>
        </ul>

        <div className={styles.footer}>
          <span>Logged in as</span>
          <strong>admin@demo.com</strong>
        </div>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        {/* TOPBAR */}
        <header className={styles.topbar}>
          <div>
            <div className={styles.topTitle}>Dashboard Overview</div>
            <div className={styles.topSubtitle}>Quick summary for today</div>
          </div>

          <div className={styles.topRight}>
            <input className={styles.search} placeholder="Search..." />

            <button className={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
