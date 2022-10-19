import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { CreateCommentModel, FavlistPropsModel } from "../../models/movies";
import { db } from "../Firebase";

export const createComment = async (
  comment: CreateCommentModel
): Promise<string> => {
  const ref = collection(db, "comment");
  const createdComment = await addDoc(ref, comment);
  return createdComment.id;
};

export const getCommentForMovieId = async (movieId: number) => {
  const q = query(collection(db, "comment"), where("movieId", "==", movieId));

  const querySnapshot = await getDocs(q);
  console.log("comment", querySnapshot);
  const comments: CreateCommentModel[] = [];
  querySnapshot.forEach((doc) => {
    const docData = doc.data();
    const data = {
      commentBody: docData.commentBody,
      userId: docData.userId,
      movieId: docData.movieId,
      commentId: docData.commentId,
    };
    comments.push(data);
  });
  return comments;
};

export const createFavlist = async (fav: FavlistPropsModel) => {
  const ref = collection(db, "favlist");
  const createdFavList = await addDoc(ref, fav);
  return createdFavList.id;
};

export const getFavlistForUserId = async (userId: any) => {
  try {
    const q = query(collection(db, "favlist"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const favs: FavlistPropsModel[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const data = {
        movieTitle: docData.movieTitle,
        userId: docData.userId,
        movieId: docData.movieId,
      };
      favs.push(data);
    });
    return favs;
  } catch (error) {
    console.log(error);
  }
};
