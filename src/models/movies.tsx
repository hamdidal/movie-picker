export interface MovieProps {
    poster_path: string;
    backdrop_path: string;
    id: number;
    original_title: string;
    overview: string;
    release_date: string;
    vote_average: number;
  }

export interface FindMovieProps{
    id: number
}

export interface CreateCommentModel{
  commentBody:string;
  userId: string;
  commentId: string;
  movieId: number;
}

export interface SendEmailProps {
  title: string
}
