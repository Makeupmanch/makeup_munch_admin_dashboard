// import { useMutation } from "@tanstack/react-query";
// import { deleteData } from "../apiService";

// export const useDeleteData = (url) => {
//   return useMutation({
//     mutationFn: (body) => deleteData(url, body),

//     onSuccess: (data) => {
//       console.log("Mutation successful:", data);
//     },
//     onError: (error) => {
//       console.error("Mutation error:", error.response || error.message);
//     },
//   });
// };





import { useMutation } from "@tanstack/react-query";
import { deleteData } from "../apiService";


export const useDeleteData = (url: string) => {
  return useMutation({
    mutationFn: (body: any) => deleteData(url, body),
  });
};

