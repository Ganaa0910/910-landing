import { Composition } from "remotion";
import { DURATION, FPS, H, Story, W } from "./Story";

/* One composition, parameterised by slug — render.mjs loops it over every
   project. `npm run studio` opens it for tuning with the uuyee palette. */
export function Root() {
  return (
    <Composition
      id="Story"
      component={Story}
      width={W}
      height={H}
      fps={FPS}
      durationInFrames={DURATION}
      defaultProps={{ slug: "uuyee" }}
    />
  );
}
