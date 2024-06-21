import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateWallpaper = async (
  textPrompt: string,
  onProgress: (progress: number) => void
): Promise<{ gifUrl: string; mp4Url: string }> => {
  const postOptions = {
    method: "POST",
    url: "https://runwayml.p.rapidapi.com/generate/text",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      "x-rapidapi-host": "runwayml.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      text_prompt: textPrompt,
      width: 1920,
      height: 1080,
      motion: 5,
      seed: 0,
      upscale: true,
      interpolate: true,
    },
  };

  try {
    const postResponse = await axios.request(postOptions);
    const uuid = postResponse.data.uuid;

    if (!uuid) {
      throw new Error("UUID not found in response");
    }

    const checkStatus = async (): Promise<{
      gifUrl: string;
      mp4Url: string;
    }> => {
      const statusOptions = {
        method: "GET",
        url: `https://runwayml.p.rapidapi.com/status?uuid=${uuid}`,
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": "runwayml.p.rapidapi.com",
        },
      };

      try {
        const statusResponse = await axios.request(statusOptions);
        const { status, progress, url, gif_url } = statusResponse.data;

        if (status === "success") {
          onProgress(1); 
          return { gifUrl: gif_url, mp4Url: url };
        } else {
          onProgress(progress);
          await delay(10000); 
          return checkStatus();
        }
      } catch (error) {
        console.error("Status check failed:", error);
        throw error;
      }
    };

    return await checkStatus();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
