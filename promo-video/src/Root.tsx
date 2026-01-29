import React from "react";
import { Composition } from "remotion";
import { WWETTPromo } from "./WWETTPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Horizontal (16:9) - For presentations, YouTube, Twitter */}
      <Composition
        id="WWETTPromoHorizontal"
        component={WWETTPromo}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Vertical (9:16) - For TikTok, Reels, Stories */}
      <Composition
        id="WWETTPromoVertical"
        component={WWETTPromo}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Square (1:1) - For Instagram feed */}
      <Composition
        id="WWETTPromoSquare"
        component={WWETTPromo}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
