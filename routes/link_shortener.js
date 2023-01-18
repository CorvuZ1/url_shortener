const { Router } = require("express");
const { createShortLink, getAllElements, deleteElement } = require("../controllers/link_shortener");

const router = Router();

router.post("/createShortLink", createShortLink)

router.get("/getAllElements", getAllElements)

router.delete("/delete/:id", deleteElement)

module.exports = router;