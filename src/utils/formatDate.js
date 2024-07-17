import moment from "moment";

function formatDate(date= new Date(), format = "ll") {
  return moment(date).format(format);
}

export default { formatDate };
