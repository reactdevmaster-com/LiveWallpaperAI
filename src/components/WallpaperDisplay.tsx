import React from "react";
import styles from "./WallpaperDisplay.module.css";
import { ReactComponent as DownloadIcon } from "../assets/download-square-svgrepo-com.svg";

interface Props {
  imageSrc: string;
  mp4Url: string;
}

export const WallpaperDisplay: React.FC<Props> = ({ imageSrc, mp4Url }) => {
  return (
    <div className={styles.display}>
      <img src={imageSrc} alt="Generated Wallpaper" />
      <a href={mp4Url} download="wallpaper.mp4" className={styles.downloadLink}>
        <button className={styles.downloadButton}>
          <DownloadIcon className={styles.icon} /> Download MP4
        </button>
      </a>
    </div>
  );
};
