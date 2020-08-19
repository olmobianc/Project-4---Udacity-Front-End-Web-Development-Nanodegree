// Import the js file to test
import { validUrl } from "../src/client/js/validURL"

describe('Testing url validation functionality for legitimate urls', function () {
    test('it should match the expected URL', function () {
      const urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      const urlTest = 'http://google.com/'; //accepted URL
      expect(urlRGEX.test(urlTest)).toBe(true);
    });
  });

describe('Testing url validation functionality for illegitimate urls' , () => {
    var url = "Hello World"; //not accepted URL
    test('It should return true', () => {
      const response = validUrl(url);
      expect(response).toBeDefined();
      expect(response).toBeFalsy();
    });
});  
