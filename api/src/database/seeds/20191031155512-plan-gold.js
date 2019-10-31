module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'planManagements',
      [
        {
          title: 'gold',
          duration: 3,
          price: 109,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
