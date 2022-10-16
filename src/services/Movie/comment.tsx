import { addDoc, collection, getDocs } from "firebase/firestore"
import { CreateCommentModel } from "../../models/movies"
import { db } from "../firebase"

export const createComment = async (comment: CreateCommentModel): Promise<string> => {
    const ref = collection(db, 'comment')
    const createdComment = await addDoc(ref, comment)
    return createdComment.id
  }

export const getAllComments = async (): Promise<CreateCommentModel[]> => {
    const comments:CreateCommentModel[] = [];
    const querySnapshot = await getDocs(collection(db, "comment"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    comments.push({
        commentBody: doc.data().commentBody,
        userId: doc.data().userId,
        movieId: doc.data().movieId,
        commentId: doc.data().commentId
    }as unknown as CreateCommentModel);
});
    return comments;
}