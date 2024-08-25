import moment from 'moment'

export const convertDatetimeForInput = (datetime) => {
  return moment(datetime).format("YYYY-MM-DDTHH:mm")
}

export const formatTimeToUTC = (datetime) => {
  const timeDifference = new Date().getTimezoneOffset()
  const utcTime = moment(datetime).add(timeDifference, 'minutes').format("YYYY-MM-DDTHH:mm")
  return utcTime
}