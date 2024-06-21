import React, { useState } from "react";
import styles from "./WallpaperForm.module.css";
import { ReactComponent as SearchIcon } from "../assets/magic-stick-3-svgrepo-com.svg";

interface Props {
  onSubmit: (style: string) => void;
  isLoading: boolean;
}

export const WallpaperForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    if (input === "") {
      alert("Please enter a valid style");
      return;
    }
    event.preventDefault();
    if (!isLoading) {
      onSubmit(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Spotlight Search"
        disabled={isLoading}
      />
      <button type="submit" className={styles.iconButton} disabled={isLoading}>
        {isLoading ? "Loading..." : <SearchIcon className={styles.icon} />}
      </button>
    </form>
  );
};
