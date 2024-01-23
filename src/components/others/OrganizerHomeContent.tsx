import { User } from "../Models";

interface Props {
  user: User;
}

function OrganizerHomeContent({ user }: Props) {
  return (
    <div>
      <div className="title">Hello Wedding Maker!</div>
      <div className="center">
        It's pleasure to meet you. To wedding you are going to organize is left
      </div>
      <h1>{user.organizer!.days_to_ceremony} days!</h1>
      {user.organizer!.days_to_ceremony > 0 && (
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
