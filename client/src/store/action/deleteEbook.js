import axios from "axios";
import * as actions from "./rootActions";

export const onDeleteEbook = (bookId, bookCoverName, pdfName, props) => (
   dispatch
) => {
   axios
      .delete(`/api/ebooks/delete/${bookId}/${bookCoverName}/${pdfName}`)
      .then((response) => {
         dispatch(actions.onFlash("Ebook delete successfully", "success"));
         props.history.push("/");
      })
      .catch((err) =>
         dispatch(actions.onFlash(err.response.data.errMsg, "success"))
      );
};
