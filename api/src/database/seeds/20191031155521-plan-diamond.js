module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'planManagements',
      [
        {
          title: 'diamond',
          duration: 6,
          price: 89,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
