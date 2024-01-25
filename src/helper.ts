function shortStringTo(
    characters_number: number | undefined,
    textToBeShorted: string
  ): string {
    if (characters_number!= undefined && textToBeShorted.length > characters_number) {
      return textToBeShorted.substring(0, characters_number).trim() + "..";
    }
    return textToBeShorted;
  }

function upperCaseFirstStringCharacter( text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  function getOnlyDateAndHourFromDateInString( dateInString: string): string {
    return dateInString
    .split(".")[0]
    .replace(/T/g, ` `)
  }

   
  function convertStringDateToProperForDateInput( dateInString: string | null): string {
    console.log(dateInString)
    if (dateInString == null) dateInString = new Date().toLocaleDateString()
    console.log(dateInString
      .split(".")[0])
    return dateInString.split(".")[0];
  }

  function convertDateToPlusOneTimeZone( dateInString: string | null): string {
    console.log(dateInString)
    if (dateInString == null) dateInString = new Date().toLocaleDateString()
    console.log(dateInString.split(".")[0])
    return dateInString.split(".")[0] + ".978Z";
  }

  export {shortStringTo, upperCaseFirstStringCharacter, getOnlyDateAndHourFromDateInString, convertStringDateToProperForDateInput, convertDateToPlusOneTimeZone}