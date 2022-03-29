import { Container, Divider, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export const DefaultLayout = ({ children }) => {
  const location = useLocation();
  const [middlePath, setMiddlePath] = useState("");
  const [lastPath, setLastPath] = useState("");
  const changeHeaderPath = useCallback(() => {
    const pathname = location.pathname;
    const path = pathname.split(`/`);
    console.log(path);
    // switch (path[1]) {
    //   case `curr`:
    //     setMiddlePath("커리큘럼 편성관리");
    //     break;
    //   case `parents`:
    //     setMiddlePath(`부모알림장 관리`);
    //     break;
    //   case `pet`:
    //     setMiddlePath(`펫 관리`);
    //     break;
    //   default:
    //     break;
    // }

    // switch (path[2]) {
    //   case `org`:
    //     setLastPath(`커리큘럼 편성`);
    //     break;
    //   case `setting`:
    //     setLastPath(`커리큘럼 설정`);
    //     break;
    //   case `banners`:
    //     setLastPath(`배너`);
    //     break;
    //   case `petlist`:
    //     setLastPath(`펫 목록`);
    //     break;
    //   default:
    //     break;
    // }

    //Sidebar.js 에 있는거 복사해서 사용. 나중에 카테고리 데이터 통합해도 될듯 //스위치문시 2차메뉴중에 동일메뉴 나옴. 관리 어려움
    const category = [
      {
        text: "커리큘럼 편성관리", path: "/curr/org",
        sub: [
          { text: "커리큘럼 편성", path: "/curr/org" },
          { text: "커리큘럼 설정", path: "/curr/setting" },
        ],
      },
      {
        text: "부모알림장 관리", path: "/parents/banners",
        sub: [
          { text: "학부모 유용정보", path: "/" },
          { text: "배너", path: "/parents/banners" },
          // { text: "문구", path: "/" },
        ],
      },
      {
        text: "펫 관리", path: "/pet/petsetting",
        sub: [
          { text: "펫 설정", path: "/pet/petsetting" },
          { text: "펫 목록", path: "/pet/petlist" },
        ],
      },
      { text: "문구 관리", path: "/phrase/setting",
        sub: [
  
        ],
      }
    ];
    for(let i=0;i<category.length;i++){
      if(path[1] == category[i].path.split("/")[1]){
        setMiddlePath(category[i].text);
        for(let j=0;j<category[i].sub.length;j++){
          if(path[2] == category[i].sub[j].path.split("/")[2]){
            setLastPath(category[i].sub[j].text);
          }
        }
      }
    }

  }, [location, setMiddlePath, setLastPath]);
  useEffect(() => {
    changeHeaderPath();
  }, [changeHeaderPath, location]);

  return (
    <Container disableGutters maxWidth={false} className="cpnt_contents">
      <div className="cpnt_title">
        <h1>{lastPath}</h1>
        <span className="path"><HomeIcon></HomeIcon> 	&gt; {`LMS 어드민 > ${middlePath} > ${lastPath} `}</span>
      </div>
      {/* <Divider /> */}
      <Grid className="cpnt_conts">{children}</Grid>
    </Container>
  );
};
