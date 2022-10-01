const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let allTransfers = [];
function changeDateFormat(date) {
  return date.toString().split(".").reverse().join("-");
}

/**
 * POST METHOD
 */
router.post("/", (req, res) => {
  try {
    let date = req.body.date;
    date = changeDateFormat(date);
    const transfer = {
      accountHolder: req.body.accountHolder,
      iban: req.body.iban,
      amount: req.body.amount,
      note: req.body.note,
      date: date,
    };
    let transferID = uuidv4();
    allTransfers.push({ ...transfer, id: transferID });
    res.send(transfer);
  } catch (error) {
    res.status(500).json({
      message: "The transfer not done",
      error,
    });
  }
});

/**
 * GET METHOD
 */
router.get("/", (req, res) => {
  try {
    res.send(allTransfers);
  } catch (error) {
    res.status(500).json({
      message: "All transfers fetch to failed!",
      error,
    });
  }
});

/**
 * GET METHOD BY ID
 */
router.get("/:id", (req, res) => {
  try {
    const id = req.params;
    const transfer = allTransfers.find((transfer) => transfer.id === id.id);
    res.send(transfer);
  } catch (error) {
    res.status(500).json({
      message: "The transfer fetch to failed!",
      error,
    });
  }
});

/**
 * PUT METHOD
 */
router.put("/:id", (req, res) => {
  try {
    let date = req.body.date;
    date = changeDateFormat(date);
    const id = req.params;
    let transfer = {
      id: id.id,
      accountHolder: req.body.accountHolder,
      iban: req.body.iban,
      amount: req.body.amount,
      note: req.body.note,
      date: date,
    };
    const index = allTransfers.findIndex((transfer) => transfer.id === id.id);
    if (index >= 0) {
      const updatedTransfer = transfer;
      allTransfers[index] = updatedTransfer;
      res.send(updatedTransfer);
    } else {
      res.status(404).send("Transfer not found");
    }
  } catch (err) {
    res.status(500).json({
      message: "The category cannot be updated!",
      err,
    });
  }
});

/**
 * DELETE METHOD
 */
router.delete("/:id", (req, res) => {
  try {
    const id = req.params;
    allTransfers = allTransfers.filter((transfer) => transfer.id !== id.id);
    res.json("Transfer is deleted");
  } catch (error) {
    res.status(500).json({
      message: "Transfer is deleted to failed",
      error,
    });
  }
});

module.exports = router;
