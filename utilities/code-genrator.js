const generateCode = (warehouse, length) => {
  return `${warehouse.toUpperCase().slice(0, 3)}-${Math.random()
    .toString(36)
    .substr(2, length)}`;
};

module.exports = generateCode;
