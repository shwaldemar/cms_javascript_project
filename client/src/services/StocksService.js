const baseURLdb = 'http://localhost:3000/api/holdings'
// const hardCodeURLAPI = 'https://financialmodelingprep.com/api/v3/historical-price-full/INTC,GE,MSFT?serietype=line'
const startURLAPI = 'https://financialmodelingprep.com/api/v3/historical-price-full/'
const endURLAPI = '?serietype=line'

const historicalData = []
const tickers = ['INTC', 'GE', 'MSFT']

export default {
  getHoldings(){
    return fetch(baseURLdb)
    .then(res => res.json())
  },
  getHistData(ticker){
    return fetch(startURLAPI + ticker + endURLAPI)
    .then(res => res.json())
    // .then(data => historicalData.push(data))
  }
}
