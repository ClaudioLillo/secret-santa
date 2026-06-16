import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  path: string;
  onClose: () => void;
};

export default function PageCard({ name, path, onClose }: Props) {
  const navigate = useNavigate();

  const goTo = (path: string) => () => {
    navigate(`/${path}`);
    onClose();
  };

  return (
    <div
      className="page-card"
      onClick={goTo(path)}
    >
      <div>{name}</div>
    </div>
  );
}
