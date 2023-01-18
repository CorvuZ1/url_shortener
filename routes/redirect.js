const { Router } = require("express");
const { redirectToLongUrl } = require("../controllers/redirect");

const router = Router();

router.get("/:id", redirectToLongUrl)

module.exports = router;