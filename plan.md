# Weather API Integration Learning Plan

Use this checklist as a learning journal. Complete the steps in order where possible, and change `[ ]` to `[x]` only after you have implemented and tested the step yourself.

## Current progress

- [x] Make a request to the weather API from `app.js`.
- [x] Parse the response as JSON and check `response.ok`.
- [x] Read a value from the response (`main.temp`) and log it to the console.
- [x] Load the existing stylesheet (`weather.css`) from `index.html`.
- [ ] Revoke or regenerate the API key currently included in frontend code. Any key placed in browser code is visible to visitors; do not publish this version with a real key.

## Steps

### 1. Understand the response

- [ ] In the browser developer tools, inspect the full JSON response in the console.
- [ ] Identify the fields needed by the page: `name`, `weather[0].description`, `weather[0].icon`, `main.temp`, `main.feels_like`, `main.humidity`, and `wind.speed`.
- [ ] Confirm the units returned by this API. The page currently labels temperature in °C and wind speed in km/h, so note whether conversion or a different API option is needed.

**Learn:** An API response is data, usually a JSON object. Nested values are accessed through properties and array indexes, for example `result.weather[0].description`.

### 2. Keep the current request easy to change

- [ ] Replace the hard-coded city in the request URL with a variable, such as `const city = "Udaipur"`.
- [ ] Build the URL using that variable. Use `encodeURIComponent(city)` so city names containing spaces or special characters are handled safely.
- [ ] Keep the request and response handling inside an `async` function, and handle rejected requests with `.catch(...)` or `try/catch`.

**Learn:** `fetch()` returns a Promise. `await` pauses the async function until the response arrives; `response.json()` asynchronously parses its body.

### 3. Select the page elements

- [x] In `app.js`, select the existing form/status elements and display elements by their IDs.
- [x] Confirm the selectors correspond to elements in `index.html`.

**Learn:** `document.querySelector()` connects JavaScript to HTML. An element's `textContent` can update displayed text without rebuilding the page.

### 4. Display the current weather

- [x] Replace the console-only output with updates to the page.
- [x] Show the city name, description, temperature, feels-like temperature, humidity, and wind speed from the response.
- [x] Update both feels-like displays so the hero and highlights stay consistent.
- [x] Display the weather icon from its icon code with descriptive `alt` text.
- [x] Round displayed values and convert temperature to °C and wind speed to km/h.

**Learn:** Keep the API data mapping in one function so it is clear how each response field becomes part of the interface.

### 5. Make units consistent

- [ ] Check the provider's documentation for supported unit parameters.
- [ ] Prefer requesting the units that match the UI labels. If the API does not support them, convert values before displaying them.
- [ ] Verify temperature and wind speed against the raw response; do not label Fahrenheit as Celsius or metres per second as kilometres per hour.

**Learn:** API values and UI labels must agree. For reference, Celsius = `(Fahrenheit - 32) * 5 / 9`; km/h = `m/s * 3.6`.

### 6. Connect the city search form

- [x] Add a `submit` event listener to `city-form`.
- [x] Call `event.preventDefault()` so submitting the form does not reload the page.
- [x] Read and trim the value from `city-input`.
- [x] Call the weather-loading function with the submitted city.
- [ ] Test with multiple valid cities and a city name containing a space.

**Learn:** Event listeners let JavaScript react to user actions. Passing the city into a function makes the request reusable rather than tied to one location.

### 7. Add loading and error states

- [x] Show a loading message in `status-message` before requesting data.
- [x] Hide the status message after success.
- [x] Handle HTTP/network/API errors with a visible message.
- [x] Keep the last successful weather display intact when a later search fails.
- [x] Disable the search button while loading and re-enable it in `finally`.

**Learn:** `response.ok` checks the HTTP status; `try/catch/finally` separates success, failure, and cleanup behavior.

### 8. Decide how to handle the forecast

- [ ] Check whether your provider has a forecast endpoint and what response shape it returns.
- [ ] If available, request forecast data and render forecast cards into `forecast-container`.
- [ ] If you are focusing only on current weather for now, remove or clearly label the static forecast placeholder so it is not mistaken for live data.

**Learn:** A current-weather response does not automatically contain a multi-day forecast; each endpoint's response must be inspected independently.

### 9. Test the whole interaction

- [ ] Load the page and confirm the current weather is populated from the API, not the original sample values.
- [ ] Search for another valid city and confirm all displayed fields update.
- [ ] Search for an invalid city and confirm a helpful error appears without breaking the page.
- [ ] Check the browser console and Network panel for JavaScript errors, failed requests, and unexpected response values.
- [ ] Test the layout at a narrow/mobile width.

### 10. Protect the API key before sharing

- [ ] Revoke or regenerate any key that has been exposed in frontend code, screenshots, or shared messages.
- [ ] For private local learning, keep in mind that a browser-based key is still visible in the source and Network panel.
- [ ] Before publishing or sharing the app, move API calls behind a backend/proxy and keep the key in a server-side environment variable.

**Learn:** Hiding a key in a frontend `.env` file does not make it secret after a browser build; the browser must receive the value to make the request.
