import HttpClient from "../HttpClient";

export async function searchMovie(params: any) {
  const response = await HttpClient.get("/search/movie", {
    params,
  });
  return response;
}

export async function findMovieBydId(movie_id: any) {
  const response = await HttpClient.get(`/movie/${movie_id}`, { params: {} });
  return response;
}
