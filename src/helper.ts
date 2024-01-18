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

  export {shortStringTo, upperCaseFirstStringCharacter, getOnlyDateAndHourFromDateInString}