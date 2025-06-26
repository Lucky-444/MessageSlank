export default function crudRepository(model) {
  return {
    create: async function (user) {
      const newUser = await model.create(user);
      return newUser;
    },
    getById: async function (id) {
      const user = await model.findById(id);
      return user;
    },
    getAll: async function () {
      const allDocs = await model.find();
      return allDocs;
    },
    update: async function (id, user) {
      const userUpdated = await model.findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true
      });
      return userUpdated;
    },
    delete: async function (id) {
      const user = await model.findByIdAndDelete(id);
      return user;
    }
  };
}
