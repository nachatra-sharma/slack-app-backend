import type mongoose from "mongoose";

export default function CrudRepositories<T>(schema: mongoose.Model<T>) {
  return {
    model: schema,
    create: async function (data: Partial<T>) {
      const newDoc = await this.model.create(data);
      return newDoc;
    },
    getAll: async function () {
      const allDocs = await this.model.find();
      return allDocs;
    },
    getById: async function (id: string) {
      const doc = await this.model.findById(id);
      return doc;
    },
    delete: async function (id: string) {
      const doc = await this.model.findByIdAndDelete(id);
      return doc;
    },
    update: async function (id: string, data: Partial<T>) {
      const doc = await this.model.findByIdAndUpdate(id, data, {
        runValidators: true,
        returnDocument: "after"
      });
      return doc;
    }
  };
}
