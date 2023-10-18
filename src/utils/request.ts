const request = async (url: string, data?: any) => {
  const prefix = "http://localhost:9000";
  try {
    const response = await fetch(prefix + url, {
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {}
};

export default request;
