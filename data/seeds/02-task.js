
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('task').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        { id: 1, description: 'do something with code', complete: false, notes: 'none', project_id: 1 }

      ]);
    });
};
