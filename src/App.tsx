import React from "react";
import Home from "./Screens/Home/Home";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.stars}>
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
            }}
          ></div>
        ))}
      </div>
      <h1 className={styles.title}>AI Live Wallpaper Generator</h1>
      <h2 className={styles.subtitle}>
        Create stunning Live wallpapers with AI for your desktop.
      </h2>
      <Home />
    </div>
  );
};

export default App;
