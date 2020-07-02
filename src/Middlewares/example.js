export const change_1 = (req, res, next) => {
  if (req.params.unicorn_id === "1") {
    req.params.unicorn_id = 2;
  }
  console.log('first middleware applied')
  next();
};

export const change_2 = (req, res, next) => {
  if (req.params.unicorn_id === "3") {
    req.params.unicorn_id = 1;
  }
  console.log('second middleware applied')
  next();
};
