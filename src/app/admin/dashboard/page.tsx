
import React from "react";
import styles from "./admin.module.scss";
import axios from "axios";

async function getUsers() {
  try {
    const res = await axios.get("http://localhost:3000/api/users", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch {
    return [];
  }
}

async function getQuotes() {
  try {
    const res = await axios.get("http://localhost:3000/api/quotes", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data;
  } catch {
    return [];
  }
}

export default async function AdminPage() {
  const [users, quotes] = await Promise.all([getUsers(), getQuotes()]);

  return (
    <div className={styles.adminDashboard}>
      <h1 className={styles.pageTitle}>Admin Dashboard</h1>

      {/* USERS TABLE */}
      <section className={styles.sectionBox}>
        <h2>Users</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Telegram</th>
                <th>Username</th>
                <th>Tier</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u: any) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.telegramId}</td>
                  <td>{u.username || "-"}</td>
                  <td>{u.tier}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* QUOTES TABLE */}
      <section className={styles.sectionBox}>
        <h2>Quotes</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {quotes.map((q: any) => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.description}</td>
                  <td>{new Date(q.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
