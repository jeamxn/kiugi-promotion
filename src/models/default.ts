import mongoose, { Document } from "mongoose";

class Default<T extends Document> {
  constructor(public DB: mongoose.Model<T>) {}

  public find = async (id: string) => {
    try {
      return await this.DB.findById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public create = async (data: T) => {
    const created = new this.DB(data);
    await created.save();
    return created;
  };
}

export default Default;
