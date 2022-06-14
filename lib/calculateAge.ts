
export const getAge = (dateString: string) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function createGeoJSONURL (geojson: any) {
  return URL.createObjectURL(
    new Blob([JSON.stringify(geojson)], {
      type: "application/json"
    })
  )
}
