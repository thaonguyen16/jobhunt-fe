import { ErrorResponse, useRouteError } from "react-router-dom";
import { ErrorPage, NotFoundPage } from ".";

export default function ErrorBoundary() {
  const error = useRouteError() as ErrorResponse;
  if (error.status === 404) {
    return <NotFoundPage />;
  }
  return <ErrorPage message={error.statusText} />;
}
