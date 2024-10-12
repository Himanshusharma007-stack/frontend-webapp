function getOrderType(type) {
  return type == 'takeAway' ? 'Take Away' : 'Dine In'
}

export default { getOrderType };
