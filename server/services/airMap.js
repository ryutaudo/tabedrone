const request = require('superagent');

class airMap {
  /**
   * 
   * @param string apiKey
   */
  constructor(apiKey, authorization) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.airmap.jp';
    this.rulesets = [
      'usa_part_107',
    ];
    this.maxAltitudeAgl = 60.96;
    this.authorization = authorization;
  }

  /**
   * return structure see https://developers.airmap.com/docs/flight-planning
   * @return Promise
   * @param object startGeocode 
   * @param string pilotId 
   * @param string startTime 
   * @param string endTime 
   * @param array coordinates
   */
  flightPlaning(
    startGeocode,
    pilotId = 'auth0|591dea1006732e54be4b875f',
    startTime = 'now',
    endTime,
    coordinates,
  ) {
    const data = {
      rulesets: this.rulesets,
      start_time: startTime,
      end_time: endTime, // "2018-01-01T12:00:00-08:00",
      max_altitude_agl: this.maxAltitudeAgl,
      takeoff_latitude: startGeocode.latitude,
      takeoff_longitude: startGeocode.longitude,
      buffer: 1,
      geometry: {
        type: 'Polygon',
        coordinates: coordinates, /*[
          [
            [-118.37099075317383, 33.85505651142062],
            [-118.37305068969727, 33.85502978214579],
            [-118.37347984313963, 33.854673391015496],
            [-118.37306141853333, 33.85231226221667],
            [-118.37193489074707, 33.85174201755203],
            [-118.36997151374815, 33.85176874785573],
            [-118.36995005607605, 33.8528112231754],
            [-118.37099075317383, 33.85505651142062],
          ],*/
        ],
      },
      pilot_id: pilotId,
    };
    return this.getResponse(
      `${this.baseUrl}/flight/v2/plan`,
      data,
      this.authorization,
    );
  }

  /**
   * return structure see https://developers.airmap.com/docs/flight-briefing
   * @return Promise
   */
  getFlightBriefing() {
    return this.getResponse(
      `${this.baseUrl}/flight/v2/plan/flight_plan%7CDv5oxg8FXL7PQCylRO0piJn0LMq/briefing`,
      {},
      this.authorization,
    );
  }

  /**
   * return structure see https://developers.airmap.com/docs/anonymous-user-1
   * @param string userId
   * @return Promise
   */
  getUser(userId) {
    const data = {
      user_id: userId,
    };
    return this.getResponse(
      `${this.baseUrl}/auth/v1/anonymous/token`,
      data,
    );
  }

  /**
   * @return Promise
   */
  getResponse(url, requestData = {}, authorization = '') {
    return new Promise((resolve, reject) =>
      request
        .post(url)
        .send(requestData)
        .set('X-API-Key', this.apiKey)
        .set('Authorization', authorization)
        .redirects(0)
        .end((error, response) => {
          if (error || !response.ok) {
            reject(error);
          } else {
            resolve(response.body);
          }
        }));
  }
}

module.exports = airMap;
