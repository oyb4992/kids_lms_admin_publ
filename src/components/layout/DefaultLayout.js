import { Container, Divider, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const [middlePath, setMiddlePath] = useState("");
  const [lastPath, setLastPath] = useState("");
  const changeHeaderPath = useCallback(() => {
    const pathname = location.pathname;
    const path = pathname.split(`/`);
    console.log(path);
    switch (path[1]) {
      case `curr`:
        setMiddlePath("커리큘럼 편성관리");
        break;
      case `parents`:
        setMiddlePath(`부모알림장 관리`);
        break;
      case `pet`:
        setMiddlePath(`펫 관리`);
        break;
      default:
        break;
    }

    switch (path[2]) {
      case `org`:
        setLastPath(`커리큘럼 편성`);
        break;
      case `setting`:
        setLastPath(`커리큘럼 설정`);
        break;
      case `banners`:
        setLastPath(`배너`);
        break;
      case `petlist`:
        setLastPath(`펫 목록`);
        break;
      default:
        break;
    }
  }, [location, setMiddlePath, setLastPath]);
  useEffect(() => {
    changeHeaderPath();
  }, [changeHeaderPath, location]);

  return (
    <Container disableGutters maxWidth={false} className="cpnt_contents">
      <div className="cpnt_title">
        <h1>{lastPath}</h1>
        <span className="path">{`홈 > ${middlePath} > ${lastPath} `}</span>
      </div>
      {/* <Divider /> */}
      <Grid className="cpnt_conts">{children}</Grid>
    </Container>
  );
};
