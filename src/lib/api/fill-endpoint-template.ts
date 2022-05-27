/**
 * Используется для темлейт-эндпоинтов вроде /users/{id}/panels
 * Заолняет id из параметров
 * @param endpointTemplate
 * @param payload
 */
const fillEndpointTemplate = (endpointTemplate: string, payload = {}) =>
  endpointTemplate.replace(/{([a-zA-Z]+)}/g, (match, key) => {
    const replaceValue = payload[key];
    if (replaceValue === undefined) {
      throw Error(`Can't find key for API template ${key} in payload`);
    }

    return replaceValue;
  });

export { fillEndpointTemplate };
