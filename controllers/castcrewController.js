const CastCrew = require('./../models/castcrewModel');
const factory = require('./handlerFactory');

exports.rolesParse = (req, res, next) => {
  if (!req.body.roles) return next();

  req.body.roles = JSON.parse(req.body.roles);
  next();
};

exports.getAllCastCrew = factory.getAll(CastCrew);
exports.getCastCrew = factory.getOne(CastCrew, 'shows');
exports.createCastCrew = factory.createOne(CastCrew);
exports.updateCastCrew = factory.updateOne(CastCrew);
exports.deleteCastCrew = factory.deleteOne(CastCrew);
