// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler"

describe('Test, the function "handleSubmit()" should exist' , () => {
    test('It should return true', () => {
        expect(handleSubmit).toBeDefined();
    });
});

describe('Test, the function "handleSubmit()" should be a function', () => {
    test('It should be a function', () => {
        expect (typeof handleSubmit).toBe('function');
    });
});