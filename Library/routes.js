const express = require("express");
const router = express.Router();

router.get("/books/:num", (req, res, next) => {
    const id = req.params.num;
    for (value of books)
        if(value === id)
            res.end(`${value} is best!`);
    next();
});

module.exports = router;