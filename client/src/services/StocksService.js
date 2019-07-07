const baseURLdb = 'http://localhost:3000/api/holdings'

export default {
  getHoldings(){
    return fetch(baseURLdb)
    .then(res => res.json())
  }
}
