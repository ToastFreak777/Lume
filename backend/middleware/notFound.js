const notFound = (req, res, next) => {
  res.status(404).send("<h1>This Route does not exist</h1>");
};

export default notFound;
