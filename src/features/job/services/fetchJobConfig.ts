const requestConfig = (currentPage: number, size: number, authToken) => {
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  return {
    method: "GET",
    url: "http://localhost:8080/api/v1/jobs",
    params: {
      page: currentPage,
      size: size,
    },
    headers: headers,
  };
};

export default requestConfig;
