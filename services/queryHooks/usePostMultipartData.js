import { useMutation } from "@tanstack/react-query";
import { postMultipartData } from "../apiService";

export const usePostMultipartData = (url) => {
  return useMutation(({ body, files }) => postMultipartData(url, body, files));
};
