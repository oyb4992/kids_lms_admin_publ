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
  const itemslist = [
    {
      text: "커리큘럼 편성관리",
      sub: [
        { text: "커리큘럼편성", path: "/curr/org" },
        { text: "커리큘럼설정", path: "/curr/setting" },
      ],
    },
    {
      text: "부모알림장 관리",
      sub: [
        { text: "학부모 유용정보", path: "/" },
        { text: "배너", path: "/parents/banners" },
        { text: "문구", path: "/" },
      ],
    },
    {
      text: "펫 관리",
      sub: [
        { text: "펫 설정", path: "/pet/petsetting" },
        { text: "펫 목록", path: "/pet/petlist" },
      ],
    },
  ];
  return (
    // <div className={styles.cpnt_lnb}>
    <div className="cpnt_lnb">
      <h1>LMS 어드민</h1>
      <ul>
        {itemslist.map((item, index) => {
          const { text, sub } = item;
          return (
            <li key={text}>
              <a key={`${text}`}>{`${text}`}</a>
              {sub.map((subItem) => {
                const { text, path } = subItem;
                return (
                  <ul key={`${text}`}>
                    <li>
                      <a key={`${text}`} href={path}>
                        {text}
                      </a>
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
