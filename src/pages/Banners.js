import { DialogContent } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import API from "../components/axios/api";
import { useToast } from "../components/hooks";
import { List } from "immutable";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import moment from "moment";
import WarningDialog from "../components/warningDialog/WarningDialog";

const Banners = () => {
  const { showToast } = useToast();
  const [data, setData] = useState([
    {
      bnrNo: 1,
      bnrNm: "테스트배너1",
      dspStartDtt: "2022, 03, 01 0:00",
      dspStopDtt: "2025, 03, 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드1",
      ladgDstVl: "랜딩식별값1",
      regDtt: "22022, 03, 01 0:00",
      regrID: "Admin001",
      modDtt: "2022, 03, 01 0:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 2,
      bnrNm: "테스트배너2",
      dspStartDtt: "2022, 03, 01 0:00",
      dspStopDtt: "2022, 03, 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드2",
      ladgDstVl: "랜딩식별값2",
      regDtt: "2022, 03, 01 0:00",
      regrID: "Admin001",
      modDtt: "2022, 03, 01 0:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 3,
      bnrNm: "테스트배너3",
      dspStartDtt: "2022, 03, 01 0:00",
      dspStopDtt: "2025, 03, 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드3",
      ladgDstVl: "랜딩식별값3",
      regDtt: "2022, 03, 01 0:00",
      regrID: "Admin003",
      modDtt: "2022, 03, 01 0:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 4,
      bnrNm: "테스트배너4",
      dspStartDtt: "2022, 03, 01 0:00",
      dspStopDtt: "2022, 03, 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드4",
      ladgDstVl: "랜딩식별값4",
      regDtt: "2022, 03, 01 0:00",
      regrID: "Admin001",
      modDtt: "2022, 03, 01 0:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 5,
      bnrNm: "테스트배너5",
      dspStartDtt: "2022, 03, 01 0:00",
      dspStopDtt: "2025, 03, 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드5",
      ladgDstVl: "랜딩식별값5",
      regDtt: "2022, 03, 01 0:00",
      regrID: "Admin001",
      modDtt: "2022, 03, 01 0:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
  ]);
  const [tempData, setTempData] = useState([]);
  const [checkItems, setCheckItems] = useState([]);

  const [updateConfirm, setUpdateConfirm] = useState(false);
  const handleButtonUpdate = useCallback(() => {
    setUpdateConfirm(true);
  }, [setUpdateConfirm]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const handleButtonDelete = useCallback(() => {
    setDeleteConfirm(true);
  }, [setDeleteConfirm]);

  const [dateConfirm, setDateConfirm] = useState(false);

  const getData = useCallback(async () => {
    await API.get("kids-lms-parents/api/v1/lms/admin/banners").then((res) => {
      setData(res.data.data);
      setTempData(res.data.data);
    });
  }, [setData]);

  const updateData = useCallback(
    async (data) => {
      await API.put("kids-lms-parents/api/v1/lms/admin/banners", data)
        .then((res) => {
          setCheckItems([]);
          showToast(`<strong>등록이 완료되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          showToast(`<strong>등록 실패하였습니다.</strong><br>`, `error`);
        });
    },
    [setCheckItems, showToast]
  );

  const deleteData = useCallback(
    async (checkItems) => {
      await API.post("kids-lms-parents/api/v1/lms/admin/banners", checkItems)
        .then((res) => {
          setCheckItems([]);
          getData();
          showToast(`<strong>삭제되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          showToast(`<strong>삭제 실패하였습니다.</strong><br>`, `error`);
        });
    },
    [setCheckItems, showToast, getData]
  );

  useEffect(() => {
    getData();
  }, [getData, updateData, deleteData]);

  const handleUseSelect = useCallback(
    (e, key, date) => {
      const today = moment().format("YYYY. MM. DD HH:mm");
      const endDate = moment(date).format("YYYY. MM. DD HH:mm");
      if (endDate < today) {
        setDateConfirm(true);
        return;
      }

      const selected = e.target.value;
      const list = List(data);
      const index = list.findIndex((i) => i.bnrNo === key);
      const newArr = list.update(index, (item) =>
        Object.assign({}, item, { useStsCd: selected })
      );
      setData(newArr.toJS());
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
        data.forEach((el) => idArray.push(el.bnrNo));

        setCheckItems(idArray);
      } else {
        setCheckItems([]);
      }
    },
    [data, setCheckItems]
  );

  const handleUpdateClick = useCallback(() => {
    var modData = [];

    data.map((item, index) => {
      if (item.useStsCd !== tempData[index].useStsCd) {
        modData.push({ bnrNo: item.bnrNo, useStsCd: item.useStsCd });
      }
      return modData;
    });

    if (modData.length === 0) {
      showToast(`<strong>적용할 데이터가 없습니다.</strong><br>`, `warning`);
      return;
    }

    updateData(modData);
  }, [showToast, data, tempData, updateData]);

  const handleDeleteClick = useCallback(() => {
    const list = List(data);
    const checkedData = list.filter((i) => checkItems.includes(i.bnrNo)).toJS();

    const result = checkedData.map((data) => {
      return { bnrNo: data.bnrNo };
    });

    if (result.length === 0) {
      showToast(`<strong>삭제할 데이터가 없습니다.</strong><br>`, `warning`);
      return;
    }

    deleteData(result);
  }, [showToast, data, checkItems, deleteData]);

  const openPopUp = useCallback(() => {
    alert("등록 팝업");
  });

  return (
    <>
      <div className="cpnt_table">
        <table className="table-default">
          <caption>
            <strong className="blind">커리큘럼 편성 테이블</strong>{" "}
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
              <th>배너명</th>
              <th>게시기간</th>
              <th>사용여부</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((data) => (
              <tr key={data.bnrNo}>
                <td>
                  <input
                    type={"checkbox"}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, data.bnrNo)
                    }
                    checked={checkItems.includes(data.bnrNo) ? true : false}
                  />
                </td>
                <td>{data.bnrNm}</td>
                <td>
                  {data.dspStartDtt} ~ {data.dspStopDtt}
                </td>
                <td>
                  <select
                    name="useStsCd"
                    onChange={(e) => {
                      handleUseSelect(e, data.bnrNo, data.dspStopDtt);
                    }}
                    value={data.useStsCd}
                  >
                    <option value={"사용"}>사용</option>
                    <option value={"미사용"}>미사용</option>
                    <option value={"검수"}>검수</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cpnt_btns">
          <button type="button" onClick={handleButtonUpdate}>
            적용
          </button>
          <button type="button" onClick={handleButtonDelete}>
            삭제
          </button>
          <button type="button" onClick={openPopUp} className="sb af-r">
            등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={updateConfirm}
        setOpen={setUpdateConfirm}
        onConfirm={handleUpdateClick}
      >
        <div>적용하시겠습니까?</div>
      </ConfirmDialog>

      <ConfirmDialog
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        onConfirm={handleDeleteClick}
      >
        <div>삭제하시겠습니까?</div>
      </ConfirmDialog>

      <WarningDialog
        open={dateConfirm}
        setOpen={setDateConfirm}
        onConfirm={false}
      >
        <div>게시 기간을 확인해주세요.</div>
      </WarningDialog>
    </>
  );
};

export default Banners;
