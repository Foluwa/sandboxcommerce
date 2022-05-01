export function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}

export const capitalizeChar = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

