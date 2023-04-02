import { useHistory } from "react-router-dom";
import Tables from "../../pages/Tables";

const Protected = () => {
  const history = useHistory();
  const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  const checkCookie = () => {
    let token = getCookie("access_token");
    if (token != "") {
      return false;
    } else {
      return true;
    }
  };
  if (checkCookie()) {
    console.log("hi");
    history.push("/sign-in");
  }
  return <Tables />;
};
export default Protected;
