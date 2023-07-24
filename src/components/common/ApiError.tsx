interface IApiError {
  error?: any;
}
const ApiError = ({ error }: IApiError) => {
  return <p className="text-red-500">An error occurred</p>;
};

export default ApiError;
