//import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import {List} from "immutable";
import API from "../components/axios/api";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TooltipText from "../components/tooltip/TooltipText";
import TooltipBox from "../components/tooltip/TooltipBox";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { useForm } from "react-hook-form";
import Tree, { TreeNode } from "rc-tree";
import "rc-tree/assets/index.css";

const Category = (props) => {
  //얼럿 메세지
  const { showToast } = useToast();
  //데이터 동적 상태 관리
  const [categoryData, setCategoryData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  //체크박스 값
  const [checkItems, setCheckItems] = useState([]);

  
  //하이라키 상태
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState(["0-0-1"]);
  const [dragChildrenTree, setDragChildrenTree] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState([
    "0-0",
    "0-0-0"
  ])
  //테스트용
  const [gData, setGData] = useState([
    {
      key: "0-0",
      title: "parent 1",
      children: [
        {
          key: "0-0-0",
          title: "parent 1-1",
          children: [{ key: "0-0-0-0", title: "parent 1-1-0" }]
        },
        {
          key: "0-0-1",
          title: "parent 1-2",
          children: [
            { key: "0-0-1-0", title: "parent 1-2-0", disableCheckbox: true },
            { key: "0-0-1-1", title: "parent 1-2-1" },
            { key: "0-0-1-2", title: "parent 1-2-1" },
            { key: "0-0-1-3", title: "parent 1-2-1" },
            { key: "0-0-1-4", title: "parent 1-2-1" },
            { key: "0-0-1-5", title: "parent 1-2-1" },
            { key: "0-0-1-6", title: "parent 1-2-1" }
          ]
        }
      ]
    }
  ]);
  
  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteButton = useCallback(() => {
    setOpenDeleteConfirm(true);
  }, [setOpenDeleteConfirm]);

  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);

  // const handleApply = useCallback(() => {
  //   showToast(`적용이 완료되었습니다.`, `success`);
  //   setOpenApplyConfirm(false);
  // }, [setOpenApplyConfirm, showToast]);

  //다이알로그 페이지 1
  const [insertConfirm, setInsertConfirm] = useState(false);
  const handleOpenPopUp = useCallback(() => {
    setInsertConfirm(true);
  }, [setInsertConfirm]);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit = useCallback(
    (groupData) => {
      showToast(
        "퀴즈그룹이 등록이 완료되었습니다.",
        `success`
      );
      setInsertConfirm(false);
    },
    [showToast, setInsertConfirm]
  );
  const onInvalid = (errors) => console.log(errors);  

  //다이알로그 페이지 2
  const [isGroupContent, setGroupContent] = useState(false);
  const handleOpenGroupContent = useCallback(() => {
    setGroupContent(true);
  }, [setGroupContent]);

  //다이알로그 카테고리 등록,속성
  const [categoryConfirm, setCategoryConfirm] = useState(false);
  const handleOpenCategory = useCallback(() => {
    setCategoryConfirm(true);
  }, [setCategoryConfirm]);

  //다이알로그 페이지 3
//   const [isQuzContent, setQuzContent] = useState(false);
//   const handleOpensetQuzContent = useCallback(() => {
//     setQuzContent(true);
//   }, [setQuzContent]);

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null); 

  //API호출 관련
  const url = "cms/v1/quiz/admin/program";

  //조회(카테고리 목록)
  const getCategoryData = useCallback( async () => {
    await API.get(`${url}/hierarchy`).then(
        (res) => {
          console.log(res);
          if(res.data.sccsYn === "Y"){
            console.log(res);
            setCategoryData(res.data.data);
          }
        }).catch((error)=>{
          console.log(error);
        })
      },[setCategoryData]);

  //조회(퀴즈그룹 목록)
  const getGroupData = useCallback(async (qzCatId) => {
    if (!qzCatId) {
      showToast('카테고리를 선택하십시오.', 'error');
      return;
    }

    await API.get(`${url}/category-group/${qzCatId}`).then(
        (res) => {
          console.log(res);
          if(res.data.sccsYn === "Y"){
            console.log(res);
            setGroupData(res.data.data);
          }
        }).catch((error)=>{
          console.log(error);
        })
      },[setGroupData]);

  //이벤트 처리 관련
  const handleClickFile = (e) => { // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  }

  const handleChangeFile = (e) => {
    setImgFile(e.target.files);
    setImgBase64([]);

    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          var base64Sub = base64.toString();
          setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          e.target.nextElementSibling.value = e.target.files[0].name; // input에 파일 이름 노출
        }
      };
    }
  };

  const handleResetFile = (e) => { // 파일 이미지 삭제
    setImgBase64((imgBase64) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value = "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value = "";
  };

  const handleSingleCheck = useCallback(
    (checked,id) => {
      if(checked){
        setCheckItems([...checkItems,id]);
      }else {
        setCheckItems(checkItems.filter((el) => el !== id));
      }
    },[setCheckItems,checkItems]
  );
  
  // 드래그 이벤트
  const onDragStart = (e) => {
    console.log('drag', e);

  }

  const onDrop = (e) => {
    console.log('drop', e);
    const dropKey = e.node.key;
    const dragKey = e.dragNode.key;
    const dropPos = e.node.pos.split('-');
    const dropPosition = e.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === 0) {
      // Drop on the content
      loop(data, dropKey, item => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap (insert before or insert after)
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    
    setGData(data);
    // this.setState({
    //   gData: data,
    // });
  }

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

    //렌더링 시 호출
    useEffect(()=>{
      getCategoryData();
      getGroupData();
    }, [getCategoryData, getGroupData]);
  


  return (
    <>
      <div className="layout_wrap">
        {/* 카테고리 */}
        <div className="layout_item wt-pc30">
          <div className="cpnt_tree">
            <h2 className="title">카테고리</h2>
              <div className="tree-default draggable-container">
              <Tree
                expandedKeys={expandedKeys}
                treeData={gData}
                draggable
                showLine
                selectable
                defaultExpandedKeys={defaultExpandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={() => getGroupData(gData.key)}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onExpand={onExpand}
                />
              </div>
            <div className="cpnt_btns mg-t0 pd-t5 cid-grow">
              <button type="button" className="sb" onClick={handleOpenCategory}>
                <AddIcon /> 생성
              </button>
              <button type="button" className="" onClick={handleOpenCategory}>
                <PlaylistAddCheckIcon /> 속성
              </button>
              <button type="button" className="" onClick={handleOpenGroupContent}>
                <SimCardDownloadIcon /> 엑셀 다운로드
              </button>
              <button type="button" onClick={handleDeleteButton}>
                <DeleteOutlineIcon /> 삭제
              </button>
            </div>
          </div>
        </div>

        {/* 그룹 리스트 */}
        <div className="layout_item wt-pc70 pd20">
          <div className="cpnt_btns">
            <button type="button"
                    onClick={handleDeleteButton} 
                    className="af-r">
              <DeleteOutlineIcon/> 삭제
            </button>
            <button type="button" 
                    onClick={handleOpenGroupContent}>
              <AddIcon/> 퀴즈그룹 추가
            </button>
          </div>
          <div className="cpnt_table">
            <table id="table-to-xls" className="table-default">
              <caption>
                <span className="total">
                  Total: <b>{groupData.length}</b>
                </span>
              </caption>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>퀴즈그룹 번호</th>
                  <th>
                    <TooltipText title="클릭 시 등록된 '퀴즈그룹 상세'를 확인 하실 수 잇습니다.">
                      퀴즈그룹 명
                    </TooltipText>
                  </th>
                  <th>퀴즈그룹 문항 수</th>
                  <th>상용 노출 여부</th>
                  <th>편성 현황</th>
                </tr>
              </thead>
              <tbody>
              { groupData?.map((data, index) => (
                <tr key={index}>
                  <td>
                    <input
                          type="checkbox"
                          name="checkList"
                          onChange={(e) =>
                              handleSingleCheck(e.target.checked, index)}
                          checked={checkItems.includes(index) ? true : false}
                    />
                  </td>
                  <td>{data.qzGrpNo}</td>
                  <td>{data.qzGrpNm}</td>
                  <td></td>
                  <td></td>
                  <td> 
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <ConfirmDialog
          open={isSaveConfirm}
          setOpen={setSaveConfirm}
          //onConfirm={handleSave}
          >
          <div>
            {`저장하시겠습니까?`}
          </div>
        </ConfirmDialog>
        <ConfirmDialog
          open={isDeleteConfirm}
          setOpen={setDeleteConfirm}
          onConfirm={handleDelete}
          >
          <div>{`선택한 항목을 삭제하시겠습니까?`}</div>
        </ConfirmDialog> */}
      </div>
    </>
  )
}

export default Category;