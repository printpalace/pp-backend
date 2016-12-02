/**
 * Default CRUD handlers
 */

import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import {GetAllOptions} from '../types/app';
/*
export default (modelName: string, populate: string[] = []) => {
  const model = mongoose.model(modelName);

  const getAll = async(req, res, next) => {
    try {
      let searchCriteria = {
        deleted: {$ne: true}
      };
      let sortOpt = {};
      let orderBy = req.query.orderBy || 'date';
      let orderType = req.query.orderType;
      if (orderType !== 'asc') {
        orderType = 'desc';
      }
      sortOpt[orderBy] = orderType;

      const query = model.find(searchCriteria);
      for (const pop of populate) {
        query.populate(pop);
      }
      if (req.query.offset) {
        query.skip(req.query.offset);
      }
      if (req.query.limit) {
        query.limit(req.query.limit);
      }
      query.sort(sortOpt);
      const items = await query.exec();
      res.json(items);
    } catch (e) {
      next(e);
    }
  };

  const getById = async(req, res, next) => {
    try {
      const item = await model.findById(req.params.id);
      if (item) {
        res.json(item);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      next(e);
    }
  };

  const create = async(req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  };

  const updateById = async(req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  };

  const deleteById = async(req, res, next) => {
    try {

    } catch (e) {
      next(e);
    }
  };

  return {create, getAll, getById, updateById, deleteById};
};
*/

// TODO: complete logger
// TODO: think about wrapper on all these functions

export const getAll = async(modelName: string, options: GetAllOptions) => {
  const model = mongoose.model(modelName);

  let searchCriteria = {
    deleted: {$ne: true}
  };
  let sortOpt = {};
  let orderBy = options.orderBy || 'date';
  let orderType = options.orderType || 'desc';
  if (orderType !== 'asc') {
    orderType = 'desc';
  }
  sortOpt[orderBy] = orderType;

  const query = model.find(searchCriteria);
  if (!options.populate) {
    options.populate = [];
  }
  for (const pop of options.populate) {
    query.populate(pop);
  }
  if (options.offset) {
    query.skip(options.offset);
  }
  if (options.limit) {
    query.limit(options.limit);
  }
  query.sort(sortOpt);
  return await query.exec();
};

export const getById = async(modelName, id) => {
  const model = mongoose.model(modelName);
  const item = await model.findById(id);
  if (item) {
    return item;
  }
  return null;
};

export const create = async(modelName, obj) => {
  const model = mongoose.model(modelName);
  const saveModel = new model(obj);

  // logger.info(...)
  return await saveModel.save();
};

export const updateById = async(modelName, id, obj) => {
  const model = mongoose.model(modelName);
  const item = await model.findById(id);
  Object.assign(item, obj);

  // logger.info(...)
  return await item.save();
};

export const deleteById = async(modelName, id) => {
  const model = mongoose.model(modelName);
  const item: any = await model.findById(id);
  item.deleted = true;

  // logger.info(...)
  return await item.save();
};
