interface IQueryDataHandler {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  ui?: React.ReactNode;
  fetchingUi?: React.ReactNode;
  loadingUi?: React.ReactNode;
  errorUi?: React.ReactNode;
  paginationUi?: React.ReactNode;
  [key: string]: any;
}
const QueryDataHandler = (props: IQueryDataHandler) => {
  const {
    isLoading,
    isError,
    isFetching,
    isSuccess,
    ui,
    loadingUi,
    fetchingUi,
    errorUi,
    paginationUi,
  } = props;
  if (isLoading) return <>{loadingUi}</>;
  if (!isLoading && isError) return <>{errorUi}</>;
  if (!isLoading && !isError && isFetching && !!fetchingUi)
    return (
      <div>
        {ui}
        {fetchingUi}
      </div>
    );
  if (!isLoading && !isError && isSuccess && !!paginationUi)
    return (
      <>
        {ui}
        {paginationUi}
      </>
    );
  if (!isLoading && !isError && isSuccess) return <>{ui}</>;
  if (!isLoading && !isError && isSuccess) return <>{ui}</>;
  return (
    <p className="text-red-500">
      No condition matched. Logical Error Ocurred. Please contact to developer!
    </p>
  );
};

export default QueryDataHandler;
