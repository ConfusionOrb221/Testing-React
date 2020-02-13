// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, act} from '@testing-library/react';
import { getData } from './api/getData';

import axios from "axios"
import React from "react";
// no default export, so we're importing everyting from this library
import * as rtl from "@testing-library/react";
// not importing to a variable, since this just overrides jest global variables
import "@testing-library/jest-dom/extend-expect";
import App from './App';
import StarWarsCharacters from './components/StarWarsCharacters';

jest.useFakeTimers();
afterEach(rtl.cleanup);
afterEach(() => {
    jest.clearAllMocks();
});

jest.mock('axios', () =>{
    return {
        get: jest.fn(() => Promise.resolve({
          data: {
            count: 0,
            next: 'https://swapi.co/api/people/?page=2',
            previous: false,
            results: [ {} ]
          }
        }))
    }
})

it('Renders Header', () =>{
    const wrapper = rtl.render(<App />);
    expect(wrapper.getByTestId(/header/i));
})

it('Made API call', async () => {
    const wrapper = rtl.render(<App />);
    await wrapper.findAllByTestId(/char/i);
    expect(axios.get).toHaveBeenCalled();
})

it('Loads the API', async () => {
    const data = await getData('https://swapi.co/api/people');
    console.log(data);
    jest.runAllTimers();
    expect(data).toBeDefined();
    expect(data.previous).toBeFalsy();
})

it('Fires Next Button Call', () =>{
    const wrapper = render(<StarWarsCharacters />);
    const nextButton = wrapper.getByTestId('nextButton');
    act(() =>{
       fireEvent.click(nextButton, {button: 1});
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
})

it('Fires Prev Button Call', () =>{
    const wrapper = render(<StarWarsCharacters />);
    const prevButton = wrapper.getByTestId('prevButton');
    expect(prevButton).toBeDisabled();
    act(() =>{
       fireEvent.click(prevButton, {button: 1});
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
})