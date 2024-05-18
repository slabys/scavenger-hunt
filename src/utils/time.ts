export const getDateWithTime = (value: string) => {
  const date = new Date(value)
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}