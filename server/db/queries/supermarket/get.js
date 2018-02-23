module.exports = async knex =>
  /**
   * @param object params
   */
  params =>
    knex('supermarket')
      .where({ id: params.id })
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding supermarket with the id:${params.id}`);
      });
