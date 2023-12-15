const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createInventory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    stock: Joi.number().integer().required(),
  }),
};

const getInventories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.string().custom(objectId),
  }),
};

const updateInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    stock: Joi.number().integer(),
  }),
};

const deleteInventory = {
  params: Joi.object().keys({
    inventoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInventory,
  getInventories,
  getInventory,
  updateInventory,
  deleteInventory,
};
