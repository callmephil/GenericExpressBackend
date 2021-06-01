import { getVolume, setVolume, toggleMute } from "../Middlewares/volume.middlewares";
import { ENUM_REST_API_TYPES } from "../utils/enums";

export const volume_model = {
  routes: [
    {
      type: ENUM_REST_API_TYPES.GET,
      route: "/volume/toggle",
      middlewares: [toggleMute],
    },
    {
      type: ENUM_REST_API_TYPES.GET,
      route: "/volume/",
      middlewares: [getVolume],
    },
    {
      type: ENUM_REST_API_TYPES.GET,
      route: "/volume/:volume",
      middlewares: [setVolume],
    },
  ],
};
