
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

export const createElementFromHTML = (htmlString: string) => {
  var div = document.createElement('div')
  div.innerHTML = htmlString.trim()
  // div.dangerouslySetInnerHTML = {}
  // dangerouslySetInnerHTML={{__html: `
  //   <button onClick="alert('hello')" >Detalii</button>
  // `}

  // Change this to div.childNodes to support multiple top-level nodes.
  return div
}