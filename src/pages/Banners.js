import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useToast } from "../components/hooks";
import { List } from "immutable";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import moment from "moment";

const Banners = () => {
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

  // const API = axios.create({
  //   baseURL: "http://localhost:7074/kids-lms-parents/",
  // });

  // const [data, setData] = useState([]);

  // const getData = async () => {
  //   await API.get("/api/v1/lms/admin/banners").then((res) => {
  //     setData(res.data.data);
  //   });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const [dateConfirm, setDateConfirm] = useState(false);

  const handleUseSelect = useCallback((e, key, date) => {
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
    setData(newArr);
  });

  const [checkItems, setCheckItems] = useState([]);

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

  const { showToast } = useToast();
  const [updateConfirm, setUpdateConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleUpdateClick = useCallback(() => {
    showToast(`<strong>등록이 완료되었습니다.</strong><br>`, `success`);
  }, [showToast]);

  const handleDeleteClick = useCallback(() => {
    showToast(`<strong>삭제되었습니다.</strong><br>`, `success`);
  }, [showToast]);

  const handleButtonUpdate = useCallback(() => {
    setUpdateConfirm(true);
  }, [setUpdateConfirm]);

  const handleButtonDelete = useCallback(() => {
    setDeleteConfirm(true);
  }, [setDeleteConfirm]);

  const openPopUp = useCallback(() => {
    alert("등록 팝업");
  }, []);

  return (
    <>
      <table border="1">
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
          {data?.map((data, index) => (
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

      <Grid container item>
        <Button
          variant="contained"
          color="success"
          onClick={handleButtonUpdate}
        >
          적용
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleButtonDelete}
        >
          삭제
        </Button>

        <Button variant="contained" color="success" onClick={openPopUp}>
          등록
        </Button>
      </Grid>

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

      <Dialog
        open={dateConfirm}
        onClose={() => setDateConfirm(false)}
        aria-labelledby="confirm-dialog"
      >
        <DialogContent>
          <div>게시 기간을 확인해주세요.</div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDateConfirm(false)}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Banners;
