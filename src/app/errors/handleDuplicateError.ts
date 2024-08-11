import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: Error): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: extractedMessage ?? 'Noe message found',
    },
  ];

  return {
    statusCode: 400,
    message: `${extractedMessage} is already exists`,
    errorSources,
  };
};

export default handleDuplicateError;
