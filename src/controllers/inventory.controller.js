const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { inventoryService } = require('../services');

const createInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.createInventory(req.user, req.body);
  res.status(httpStatus.CREATED).send(inventory);
});

const getInventories = catchAsync(async (req, res) => {
  const result = await inventoryService.queryInventories(req.user);
  res.send(result);
});

const getInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.getInventoryById(req.user, req.params.inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  res.send(inventory);
});

const updateInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.updateInventoryById(req.user, req.params.inventoryId, req.body);
  res.send(inventory);
});

const deleteInventory = catchAsync(async (req, res) => {
  await inventoryService.deleteInventoryById(req.user, req.params.inventoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInventory,
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
};
