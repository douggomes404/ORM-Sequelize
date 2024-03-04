module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Niveis', [
      {
        descre_nivel: 'básico',
        createdAt: new Date(),
        updatedAt: new Date()			
      },
      {
        descre_nivel: 'intermediário',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descre_nivel: 'avançado',
        createdAt: new Date(),
        updatedAt: new Date()
      } 
    ], {})
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Niveis', null, {})
  }
}
