const httpStatus = require('http-status');
const { getUserById } = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Create an inventory
 * @param {Object} inventoryBody
 * @returns {Promise<Inventory>}
 */
const createInventory = async (user, inventoryBody) => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.inventory.push(inventoryBody);
  await user.save();
  return inventoryBody;
};

/**
 * Query for inventories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInventories = async (user, filter, options) => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const inventories = await user.inventory;
  return inventories;
};

/**
 * Get inventory by id
 * @param {ObjectId} id
 * @returns {Promise<Inventory>}
 */
const getInventoryById = async (user, inventoryId) => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const inventory = user.inventory.find((item) => item && item.id === inventoryId);

  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  return inventory;
};

/**
 * Update inventory by id
 * @param {ObjectId} inventoryId
 * @param {Object} updateBody
 * @returns {Promise<Inventory>}
 */
const updateInventoryById = async (user, inventoryId, updateBody) => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const inventory = await getInventoryById(user, inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }

  Object.assign(inventory, updateBody);
  await user.save();
  return inventory;
};

/**
 * Delete inventory by id
 * @param {ObjectId} inventoryId
 * @returns {Promise<Inventory>}
 */
const deleteInventoryById = async (user, inventoryId) => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const inventory = await getInventoryById(user, inventoryId);
  if (!inventory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
  }
  await inventory.remove();
  await user.save();
  return inventory;
};

module.exports = {
  createInventory,
  queryInventories,
  getInventoryById,
  updateInventoryById,
  deleteInventoryById,
};
