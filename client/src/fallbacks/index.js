function ErrorFallback({ error, resetErrorBoundary }) {
  return <div>Something went wrong buddy</div>;
}

function ErrorInfoFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p> {error.response.data.message}</p>
      <img src="/images/sample.jpg" alt="" />
    </div>
  );
}

export { ErrorFallback, ErrorInfoFallback };
