import { useMutation } from "@tanstack/react-query";
import { postData } from "../apiService";

export const usePostData = (url: string) => {
  return useMutation({
    mutationFn: (body: any) => postData(url, body),
  });
};


 