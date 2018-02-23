module.exports = async knex =>
  /**
   * @param object params
   */
  params =>
    knex('supermarket')
      .where({ latitude: params.latitude, longitude: params.longitude })
      .select()
      .then((dbRawData) => {
        if (dbRawData.length === 1) {
          return new EntityGeocode(dbRawData[0]);
        }

        throw new Error(`Error finding geocode long:${params.longitude}, lat:${params.latitude}`);
      });
