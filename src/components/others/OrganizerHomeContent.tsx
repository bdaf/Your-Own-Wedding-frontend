import { OrganizerUserCelebrationDays } from "../Models";

interface Props {
  celebrationDaysAmount: OrganizerUserCelebrationDays;
}

function OrganizerHomeContent({ celebrationDaysAmount }: Props) {
  return (
    <div>
      <div className="title">Hello Wedding Maker!</div>
      <div className="center">
        It's pleasure to meet you. To wedding you are going to organize is left
      </div>
      <h1>
        {Number(celebrationDaysAmount.days_to_ceremony) >= 0
          ? Number(celebrationDaysAmount.days_to_ceremony)
          : "NO"}{" "}
        days!
      </h1>
      {Number(celebrationDaysAmount.days_to_ceremony) <= 0 && (
        <div>
          <h1>CONGRATULATIONS!!!</h1>
          You can rest now and enjoy this big day!
        </div>
      )}
      {Number(celebrationDaysAmount.days_to_ceremony) > 0 && (
        <div>
          <h3>
            Be aware then and check features which will help you in that whole
            thing!
          </h3>
          <h2>Check this cool thing:</h2>
          <ul>
            <li>
              Offers page - find wedding services delivered by professional
              wedding service providers!
            </li>
            <li>
              Events page - plan special days and hour (just events!) and attach
              notes to these!
            </li>
            <li>
              Guests page - make guest list and add your own attribiutes to
              these! Check this out!
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrganizerHomeContent;
