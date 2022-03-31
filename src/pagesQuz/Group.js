import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import CurriculumOrgDetail from "./CurriculumOrgDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import TooltipText from "../components/tooltip/TooltipText";
const QuzGroup = () => {
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
                <th>1</th>
                <th>
                  <TooltipText title="클릭 시 등록된 상세내용을 확인 하실 수 잇습니다.">
                    순서
                  </TooltipText>
                </th>
                <th>추천유형명</th>
                <th>타입</th>
                <th>추천코드/편성정보</th>
                <th>
                  <TooltipText title="사용여부 설정 후 하단의 적용버튼을 클릭하여야 적용이 됩니다.">
                    사용여부
                  </TooltipText>
                </th>
              </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                    <input type={"checkbox"} />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                    <select>
                        <option value={"사용"}>사용</option>
                        <option value={"미사용"}>미사용</option>
                        <option value={"검수"}>검수</option>
                    </select>
                    </td>
                </tr>
            </tbody>
        </table>


        <div className="cpnt_btns">
          <button type="button">
            <DeleteOutlineIcon /> 삭제
          </button>
          <button type="button" onClick={handleApplyButton}>
            <PlaylistAddCheckIcon /> 적용
          </button>
          <button type="button" className="sb af-r">
            <AddIcon /> 등록
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

export default QuzGroup;
