const Link = require("../models/Link");

async function redirectToLongUrl(req, res) {
    try {
      const { id: shortId } = req.params;
      const { URL } = process.env;
      const link = await Link.findOne({ shortUrl: `${URL}/${shortId}` });
    
      if (!link) {
        return res.redirect(URL);
      }
    
      link.clickCount++;
      await link.save();
      
      return res.redirect(link.longUrl);
    } catch(error) {
      console.log(error);
      res.status(500);
    }
  }

module.exports = { 
  redirectToLongUrl
};