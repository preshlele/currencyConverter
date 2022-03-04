//const { default: axios } = require('axios');
const axios = require('axios');
const { error } = require('console');


const getExchangeRate = async ( fromCurrency, toCurrency) =>{
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1');
    const rate = response.data.rates;
    const euro = 1/ rate[fromCurrency];
    const exchangeRate = euro* rate[toCurrency];
    
    return exchangeRate;

} 

const getCountries = async (toCurrency) =>{
    const response = await axios.get(`https://restcountries.com/v2/currency/${toCurrency}`)

    return  response.data.map(country => console.log(country.name))
}

const convertCurrency = async (fromCurrency, toCurrency, amount) =>{
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries = await getCountries(toCurrency);
    const convertedAmount =(amount + exchangeRate).toFixed(2);

    return `${fromCurrency} is worth ${convertedAmount}${toCurrency}. You can spend these in the following countries: ${countries}`;

    
}
convertCurrency('USD', 'CAD', 30)
    .then((message) => {
        console.log(message);
    }).catch((error) =>{
        console.log(error.message);
    })


//getCountries('USD');
//getExchangeRate('USD', 'EUR');


