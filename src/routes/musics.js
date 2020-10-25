const express = require("express");
const router = express.Router();
const controller = require("../controllers/musicsController");

router.get("/", controller.getAllMusics);
router.post("/", controller.createMusic);
router.get("/:id", controller.getByMusic);
router.put("/:id", controller.updateMusic);
router.patch("/:id/favorited", controller.updateFavoritedStatus);
router.delete("/:id", controller.deleteMusic);

module.exports = router