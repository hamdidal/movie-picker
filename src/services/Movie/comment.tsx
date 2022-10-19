import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
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

export const createFav = async (fav: FavlistPropsModel) => {
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

export const isFavoriteByMovieAndUserId = async (
  movieId: number,
  userId: string
): Promise<any> => {
  const q = query(
    collection(db, "favlist"),
    where("movieId", "==", movieId),
    where("userId", "==", userId)
  );
  const res: any[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    res.push({
      id: doc.id,
      ...data,
    });
  });
  return res[0];
};

export const deleteFav = async (id: string) => {
  const deletedFav = await deleteDoc(doc(db, "favlist", id));
  return deletedFav;
};
