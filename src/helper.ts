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

  function getOnlyDateAndHourFromDateInString( dateInString: string | null): string {
    if (dateInString == null) dateInString = getPolandZoneNowDate().toISOString()
    return dateInString
    .split(".")[0]
    .replace(/T/g, ` `)
  }

  function getPolandZoneNowDate(): Date {
    const date = new Date();
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60 * 1000;
    const utc = localTime + localOffset;
    const offset = 2;//in hours
    const poland = utc + (3600 * 1000 * offset);
    const resultDate = new Date(poland);
    return resultDate;
  }

  export {shortStringTo, upperCaseFirstStringCharacter, getOnlyDateAndHourFromDateInString, getPolandZoneNowDate}