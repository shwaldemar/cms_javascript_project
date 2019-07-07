const baseURLdb = 'http://localhost:3000/api/holdings'
const hardCodeURLAPI = 'https://financialmodelingprep.com/api/v3/historical-price-full/INTC,GE,MSFT?serietype=line'

export default {
  getHoldings(){
    return fetch(baseURLdb)
    .then(res => res.json())
  },
  getHistData(){
    return fetch(hardCodeURLAPI)
    .then(res => res.json())
  }
}
