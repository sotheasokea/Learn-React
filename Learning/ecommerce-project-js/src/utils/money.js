export function formatMoney(amountCent){
  return amountCent <0? `-$${(-1)*(amountCent/100).toFixed(2)}`:`$${(amountCent/100).toFixed(2)}`
}