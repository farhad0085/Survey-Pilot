import React from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to SurveyPilot</h1>
        <p className={styles.subtitle}>Simplify Polling and Survey Creation</p>
        <nav className={styles.nav}>
          <Link to="/polls" className={styles.navLink}>Create Poll</Link>
          <Link to="/surveys" className={styles.navLink}>Create Survey</Link>
          <Link to="/admin" className={styles.navLink}>Admin Dashboard</Link>
          <Link to="/embed" className={styles.navLink}>Embed Code</Link>
        </nav>
      </header>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>Easy Poll Creation</h2>
          <p className={styles.featureDescription}>
            Create and manage polls effortlessly with our user-friendly interface. Customize your polls with various question types and set expiration dates or limits.
          </p>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>Flexible Surveys</h2>
          <p className={styles.featureDescription}>
            Design surveys with a range of question types to gather detailed insights. Our platform offers flexibility to accommodate different survey requirements.
          </p>
        </div>
        <div className={styles.feature}>
          <h2 className={styles.featureTitle}>Real-Time Results</h2>
          <p className={styles.featureDescription}>
            View poll results and survey responses in real-time as they come in. Analyze data easily with live updates and comprehensive summaries.
          </p>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "SurveyPilot has transformed how we conduct polls and surveys. The interface is intuitive and the results are always accurate and timely."
          </p>
          <p className={styles.testimonialAuthor}>- Jane Doe, Marketing Manager</p>
        </div>
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "Creating surveys with SurveyPilot is a breeze. The flexibility in question types has allowed us to get deeper insights from our audience."
          </p>
          <p className={styles.testimonialAuthor}>- John Smith, Product Developer</p>
        </div>
      </section>

      <section className={styles.callToAction}>
        <h2 className={styles.sectionTitle}>Get Started with SurveyPilot Today!</h2>
        <p className={styles.callToActionText}>
          Join thousands of users who are simplifying their polling and survey processes. Sign up now and start creating!
        </p>
        <Link to="/register" className={styles.callToActionButton}>Sign Up</Link>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 SurveyPilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
