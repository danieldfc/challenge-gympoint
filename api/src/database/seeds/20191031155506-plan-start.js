module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'planManagements',
      [
        {
          title: 'start',
          duration: 1,
          price: 129,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
