const { Router } = require("express");
const router = Router();
const isURL = require("validator/lib/isURL");
const { customAlphabet } = require("nanoid");
const Link = require("../models/Link");

router.post("/createShortLink", async (req, res) => {
  try {
    const { URL, REDIRECT_URL, CUSTOM_ALPHABET, ALPHABET_LENGTH } = process.env;
    const { longUrl, customShortId } = req.body;
    let shortId = customShortId || "";
    const errors = [];
  
    if (!isURL(longUrl)) {
      errors.push({ error: true, message: "Неверно указана длинная ссылка" })
    }

    if (!longUrl.startsWith(REDIRECT_URL)) {
      errors.push({ error: true, message: `Ссылка должна начинаться с ${REDIRECT_URL}` })
    }
  
    const alreadyUsedLongUrl = await Link.findOne({ longUrl })
    if (alreadyUsedLongUrl) {
      errors.push({ error: true, message: "Такая длинная ссылка уже есть" })
    }
    
    const alreadyUsedShortUrl = await Link.findOne({ shortUrl: `${URL}/${shortId}` })
    if (alreadyUsedShortUrl) {
      errors.push({ error: true, message: "Такой короткий идентификатор уже есть" })
    }
  
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    if (!shortId) {
      const nanoid = customAlphabet(CUSTOM_ALPHABET, parseInt(ALPHABET_LENGTH));
      shortId = nanoid();
    } 
  
    await new Link({
      longUrl,
      shortUrl: `${URL}/${shortId}`
    }).save();
  
    res.status(201).json({ error: false, message: "Короткая ссылка успешно создана" });
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: true, message: "Что-то пошло не так" });
  }
})

router.get("/getAllElements", async (req, res) => {
  try {
    const elements = await Link.find({});
    res.status(200).json({ errors: false, payload: elements })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: true, message: "Что-то пошло не так" });
  }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.status(200).json({ error: false, message: "Успешно удалено" });
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: true, message: "Что-то пошло не так" });
  }
})

module.exports = router;