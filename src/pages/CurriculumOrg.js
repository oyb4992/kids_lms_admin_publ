import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { List } from "immutable";
import API from "../components/axios/api";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";

const CurriculumOrg = () => {
  const { showToast } = useToast();
  const [data, setData] = useState([]);
  const [checkItems, setCheckItems] = useState([]);

  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);

  const [isOpenDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteButton = useCallback(() => {
    setOpenDeleteConfirm(true);
  }, [setOpenDeleteConfirm]);

  const [selected, setSelected] = useState("아이진단 미완료");
  const handleSelectBox = useCallback(
    (e) => {
      setSelected(e.target.value);
    },
    [setSelected]
  );

  const getData = useCallback(async () => {
    await API.get(
      "/kids-lms-play/api/v1/lms/admin/curriculum-programming/containers",
      {
        params: {
          snrDvsCd: selected,
        },
      }
    ).then((res) => {
      console.log(res);
      setData(res.data.data);
    });
  }, [setData, selected]);

  const updateData = useCallback(
    async (data) => {
      await API.put("/api/v1/lms/admin/curriculum-programming/containers", data)
        .then((res) => {
          setCheckItems([]);
          showToast(`적용이 완료되었습니다.`, `success`);
        })
        .catch((err) => {
          showToast(`적용 실패하였습니다.`, `error`);
        });
    },
    [setCheckItems, showToast]
  );

  const deleteData = useCallback(
    async (data) => {
      console.log(data);
      await API.post(
        "/api/v1/lms/admin/curriculum-programming/containers/delete",
        data
      )
        .then((res) => {
          setCheckItems([]);
          getData();
          showToast(`삭제가 완료되었습니다`, `success`);
        })
        .catch((err) => {
          showToast(`삭제 실패하였습니다.`, `error`);
        });
    },
    [setCheckItems, showToast, getData]
  );
  useEffect(() => {
    getData();
  }, [getData, updateData, deleteData]);

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

  const handleDelete = useCallback(() => {
    const list = List(data);
    const checkedData = list
      .filter((i) => checkItems.includes(i.crcmPrgmNo))
      .toJS();
    const result = checkedData.map((data) => {
      return { crcmPrgmNo: data.crcmPrgmNo, prgmNum: data.prgmNum };
    });
    console.log(result);
    deleteData(result);
  }, [checkItems, data, deleteData]);
  return (
    <>
      <div className="cpnt_pageSearch Fms at-r">
        <select onChange={handleSelectBox} className="fm">
          <option value={`아이진단 미완료`}>아이진단 미완료</option>
          <option value={`온순한 기질`}>온순한 기질</option>
          <option value={`고집있는 기질`}>고집있는 기질</option>
          <option value={`변화무쌍한 기질`}>변화무쌍한 기질</option>
          <option value={`섬세한 기질`}>섬세한 기질</option>
        </select>
      </div>

      <div className="cpnt_table">
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className="table-default">
            <caption>
              <strong className="title">{selected}</strong>{" "}
              <span className="total">
                Total: <b>{data.length}</b>
              </span>
            </caption>
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
                        <tr
                          {...provider.draggableProps}
                          ref={provider.innerRef}
                          className={`  `}
                        >
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
                          <td {...provider.dragHandleProps}>
                            {data.prgmTypCd}
                          </td>
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
          <button type="button" onClick={handleApplyButton}>
            적용
          </button>
          <button type="button" onClick={handleDeleteButton}>
            삭제
          </button>
          <button type="button" className="sb af-r">
            등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApply}
      >
        <div>
          {`커리큘럼 스케쥴을 적용하겠습니까? 단, 이미 생성된 커리큘럼이 있는
          프로필은 즉시 적용되지 않으며 다음날 커리큘럼 생성 시 적용 및 확인이
          가능합니다.`}
        </div>
      </ConfirmDialog>

      <ConfirmDialog
        open={isOpenDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onConfirm={handleDelete}
      >
        <div>{`삭제하시겠습니까? 
        삭제 후 복구가 불가능합니다.`}</div>
      </ConfirmDialog>
    </>
  );
};

export default CurriculumOrg;
