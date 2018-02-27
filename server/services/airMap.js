const request = require('superagent');
const dotenv = require('dotenv');

class AirMap {
  /**
   * @param string apiKey
   */
  constructor(apiKey, authorization, userId) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.airmap.jp';
    this.rulesets = [
      'usa_part_107',
    ];
    this.maxAltitudeAgl = 60.96;
    this.authorization = authorization;
    this.userId = userId;
  }

  getAccessToken() {
    return this.getResponse(
      'https://api.airmap.com/auth/v1/anonymous/token',
      { user_id: this.authorization },
    ).then(response => response.data.id_token);
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
  getFlightPlaning(
    startGeocode,
    pilotId = 'auth0|591dea1006732e54be4b875f',
    startTime = 'now',
    endTime,
    coordinates,
  ) {
    const data = {
      rulesets: this.rulesets,
      start_time: startTime,
      end_time: endTime,
      max_altitude_agl: this.maxAltitudeAgl,
      takeoff_latitude: startGeocode.latitude,
      takeoff_longitude: startGeocode.longitude,
      buffer: 1,
      geometry: {
        type: 'Polygon',
        coordinates,
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
   * @param string flightId
   * @return Promise
   */
  getFlightBriefing(flightId) {
    return this.getResponse(
      `${this.baseUrl}/flight/v2/plan/flight_plan%7C${encodeURIComponent(flightId)}/briefing`,
      {},
      this.authorization,
    );
  }

  /**
   * return structure see https://developers.airmap.com/docs/anonymous-user-1
   * @return Promise
   */
  getUser() {
    const data = {
      user_id: this.userId,
    };
    return this.getResponse(
      `${this.baseUrl}/auth/v1/anonymous/token`,
      data,
    );
  }

  /**
   * return structure see https://developers.airmap.com/docs/anonymous-user-1
   * @return Promise
   */
  getPilotAircraft(pilotId) {
    return new Response()
    // return this.getAccessToken()
    //   .then(token => this.getResponse(
    //     `${this.baseUrl}/pilot/v2/${pilotId}/aircraft`,
    //     {},
    //     `Bearer ${token}`,
    //   ))
    //   .catch(error => console.error(error));
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
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVkZW50aWFsX2lkIjoiY3JlZGVudGlhbHwzMmwyYnFxVGFLbUJkN3NhMlkzNGx0V001RE1BIiwiYXBwbGljYXRpb25faWQiOiJhcHBsaWNhdGlvbnxCWXhLWXFOQ2VZTHhQRVVkT3AyOHBDd1dHbU1QIiwib3JnYW5pemF0aW9uX2lkIjoiZGV2ZWxvcGVyfGVHNzI1WGJmQVo3M1dBSHE0Wko4bENnMEV2eEsiLCJpYXQiOjE1MTk2Mjk1MTB9.rn8p4eiTG_I9J1MPp1xurH6ZKISPEGAfo75OUxIjdMI';
const authorization = 'Z0G8IYacwAVQriGAkaWN9ZwWNLK8N5cR';
const userId = '1';
const airMap = new AirMap(apiKey, authorization, userId);

airMap.getAccessToken()
  .then(data => console.log(111, data)).catch(data => console.log(222, data));

airMap.getPilotAircraft(1)
  .then(data => console.log(111, data)).catch(data => console.log(222, data));


/*
const flightId = 'dummy';
//airMap.getUser().then(data => console.log(111, data)).catch(data => console.log(222, data));
*/
// not working
airMap.getFlightBriefing(flightId).then(data => console.log(111, data)).catch(data => console.log(222, data));


const startGeocode = { latitude: 35.6859307, longitude: 139.7430913 };
const pilotId = 'auth0|591dea1006732e54be4b875f';
const startTime = 'now';
const endTime = '2019-01-01T12:00:00-08:00';
const coordinates = [[35.6853525, 139.7425988]];
airMap.getFlightPlaning(
  startGeocode,
  pilotId,
  startTime,
  endTime,
  coordinates,
).then(data => console.log(111, data)).catch(data => console.log(222, data));

module.exports = AirMap;
