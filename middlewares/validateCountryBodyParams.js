function validateBodyCountryParams(req, res, next) {
    const { name, capital, currency, language, population, area } = req.body;
  
    if (
      [name, capital, currency, language, population, area].includes(undefined)
    ) {
      return res.status(403).json({ error: 'Missing body params' });
    }
  
    res.locals.country = { name, capital, currency, language, population, area };
  
    next();
  }
  
  module.exports = validateBodyCountryParams;
  