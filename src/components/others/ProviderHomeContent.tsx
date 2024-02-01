import { ProviderUserContact } from "../Models";

interface Props {
  contact: ProviderUserContact;
}

function ProviderHomeContent({ contact }: Props) {
  return (
    <div>
      <div className="title">Hello Wedding Service Provider!</div>
      <div className="center">
        It's pleasure to meet you. Remember - your wedding services have to be
        best!
      </div>
      {contact.address && <h1>Your address is {contact.address}</h1>}
      {contact.phone_number && (
        <h1>Your phone number is {contact.phone_number}</h1>
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
            Offers - post your offers and give people a chance to find your
            services.
          </li>
          <li>
            Events page - plan special events in dates with precision to seconds
            and attach notes to these!
          </li>
        </ul>
      </div>
      <h3>
        You can plan every service or product you plan to give. And of course
        publish these offers.
      </h3>
      <h3>Don't waste time because you have so many chance to serve!</h3>
    </div>
  );
}

export default ProviderHomeContent;
