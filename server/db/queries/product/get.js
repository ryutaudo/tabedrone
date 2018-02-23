module.exports = async knex =>
  /**
   * @param object params
   */
  params =>
    knex('product')
      .where({ id: params.id })
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding product with the id ${params.id}`);
      });
