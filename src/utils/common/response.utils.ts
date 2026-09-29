export const successResponse = <T>(data: T, message: string) => {
  return {
    success: true,
    message: message,
    data: data,
    error: {}
  };
};

export const errorResponse = (error: unknown = {}, message: string) => {
  return {
    success: false,
    message: message,
    data: {},
    error: error
  };
};
