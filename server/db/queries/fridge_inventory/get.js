module.exports = async knex =>
  /**
   * @param object params
   */
  params =>
    knex('fridge_inventory')
      .where({ latitude: params.latitude, longitude: params.longitude })
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return dbRawData[0];
        }

        throw new Error(`Error finding geocode long:${params.longitude}, lat:${params.latitude}`);
      });
