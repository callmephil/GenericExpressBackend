export const change_1 = (req, res, next) => {
  console.log('first middleware applied')
  next();
};

export const change_2 = (req, res, next) => {
  console.log('second middleware applied')
  next();
};
