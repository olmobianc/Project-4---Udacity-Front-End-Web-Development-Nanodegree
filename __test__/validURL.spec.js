// Import the js file to test
import { validURL } from "../src/client/js/validURL"

describe('Testing url validation functionality', function () {
    test.only('should match the expected URL', function () {
      const urlRGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
      const urlTest = 'http://google.com/';
      expect(urlRGEX.test(urlTest)).toBe(true);
    });
  });

describe('Testing validURL() function for illegitimate urls' , () => {
    var url = "jkhdfsjkhsjdak.sdahiuhIU";
    test('It should return true', () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
    });
});  
