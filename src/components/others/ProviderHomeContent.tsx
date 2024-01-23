import { User } from "../Models";

interface Props {
  user: User;
}

function ProviderHomeContent({ user }: Props) {
  return (
    <div>
      <div className="title">Hello Wedding Service Provider!</div>
      <div className="center">
        It's pleasure to meet you. Remember - your wedding services have to
        best!
      </div>
      {user.provider!.address && (
        <h1>Your address is {user.provider!.address}</h1>
      )}
      {user.provider!.phone_number && (
        <h1>Your phone number is {user.provider!.phone_number}</h1>
      )}
      <h3>
        Remember that you can always change your profile data in profile
        settings.
      </h3>
      <div>
        <h3>
          Check features which will help you in that great wedding service!
        </h3>
        <ul>
          <li>
            Offers - post your offers and take people a chance to find your
            services.
          </li>
          <li>
            Events page - plan special days and hour (just events!) and attach
            notes to these!
          </li>
        </ul>
      </div>
      <h3>
        You can plan every service or product you plan to give. And of course
        publish this offers.
      </h3>
      <h3>Don't waste time because you have so many services to serve!</h3>
    </div>
  );
}

export default ProviderHomeContent;
