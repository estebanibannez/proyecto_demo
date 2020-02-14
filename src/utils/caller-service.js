const request = require('request-promise');

const callDataFormHelper = async(url, method, formData, moreOptions) => {
    const timeout = (moreOptions && moreOptions.timeout)
        ? moreOptions.timeout
        : 255000
    const options = {
        uri: url,
        method,
        formData,
        timeout,
        resolveWithFullResponse: true
    }
    if (moreOptions && moreOptions.auth) {
        options.auth = moreOptions.auth
    }

    var response;
    try {
        response = await request(options);
        return response;
    } catch (err) {
        //console.log(`SC 2 => Error al llamar a servicio REST ${url}`, err)
        return (`Error al llamar a servicio REST ${url}`, err);
    }

}

const callRESTHelper = async (url, method, body, moreOptions) => {
    //TODO , helper para normalización de URL encaso doble //
  
    const timeout = (moreOptions && moreOptions.timeout) ? moreOptions.timeout : 10000
    const options = {
      uri: url,
      method: method,
      timeout,
      body: body,
      json: true,
      resolveWithFullResponse: true,
      simple: false
    }
    if (moreOptions && moreOptions.auth) {
      options.auth = moreOptions.auth
    }
  
    var response;
  
    try {
      response = await request(options);
    }
    catch (err) {
      throw new Exception.DataAccessException(`Error al llamar a servicio REST ${url}`, 500, Exception.GeneralExceptionCode)
    }
    finally {
      if (!body) {
        body = url;
      }
  
     
      return response;
    }
  }

module.exports = {
    callDataFormHelper,
    callRESTHelper
};