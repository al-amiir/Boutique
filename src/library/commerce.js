import Commerce from "@chec/commerce.js";
export const commerce = new Commerce(process.env.REACT_APP_API_CHECK_KEY, true);

// To get data from your commerce.js you need API key
// Get your API key form commerce.js
// Create new file called .env to store variables
// Get the variable through process.env<Then key name>
// Now we aple to connect to our commerce.js
