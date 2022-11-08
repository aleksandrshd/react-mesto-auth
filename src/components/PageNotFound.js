import {Link} from "react-router-dom";
import image404 from "../images/404.jpg"

export default function PageNotFound () {
  return (
    <div className="not-found">
      <Link className="not-found__link" to="/">&larr; Вернуться на главную</Link>
      <img className="not-found__image" src={image404}/>
    </div>
  );
}