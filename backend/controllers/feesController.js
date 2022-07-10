// Importing required files
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Calculate = require("../controllers/paymentCompute");

const Fees = require("../models/feeModel");


// @desc    Get all fees
// @route   GET /fees
// @access  Public
const getAllFees = catchAsyncErrors(async (req, res, next) => {
  const fetchAll = await Fees.find();
  res.status(200).json({
    status: true,
    results: fetchAll.length,
    data: fetchAll,
  });
});

// @desc    Create new Fee
// @route   POST /fees
// @access  Public
const postFees = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  // Adding user to body

  const fees = await Fees.create(req.body);

  res.status(200).json({
    success: true,
    message: "Job Created.",
    data: fees,
  });
});

// @desc    Get the slit fees
// @route   GET /split-payments/compute
// @access  Public
const postFeeComputation = catchAsyncErrors( async (req, res, next) => {
    const { Balance, SplitBreakdown } = Calculate.Data(req.body);  
    const fees = await Fees.find({"ID":req.body.ID});
    let Transaction;
    console.log(fees.length);
    if (fees.length > 0) {
        Transaction = fees;
    } else {
        Transaction = await Fees.create(req.body);
        console.log("Data is Saved");
    }
    const data = Transaction[0];
    res.status(200).json({
        ID: data.ID,
        Balance: Balance,
        SplitBreakdown: SplitBreakdown,
    });
});

// @desc    Delete Fees
// @route   DELETE /fees
// @access  Public
const deleteFees = catchAsyncErrors(async (req, res, next) => {
  const fees = await Fees.findById(req.params.id);

  if (!fees) {
    return next(new ErrorHandler("Fee not found", 404));
  }

  job = await fees.remove();

  res.status(200).json({
    success: true,
    message: "Fee is deleted.",
  });
});

module.exports = {
  getAllFees,
  postFees,
  postFeeComputation,
  deleteFees,
};
