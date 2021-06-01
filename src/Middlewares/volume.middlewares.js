import loudness from "loudness";


export const setVolume = async (req, res, next) => {
  await loudness.setVolume(req.params.volume);
  req.result = await loudness.getVolume();
  next();
}

export const getVolume = async (req, res, next) => {
  req.result = await loudness.getVolume();
  next();
}

export const toggleMute = async (req, res, next) => {
  const mute = await loudness.getMuted();
  console.log(mute);
  await loudness.setMuted(!mute);
  req.result = await loudness.getMuted();
  console.log(req.result);
  next();
}