import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import CurriculumOrgDetail from "./CurriculumOrgDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import TooltipText from "../components/tooltip/TooltipText";
const QuzSchedule = () => {
  const { showToast } = useToast();
  const [isOpenApplyConfirm, setOpenApplyConfirm] = useState(false);
  const handleApplyButton = useCallback(() => {
    setOpenApplyConfirm(true);
  }, [setOpenApplyConfirm]);
  const handleApply = useCallback(() => {
    showToast(`적용이 완료되었습니다.`, `success`);
    setOpenApplyConfirm(false);
  }, [setOpenApplyConfirm, showToast]);

  return (
    <>
      <div className="cpnt_table">
          <table className="table-default">
            <caption>
              <strong className="title dp-blind">퀴즈백과 퀴즈그룹 관리 리스트</strong>
              <span className="total">
                {`Total: `}
                <b>3</b>
              </span>
            </caption>
            <thead>
              <tr>
                <th><input name="checkAll" type={"checkbox"} /></th>
                <th>No.</th>
                <th>
                  <TooltipText title="클릭 시 등록된 상세내용을 확인 하실 수 잇습니다.">중분류 카테고리</TooltipText>
                </th>
                <th>오늘의 퀴즈 주제</th>
                <th>오늘의 퀴즈 배너 이미지</th>
                <th>제공 문항수</th>
                <th>제공일</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>1</td>
                    <td>동물</td>
                    <td>물에서 사는 동룡 퀴즈</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>50</td>
                    <td>2022-02-09</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>2</td>
                    <td>식물</td>
                    <td>식물에 대해서</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>100</td>
                    <td>2022-02-10</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"} /></td>
                    <td>3</td>
                    <td>첨단과학과 태양계</td>
                    <td className="cid-event">물에서 사는 동룡 퀴즈</td>
                    <td className="cid-img"><img src={ require('../assets/img/sample_100.png') } /></td>
                    <td>230</td>
                    <td>2022-02-01</td>
                </tr>
            </tbody>
        </table>


        <div className="cpnt_btns">
          <button type="button">
            <DeleteOutlineIcon /> 삭제
          </button>
          <button type="button" onClick={handleApplyButton}>
            <PlaylistAddCheckIcon /> 순서변경 적용
          </button>
          <button type="button" className="sb af-r">
            <AddIcon /> 오늘의 퀴즈 등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApply}
      >
        <p>
          {`커리큘럼 설정을`}
          <br />
          {`적용하시겠습니까?`}
        </p>
      </ConfirmDialog>
    </>
  );
};

export default QuzSchedule;
