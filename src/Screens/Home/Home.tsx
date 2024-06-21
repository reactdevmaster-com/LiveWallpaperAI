import React, { useState } from "react";
import styles from "./Home.module.css";
import { generateWallpaper } from "../../api";
import { WallpaperForm } from "../../components/WallpaperForm";
import { WallpaperDisplay } from "../../components/WallpaperDisplay";

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [mp4Url, setMp4Url] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (style: string) => {
    setIsLoading(true);
    setProgress(0);
    try {
      const { gifUrl, mp4Url } = await generateWallpaper(style, setProgress);
      setImageSrc(gifUrl);
      setMp4Url(mp4Url);
    } catch (error) {
      console.error("Failed to generate wallpaper:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wallpaperLayout}>
        <div className={styles.macLayout}>
          <div className={styles.safariHeader}>
            <div className={styles.safariButtons}>
              <span className={styles.closeButton}></span>
              <span className={styles.minimizeButton}></span>
              <span className={styles.fullscreenButton}></span>
            </div>
            <div className={styles.safariAddressBar}></div>
          </div>
          <div className={styles.spotLightSearch}>
            <WallpaperForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
          {isLoading && (
            <div className={styles.progressBarContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress * 100}%` }}
              >
                {Math.round(progress * 100)}%
              </div>
            </div>
          )}
          {imageSrc && <WallpaperDisplay imageSrc={imageSrc} mp4Url={mp4Url} />}
          {!imageSrc && !isLoading && (
            <div className={styles.noResults}>
              Enter prompt to generate wallpaper!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
