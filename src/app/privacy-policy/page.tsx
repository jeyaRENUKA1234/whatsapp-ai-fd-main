"use client";

import React from "react";
import styles from "./privacy-policy.module.scss";
import { ArrowLeft, Shield, Lock, Eye, Trash2, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 23, 2025";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
       
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Shield size={48} />
          </div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>Last Updated: {lastUpdated}</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
              <div className={styles.sectionIcon}>
                <Eye size={20} />
              </div>
            </div>
            
            <p className={styles.paragraph}>
              During testing and development, we may collect the following types of information:
            </p>
            
            <div className={styles.listSection}>
              <h3 className={styles.listTitle}>Information You Provide Directly:</h3>
              <ul className={styles.list}>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Your WhatsApp phone number (required for testing WhatsApp integration features)
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Test messages, media, or other content you send or receive through the App via WhatsApp integration
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Any profile or test data you choose to enter
                </li>
              </ul>
            </div>

            <div className={styles.listSection}>
              <h3 className={styles.listTitle}>Information Collected Automatically:</h3>
              <ul className={styles.list}>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Device information (e.g., device type, operating system version, IP address)
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Usage data (e.g., interactions with the App, timestamps, crash reports)
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Log data and diagnostics to identify bugs and improve functionality
                </li>
              </ul>
            </div>

            <div className={styles.listSection}>
              <h3 className={styles.listTitle}>Information from WhatsApp Integration:</h3>
              <ul className={styles.list}>
                <li>
                  <span className={styles.listIcon}>•</span>
                  We use the WhatsApp Business API (provided by Meta) for testing messaging features
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Message content (text, images, videos, etc.) is end-to-end encrypted by WhatsApp, 
                  meaning only you and the recipient can read it. We do not access or store the 
                  content of your encrypted messages
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  Metadata (e.g., phone numbers, timestamps, delivery status) may be processed 
                  temporarily for testing purposes
                </li>
                <li>
                  <span className={styles.listIcon}>•</span>
                  For details on how WhatsApp handles data, please review WhatsApp&apos;s Privacy 
                  Policy at:{" "}
                  <a 
                    href="https://www.whatsapp.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    https://www.whatsapp.com/legal/privacy-policy
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.highlightNote}>
              <span className={styles.highlightIcon}>💡</span>
              We collect only the data necessary for development and testing purposes.
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
              <div className={styles.sectionIcon}>🔄</div>
            </div>
            <ul className={styles.list}>
              <li>
                <span className={styles.listIcon}>•</span>
                Test and debug the App&apos;s features, including WhatsApp Business API integration
              </li>
              <li>
                <span className={styles.listIcon}>•</span>
                Improve functionality, performance, and user experience based on testing feedback
              </li>
              <li>
                <span className={styles.listIcon}>•</span>
                Identify and fix bugs or crashes
              </li>
              <li>
                <span className={styles.listIcon}>•</span>
                Comply with any applicable legal obligations
              </li>
            </ul>
            <div className={styles.infoBox}>
              <p>
                We do not use your data for marketing, advertising, or any commercial purposes. 
                We do not sell your personal information.
              </p>
              <p>
                All data processing is limited to internal development and testing activities.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>3. Data Sharing and Disclosure</h2>
              <div className={styles.sectionIcon}>🔗</div>
            </div>
            <p className={styles.paragraph}>
              We may share information with:
            </p>
            <ul className={styles.list}>
              <li>
                <span className={styles.listIcon}>•</span>
                WhatsApp/Meta: As technically required for testing the WhatsApp Business API (e.g., message routing during tests)
              </li>
              <li>
                <span className={styles.listIcon}>•</span>
                Authorized developers and testers bound by confidentiality obligations
              </li>
              <li>
                <span className={styles.listIcon}>•</span>
                Service providers (e.g., cloud hosting, analytics for crash reporting) under strict data protection agreements
              </li>
              <li>
                <span className={styles.listIcon}>•</span>
                In response to legal requirements or to protect rights and safety
              </li>
            </ul>
            <div className={styles.alertBox}>
              <strong>Important:</strong> We do not share your data with any third parties for their own purposes.
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>4. Data Security</h2>
              <div className={styles.sectionIcon}>
                <Lock size={20} />
              </div>
            </div>
            <p className={styles.paragraph}>
              We implement reasonable technical and organizational measures to protect data collected 
              during testing. WhatsApp provides end-to-end encryption for message content.
            </p>
            <div className={styles.securityNote}>
              <Lock size={16} />
              <span>
                As this is a development/testing version, security measures may not be as 
                comprehensive as in a final production app.
              </span>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>5. Data Retention</h2>
              <div className={styles.sectionIcon}>
                <Trash2 size={20} />
              </div>
            </div>
            <p className={styles.paragraph}>
              Data collected during testing is retained only as long as necessary for development 
              purposes (typically a short period) and is deleted or anonymized thereafter.
            </p>
            <div className={styles.highlightNote}>
              <span className={styles.highlightIcon}>🗑️</span>
              You may request deletion at any time.
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>6. Your Rights and Choices</h2>
              <div className={styles.sectionIcon}>✅</div>
            </div>
            <p className={styles.paragraph}>
              You may request access to, correction, or deletion of your data by contacting us. 
              We will respond promptly.
            </p>
            <p className={styles.paragraph}>
              You can stop testing at any time by uninstalling the App or blocking the test 
              WhatsApp number.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>7. Children&apos;s Privacy</h2>
              <div className={styles.sectionIcon}>👶</div>
            </div>
            <p className={styles.paragraph}>
              The App is not intended for use by children. We do not knowingly collect data from 
              children during testing.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>8. Changes to This Privacy Policy</h2>
              <div className={styles.sectionIcon}>📝</div>
            </div>
            <p className={styles.paragraph}>
              We may update this Policy during development. Changes will be reflected with an 
              updated &ldquo;Last Updated&rdquo; date.
            </p>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>9. Contact Us</h2>
              <div className={styles.sectionIcon}>
                <Mail size={20} />
              </div>
            </div>
            <p className={styles.paragraph}>
              For questions about this Privacy Policy or data handling during testing, contact us at:
            </p>
            <div className={styles.contactCard}>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <div>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@myapp.com" className={styles.link}>
                    privacy@myapp.com
                  </a>
                </div>
              </div>
              <p className={styles.contactNote}>
                (Or your actual development contact email)
              </p>
            </div>
          </section>

          <div className={styles.importantNote}>
            <div className={styles.noteHeader}>
              <Shield size={24} />
              <h3 className={styles.noteTitle}>Important Note</h3>
            </div>
            <p>
              This App is for development and testing only. Data collected is used exclusively for 
              improving the application and will not be used in any production environment without 
              additional notice and consent. This policy is a template and not legal advice—consult 
              a legal professional for your specific needs and jurisdiction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}