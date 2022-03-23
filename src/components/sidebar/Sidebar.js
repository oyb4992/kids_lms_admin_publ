import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import styles from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &::visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const drawerWidth = 200;

const PersistentDrawerLeft = () => {
  const location = useLocation();
  const urlpath = location.pathname.split(`/`);

  const itemslist = [
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
    { text: "문구 관리", path: "/parents/banners",
      sub: [

      ],
    }

    
  ];
  return (
    // <div className={styles.cpnt_lnb}>
    <div className="cpnt_lnb">
      <h1>LMS 어드민</h1>
      <ul>
        {itemslist.map((item, index) => {
          const { text, path ,sub } = item;
          return (
            <li key={text} className={` ${ path.indexOf(urlpath[1]) > -1 && 'active'} `}>
              <Link key={`${text}`} to={`${path}`}>{`${text}`}</Link>
              {sub.map((subItem) => {
                const { text, path } = subItem;
                return (
                  <ul key={`${text}`}>
                    <li className={` ${ path.indexOf(urlpath[2]) > -1 && 'active'} `}>
                      <Link key={`${text}`} to={path}>
                        {text}
                      </Link>
                    </li>
                  </ul>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
    // <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       "& .MuiDrawer-paper": {
    //         width: drawerWidth,
    //         boxSizing: "border-box",
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="left"
    //     open={true}
    //   >
    //     <Divider />
    //     <List
    //       sx={{
    //         "& ul": { padding: 0 },
    //       }}
    //       subheader={<li />}
    //     >
    //       {itemslist.map((item, index) => {
    //         const { text, sub } = item;
    //         return (
    //           <li key={text}>
    //             <ul>
    //               <ListSubheader>{`${text}`}</ListSubheader>
    //               {sub.map((subItem) => {
    //                 const { text, path } = subItem;
    //                 return (
    //                   <StyledLink key={`${text}`} to={path}>
    //                     <ListItem button key={`${text}`}>
    //                       <ListItemText key={`${text}`} primary={text} />
    //                     </ListItem>
    //                   </StyledLink>
    //                 );
    //               })}
    //             </ul>
    //           </li>
    //         );
    //       })}
    //     </List>
    //   </Drawer>
  );
};

export default PersistentDrawerLeft;
