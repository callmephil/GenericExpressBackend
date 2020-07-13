export const resetUnicorns = (req, res, next) => {
  const props = [
    { name: "One", age: "1", color: "Pink" },
    { name: "Two", age: "2", color: "White" },
    { name: "Three", age: "3", color: "Zebra" },
  ];
  req.body = props;
  next();
};

export const resetUsers = (req, res, next) => {
    const props = [
        { first_name: "Person", last_name: "One", email: "P1@mail.com" },
        { first_name: "Person", last_name: "Two", email: "P2@mail.com" },
        { first_name: "Person", last_name: "Three", email: "P3@mail.com" },
        { first_name: "Person", last_name: "Four", email: "P4@mail.com" },
        { first_name: "Person", last_name: "Five", email: "P5@mail.com" },
        { first_name: "Person", last_name: "Six", email: "P6@mail.com" },
        { first_name: "Person", last_name: "Seven", email: "P7@mail.com" },
        { first_name: "Person", last_name: "Eight", email: "P8@mail.com" },
        { first_name: "Person", last_name: "Nine", email: "P9@mail.com" },
        { first_name: "Person", last_name: "Ten", email: "P10@mail.com" },
    ];
  
    req.body = props;
    next();
  };

export const updateUsers = (req, res, next) => {
  const props = [
    { user_id: 1, first_name: "Joe", last_name: "One", email: "P1@mail.com" },
    { user_id: 2, first_name: "Doe", last_name: "Two", email: "P2@mail.com" },
  ];

  req.body = props;
  next();
}

export const deleteUsers = (req, res, next) => {
  const props = [
    { user_id: 1 },
    { user_id: 2 },
    { user_id: 3 },
  ];

  req.body = props;
  next();
}