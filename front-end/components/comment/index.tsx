import CommentForm from "./form";
import CommentList from "./list";
import useApplications from "../../hooks/useApplications";

export default function Comment() {
  const { text, setText, applications, onSubmit, onDelete } = useApplications();

  return (
    <div className="mt-20">
      <CommentForm onSubmit={onSubmit} text={text} setText={setText} />
      <CommentList applications={applications} onDelete={onDelete} />
    </div>
  );
}
