
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('task_resource').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('task_resource').insert([
        { task_id: 1, resource_id: 1 },

      ]);
    });
};
