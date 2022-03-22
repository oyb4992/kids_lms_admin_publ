import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { List } from "immutable";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import API from "../components/axios/api";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";

const CurriculumOrg = () => {
  const { showToast } = useToast();
  const [data, setData] = useState([
    {
      crcmPrgmNo: 8000007,
      snrDvsCd: "온순한 기질",
      prgmNum: 1,
      oriNum: 0,
      prgmTypCd: "추천",
      rcmTypNm: "인트로2",
      paperId: null,
      useStsCd: "사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000006,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 2,
      oriNum: 0,
      prgmTypCd: "영어유치원",
      rcmTypNm: "인트로ㅇㅇ",
      paperId: null,
      useStsCd: "사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000011,
      snrDvsCd: "고집있는 기질",
      prgmNum: 3,
      oriNum: 0,
      prgmTypCd: "추천",
      rcmTypNm: "컨텐츠",
      paperId: "M01160030PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000014,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 4,
      oriNum: 0,
      prgmTypCd: "영어유치원",
      rcmTypNm: "인트로3",
      paperId: "M012564130PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000013,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 5,
      oriNum: 0,
      prgmTypCd: "추천",
      rcmTypNm: "인트로3",
      paperId: "M012564130PPV00",
      useStsCd: "검수",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000034,
      snrDvsCd: "온순한 기질",
      prgmNum: 6,
      oriNum: 0,
      prgmTypCd: "추천",
      rcmTypNm: "커리큘럼1",
      paperId: "M01256410PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000012,
      snrDvsCd: "고집있는 기질",
      prgmNum: 7,
      oriNum: 0,
      prgmTypCd: "추천",
      rcmTypNm: "컨텐츠2",
      paperId: "M01160030PPV11",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000010,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 8,
      oriNum: 0,
      prgmTypCd: "추천",
      rcmTypNm: "인트로",
      paperId: "M011623130PPV00",
      useStsCd: "사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
  ]);
  const [checkItems, setCheckItems] = useState([]);

  const [isOpenConfirm, setOpenConfirm] = useState(false);
  const handleButtonClick = useCallback(() => {
    setOpenConfirm(true);
  }, [setOpenConfirm]);

  //   const getData = useCallback(async () => {
  //     await API.get("/api/v1/lms/admin/curriculum-programming/containers").then(
  //       (res) => {
  //         console.log(res);
  //         setData(res.data.data);
  //       }
  //     );
  //   }, [setData]);

  const updateData = useCallback(
    async (data) => {
      await API.put("/api/v1/lms/admin/curriculum-programming/containers", data)
        .then((res) => {
          setCheckItems([]);
          showToast(`적용되었습니다.`, `success`);
        })
        .catch((err) => {
          showToast(`적용 실패하였습니다.`, `error`);
        });
    },
    [setCheckItems, showToast]
  );
  //   useEffect(() => {
  //     getData();
  //   }, [getData, updateData]);

  const handleDragEnd = useCallback(
    (e) => {
      console.log(e);
      if (!e.destination) {
        return;
      }

      if (e.destination.index === e.source.index) {
        return;
      }

      let tempData = Array.from(data);
      let [source_data] = tempData.splice(e.source.index, 1);
      tempData.splice(e.destination.index, 0, source_data);
      const min = Math.min(e.source.index, e.destination.index);
      const max = Math.max(e.source.index, e.destination.index);

      for (var i = min; i <= max; i++) {
        if (!tempData[i].oriNum) {
          tempData[i].oriNum = tempData[i].prgmNum;
        }
        tempData[i].prgmNum = i + 1;
      }
      console.log(tempData);
      setData(tempData);
    },
    [data, setData]
  );

  const handleSingleCheck = useCallback(
    (checked, id) => {
      if (checked) {
        setCheckItems([...checkItems, id]);
      } else {
        setCheckItems(checkItems.filter((el) => el !== id));
      }
    },
    [setCheckItems, checkItems]
  );

  const handleAllCheck = useCallback(
    (checked) => {
      if (checked) {
        const idArray = [];
        data.forEach((el) => idArray.push(el.crcmPrgmNo));
        setCheckItems(idArray);
      } else {
        setCheckItems([]);
      }
    },
    [data, setCheckItems]
  );

  const handleUseSelect = useCallback(
    (e, key) => {
      const selected = e.target.value;
      const list = List(data);
      const index = list.findIndex((i) => i.crcmPrgmNo === key);
      const newArr = list.update(index, (item) =>
        Object.assign({}, item, { useStsCd: selected })
      );
      setData(newArr);
    },
    [data, setData]
  );

  const handleApply = useCallback(() => {
    const list = List(data);
    const index = list.filter(
      (i) =>
        (typeof i.oriNum !== "undefined" &&
          i.prgmNum !== i.oriNum &&
          i.oriNum !== 0) ||
        checkItems.includes(i.crcmPrgmNo)
    );
    console.log(index.toJS());
    if (index.size === 0) {
      showToast(`적용할 데이터가 없습니다.`, `warning`);
      return;
    }
    updateData(index.toJS());
  }, [data, checkItems, updateData, showToast]);

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleDelete = useCallback(() => {
    console.log(checkItems);
  }, [checkItems]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="cpnt_pageSearch Fms at-r">
        <select class="fm">
            <option>아이진단 미완료</option>
            <option>온순한 기질</option>
            <option>고집있는 기질</option>
            <option>변화무쌍한 기질</option>
            <option>섬세한 기질</option>
        </select>

      </div>
      <Box className="cpnt_pageTab">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab label="아이진단 미완료" {...a11yProps(0)} />
          <Tab label="온순한 기질 미완료" {...a11yProps(1)} />
          <Tab label="고집있는 기질 미완료" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="cpnt_table">
          <DragDropContext onDragEnd={handleDragEnd}>
            <table className="table-default">
              <caption><strong className="blind">커리큘럼 편성 테이블</strong> <span className="total">Total: <b>{data.length}</b></span></caption>
              <thead>
                <tr>
                  <th>
                    <input
                      name="checkAll"
                      type={"checkbox"}
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      checked={checkItems.length === data.length ? true : false}
                    />
                  </th>
                  <th>순서</th>
                  <th>추천유형명</th>
                  <th>타입</th>
                  <th>추천코드/편성정보</th>
                  <th>사용여부</th>
                </tr>
              </thead>
              <Droppable droppableId="droppable-1" direction="vertical">
                {(provider) => (
                  <tbody ref={provider.innerRef} {...provider.droppableProps}>
                    {data?.map((data, index) => (
                      <Draggable
                        key={`${data.crcmPrgmNo}`}
                        draggableId={`${data.crcmPrgmNo}`}
                        index={index}
                      >
                        {(provider) => (
                          <tr {...provider.draggableProps} ref={provider.innerRef} className={`  `} >
                            <td {...provider.dragHandleProps}>
                              <input
                                type={"checkbox"}
                                onChange={(e) =>
                                  handleSingleCheck(
                                    e.target.checked,
                                    data.crcmPrgmNo
                                  )
                                }
                                checked={
                                  checkItems.includes(data.crcmPrgmNo)
                                    ? true
                                    : false
                                }
                              />
                            </td>
                            <td {...provider.dragHandleProps}>{index + 1}</td>
                            <td {...provider.dragHandleProps}>{data.rcmTypNm}</td>
                            <td {...provider.dragHandleProps}>{data.prgmTypCd}</td>
                            <td {...provider.dragHandleProps}>{data.paperId}</td>
                            <td {...provider.dragHandleProps}>
                              <select
                                name="useStsCd"
                                onChange={(e) => {
                                  handleUseSelect(e, data.crcmPrgmNo);
                                }}
                                value={data.useStsCd}
                              >
                                <option value={"사용"}>사용</option>
                                <option value={"미사용"}>미사용</option>
                                <option value={"검수"}>검수</option>
                              </select>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provider.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
          </DragDropContext>

          <div className="cpnt_btns">
              <button type="button" onClick={handleButtonClick}>적용</button>
              <button type="button" onClick={handleDelete}>삭제</button>
              <button type="button" className="sb af-r">등록</button>
          </div>
        </div>

        <ConfirmDialog
          title={`confirm dialog`}
          open={isOpenConfirm}
          setOpen={setOpenConfirm}
          onConfirm={handleApply}
        >
          <div>
            커리큘럼 스케쥴을 적용하겠습니까? 단, 이미 생성된 커리큘럼이 있는
            프로필은 즉시 적용되지 않으며 다음날 커리큘럼 생성 시 적용 및 확인이
            가능합니다.
          </div>
        </ConfirmDialog>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      
    </>
  );
};

export default CurriculumOrg;
