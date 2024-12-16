import { Link } from "react-router-dom";

export default function LogoButton() {
  return (
    <Link to="/">
      <span className="text-3xl font-semibold text-primary-500">Jobhunt</span>
    </Link>
  );
}
