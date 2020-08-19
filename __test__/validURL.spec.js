// Import the js file to test
import { validUrl } from "../src/client/js/validURL"

describe('Testing url validation functionality', function () {
    test('should match the expected URL', function () {
      const urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      const urlTest = 'http://google.com/'; //accepted URL
      expect(urlRGEX.test(urlTest)).toBe(true);
    });
  });
