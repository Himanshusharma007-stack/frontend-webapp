import moment from "moment";

function checkStatus(order) {
  return order?.isDelivered || false ? 'Delivered' : moment(new Date()).isAfter(moment(order?.prepareUpto)) ? 'Ready' : 'Preparing'
}

export default { checkStatus };
