import { DialogContent } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import API from "../components/axios/api";
import { useToast } from "../components/hooks";
import { List } from "immutable";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
import moment from "moment";
import "moment/locale/ko";
import TextField from "@mui/material/TextField";
import WarningDialog from "../components/warningDialog/WarningDialog";
import TooltipText from "../components/tooltip/TooltipText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useForm } from "react-hook-form";
import PopupDialog from "../components/popupDialog/PopupDialog";

const Banners = () => {
  const [data, setData] = useState([
    {
      bnrNo: 1,
      bnrNm: "테스트배너1",
      dspStartDtt: "2022. 03. 01 00:00",
      dspStopDtt: "2025. 03. 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드1",
      ladgDstVl: "랜딩식별값1",
      regDtt: "22022. 03. 01 00:00",
      regrID: "Admin001",
      modDtt: "2022. 03. 01 00:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 2,
      bnrNm: "테스트배너2",
      dspStartDtt: "2022. 03. 01 00:00",
      dspStopDtt: "2022. 03. 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드2",
      ladgDstVl: "랜딩식별값2",
      regDtt: "2022. 03. 01 00:00",
      regrID: "Admin001",
      modDtt: "2022. 03. 01 00:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 3,
      bnrNm: "테스트배너3",
      dspStartDtt: "2022. 03. 01 00:00",
      dspStopDtt: "2025. 03. 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드3",
      ladgDstVl: "랜딩식별값3",
      regDtt: "2022. 03. 01 00:00",
      regrID: "Admin003",
      modDtt: "2022. 03. 01 00:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 4,
      bnrNm: "테스트배너4",
      dspStartDtt: "2022. 03. 01 0:00",
      dspStopDtt: "2022. 03. 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드4",
      ladgDstVl: "랜딩식별값4",
      regDtt: "2022. 03. 01 00:00",
      regrID: "Admin001",
      modDtt: "2022. 03. 01 00:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
    {
      bnrNo: 5,
      bnrNm: "테스트배너5",
      dspStartDtt: "2022. 03. 01 00:00",
      dspStopDtt: "2025. 03. 02 23:59",
      bnrImgNo: null,
      ladgDvsCd: "랜딩구분코드5",
      ladgDstVl: "랜딩식별값5",
      regDtt: "2022. 03. 01 00:00",
      regrID: "Admin001",
      modDtt: "2022. 03. 01 00:00",
      modfId: "Admin001",
      useStsCd: "사용",
    },
  ]);

  const { showToast } = useToast();
  // const [data, setData] = useState([]);
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

  const [insertConfirm, setInsertConfirm] = useState(false);
  const handleOpenPopUp = useCallback(() => {
    setInsertConfirm(true);
  }, [setInsertConfirm]);

  const nowDate = moment().format("YYYY-MM-DDTHH:mm");

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = useCallback(
    (data) => {
      showToast(
        "<strong>등록 완료</strong><br> 배너가 등록 되었습니다.",
        `success`
      );
      setInsertConfirm(false);
    },
    [showToast, setInsertConfirm]
  );

  const onInvalid = (errors) => console.log(errors);

  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

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
        }
      };
    }
  };

  // const getData = useCallback(async () => {
  //   await API.get("kids-lms-parents/api/v1/lms/admin/banners").then((res) => {
  //     setData(res.data.data);
  //     setTempData(res.data.data);
  //   });
  // }, [setData]);

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

          showToast(`<strong>삭제되었습니다.</strong><br>`, `success`);
        })
        .catch((err) => {
          showToast(`<strong>삭제 실패하였습니다.</strong><br>`, `error`);
        });
    },
    [setCheckItems, showToast]
  );

  useEffect(() => {}, [updateData, deleteData]);

  const handleUseSelect = useCallback(
    (e, key, date) => {
      const today = moment().format("YYYY. MM. DD HH:mm");
      const endDate = moment(date).format("YYYY. MM. DD HH:mm");

      if (e.target.value === "사용" && endDate < today) {
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

  const getRowColorFromUseSts = (useStsCd) => {
    let className;
    switch (useStsCd) {
      case `사용`:
        className = `enabled`;
        break;
      case `검수`:
        className = `validate`;
        break;
      case `미사용`:
        className = `disabled`;
        break;
      default:
        className = "default";
        break;
    }
    return className;
  };

  return (
    <>
      <div className="cpnt_table">
        <table className="table-default">
          <caption>
            <strong className="blind"></strong>
            <span className="total">
              Total: <b>{data.length}</b>
            </span>
          </caption>
          <thead>
            <tr key={data.bnrNo}>
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
              <th>
                <TooltipText title="사용여부 설정 후 하단의 적용버튼을 클릭하여야 적용이 됩니다.">
                  사용여부
                </TooltipText>
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((data) => (
              <tr
                key={data.bnrNo}
                className={getRowColorFromUseSts(data.useStsCd)}
              >
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
            <CheckCircleOutlineIcon />
            적용
          </button>
          <button type="button" onClick={handleButtonDelete}>
            <DeleteOutlineIcon />
            삭제
          </button>
          <button type="button" onClick={handleOpenPopUp} className="sb af-r">
            <AddCircleOutlineIcon />
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

      <WarningDialog open={dateConfirm} setOpen={setDateConfirm}>
        <DialogContent>
          <div>게시 기간을 확인해주세요.</div>
        </DialogContent>
      </WarningDialog>

      <PopupDialog
        open={insertConfirm}
        setOpen={setInsertConfirm}
        title={`배너 등록`}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <table className="table-default" border="1">
            <thead></thead>
            <tbody>
              <tr>
                <td>배너명</td>
                <td>
                  <input
                    {...register("bnrNm", { required: true, minLength: 2 })}
                  />
                </td>
              </tr>
              <tr>
                <td>게시기간</td>
                <td>
                  <TextField
                    id="startDate"
                    type="datetime-local"
                    defaultValue={nowDate}
                    sx={{ width: 160 }}
                    name="dspStartDtt"
                    {...register("dspStartDtt", {
                      required: true,
                    })}
                  />
                  ~
                  <TextField
                    id="endDate"
                    type="datetime-local"
                    defaultValue={nowDate}
                    sx={{ width: 160 }}
                    name="dspStopDtt"
                    {...register("dspStopDtt", {
                      required: true,
                    })}
                  />
                </td>
              </tr>
              <tr>
                <td>배너 이미지</td>
                <td>
                  {imgBase64.map((item) => {
                    return (
                      <img
                        key="0"
                        className="d-block w-100"
                        src={item}
                        alt="First slide"
                        style={{ width: "300px", height: "150px" }}
                      />
                    );
                  })}
                  <input
                    type="file"
                    name="bnrImgNo"
                    id="bnrImgNo"
                    onChange={handleChangeFile}
                  />
                </td>
              </tr>
              <tr>
                <td>배너랜딩 유형</td>
                <td>
                  <select
                    name="ladgDvsCd"
                    {...register("ladgDvsCd", { required: true })}
                  >
                    <option value={"선택"}>선택</option>
                    <option value={"메뉴(카테고리)랜딩"}>
                      메뉴(카테고리)랜딩
                    </option>
                    <option value={"아이들나라 홈"}>아이들나라 홈</option>
                    <option value={"대메뉴 랜딩"}>대메뉴 랜딩</option>
                    <option value={"서비스 랜딩"}>서비스 랜딩</option>
                    <option value={"콘텐츠 랜딩"}>콘텐츠 랜딩</option>
                  </select>
                  <input
                    name="ladgDstVl"
                    {...register("ladgDstVl", { required: true, minLength: 2 })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </PopupDialog>
    </>
  );
};

export default Banners;
