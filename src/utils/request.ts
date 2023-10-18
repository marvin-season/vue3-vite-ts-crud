import qs from "qs";
import { ElMessage } from "element-plus";
const baseUrl = "http://localhost:9000";
const request = async (
  url: string,
  option?: RequestInit & { params?: { [key: string]: any }; data?: any }
) => {
  const option_: RequestInit = {};
  option_.headers = {
    "Content-Type": "application/json",
    ...option?.headers,
  };

  option_.method = option?.method ?? "GET";

  if (option?.data) {
    option_.body = JSON.stringify(option?.data);
  }

  const paramsStr = qs.stringify(option?.params);
  const url_ = baseUrl.concat(url).concat(paramsStr ? `?${paramsStr}` : "");

  try {
    const response = await fetch(url_, option_);
    
    if(response.status != 200){
      ElMessage({
        message: response.statusText,
        type: "error",
      })
    }
    return await response.json();
  } catch (error) {}
};

export default request;
