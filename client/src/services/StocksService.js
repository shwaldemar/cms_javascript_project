import { eventBus } from '../main.js';

const baseURLdb = 'http://localhost:3000/api/holdings/'
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

  postHolding(payload){
    return fetch(baseURLdb, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.json())
  },

  updateHolding(payload) {
    return fetch(baseURLdb +  payload._id, { // added db to fix misnaming error
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        res.json()
        eventBus.$emit('holdingEdited', 'edited')

      })



    },

    deleteHolding(id) {
      return fetch(baseURLdb + id, {
        method: 'DELETE'
      })
    },

  getHistData(ticker){
    return fetch(startURLAPI + ticker + endURLAPI)
    .then(res => res.json())
    // .then(data => historicalData.push(data))
  }
}
