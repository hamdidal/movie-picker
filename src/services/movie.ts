import HttpClient from "./HttpClient";

export async function searchMovie(query: any) {
  const response = await HttpClient.get("/search/movie", {
    params: {
      query,
      page: 1,
    },
  });
  return response;
}