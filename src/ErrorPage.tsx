import { ErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error: unknown = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as { statusText?: string })?.statusText ||
            (error as ErrorResponse)?.data}
        </i>
      </p>
    </div>
  );
}

export default ErrorPage;
