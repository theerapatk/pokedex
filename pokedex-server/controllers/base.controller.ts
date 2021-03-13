abstract class BaseController {

  abstract model: any;

  // Get all
  getAll = async (req: any, res: any) => {
    try {
      const docs = await this.model.find({});
      res.status(200).send(docs);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }

  // Count all
  count = async (req: any, res: any) => {
    try {
      const count = await this.model.count();
      res.status(200).send(count);
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }

  // Insert
  insert = async (req: any, res: any, next: any) => {
    try {
      const obj = await new this.model(req.body).save();
      res.status(201).send(obj);
    } catch (err) {
      next(err);
    }
  }

  // Get by id
  get = async (req: any, res: any) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.id });
      res.status(200).send(obj);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  // Update by id
  update = async (req: any, res: any, next: any) => {
    try {
      await this.model.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).send({ success: true });
    } catch (err) {
      next(err);
    }
  }

  // Delete by id
  delete = async (req: any, res: any) => {
    try {
      await this.model.findOneAndRemove({ _id: req.params.id });
      res.status(200).send({ success: true });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }
}

export default BaseController;
