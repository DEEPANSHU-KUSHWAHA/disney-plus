import type { Logo, Movie } from "../types";

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_API_URL = process.env.TMDB_API_URL!;

type Group = "popular" | "top-rated";

const api = {
  get: {
    movies: async ({
      group,
      page,
    }: {
      group: Group;
      page: number;
    }): Promise<Movie[]> => {
      const groupName = group.split("-").join("_");
      const response = await fetch(
        `${TMDB_API_URL}/3/movie/${groupName}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
      );
      const { results } = await response.json();
      const movies = results.map((movie: any) => {
        return {
          id: movie.id,
          title: movie.title,
          isForAdult: movie.adult,
          image: {
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          },
          overview: movie.overview,
          releasedAt: movie.release_date,
          language: {
            original: movie.original_language,
          },
        };
      });
      return movies;
    },
    movie: {
      logo: async (movieId: string): Promise<Logo> => {
        const response = await fetch(
          `${TMDB_API_URL}/3/movie/${movieId}/images?api_key=${TMDB_API_KEY}`
        );
        const { logos } = await response.json();
        const logo = logos[0];
        return {
          aspectRatio: logo.aspect_ratio,
          width: logo.width,
          height: logo.height,
          image: `https://image.tmdb.org/t/p/original/${logo.file_path}`,
        };
      },
      spotlight: async (): Promise<Movie> => {
        const response = await fetch(
          `${TMDB_API_URL}/3/trending/movie/day?api_key=${TMDB_API_KEY}`
        );
        const { results } = await response.json();
        const random = Math.floor(Math.random() * results.length);
        const movie = results[random];
        return {
          id: movie.id,
          title: movie.title,
          isForAdult: movie.adult,
          image: {
            poster: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          },
          overview: movie.overview,
          releasedAt: movie.release_date,
          language: {
            original: movie.original_language,
          },
        };
      },
    },
  },
};

export default api;