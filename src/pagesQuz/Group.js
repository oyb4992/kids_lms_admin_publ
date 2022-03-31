import { useCallback, useEffect, useState } from "react";
import { useToast } from "../components/hooks";
import ConfirmDialog from "../components/confirmDialog/ConfirmDialog";
// import CurriculumOrgDetail from "./CurriculumOrgDetail";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageviewIcon from '@mui/icons-material/Pageview';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TooltipText from "../components/tooltip/TooltipText";
import TooltipBox from "../components/tooltip/TooltipBox";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { useForm } from "react-hook-form";
const QuzGroup = () => {
  const { showToast } = useToast();

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
    (data) => {
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

  //다이알로그 페이지 3
  const [isQuzContent, setQuzContent] = useState(false);
  const handleOpensetQuzContent = useCallback(() => {
    setQuzContent(true);
  }, [setQuzContent]);

  const [imgBase64, setImgBase64, imgBase642, setImgBase642] = useState([]);
  const [imgFile, setImgFile, imgFile2, setImgFile2] = useState(null);

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

  const handleChangeFile2 = (e) => {
    setImgFile2(e.target.files);
    setImgBase642([]);

    if (e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base642 = reader.result;
        if (base642) {
          var base64Sub2 = base642.toString();
          setImgBase642((imgBase642) => [...imgBase642, base64Sub2]);
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

  const handleResetFile2 = (e) => { // 파일 이미지 삭제
    setImgBase642((imgBase642) => []);
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[0].value = "";
    e.target.parentNode.parentNode.parentNode.nextElementSibling.childNodes[1].value = "";
  };

  return (
    <>
      <div className="cpnt_pageSearch">
        <div className="field-wrap cid-center">
          <select>
              <option value={`전체`}>전체</option>
              <option value={`퀴즈콘텐츠 번호`}>퀴즈콘텐츠 번호</option>
              <option value={`퀴즈콘텐츠 명`}>퀴즈콘텐츠 명</option>
          </select>
          <input type="search" name="search" />
          <button type="button"><SearchIcon /> 검색</button>
        </div>
      </div>
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
              <th>퀴즈그룹 번호</th>
              <th>
                <TooltipText title="클릭 시 등록된 '퀴즈그룹 상세'를 확인 하실 수 잇습니다.">퀴즈그룹 명</TooltipText>
              </th>
              <th>퀴즈그룹 문항 수</th>
              <th>편성 현황</th>
              <th>퀴즈그룹 낸 퀴즈콘텐츠 목록</th>
              <th>퀴즈그룹 내 퀴즈 콘텐츠 추가</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td><input type={"checkbox"} /></td>
                  <td>200006</td>
                  <td>퀴즈그룹6</td>
                  <td>50</td>
                  <td>
                    <TooltipBox title={
                      <div className="cpnt_tooltip_inner">
                        <strong>[편성 현황]</strong>
                        <p>과학 &#62; 동물</p>
                        <p>과학 &#62; 동물 &#62; 다양한 동물</p>
                        <p>수학 &#62; 숫자와 도형 &#62; 구구단</p>
                      </div>
                    }>
                      <button className="field-button list" type="button"> <VisibilityIcon /> 편성 리스트</button>
                    </TooltipBox>
                  </td>
                  <td><button className="field-button detail" type="button"><PageviewIcon /> 상세보기</button></td>
                  <td><button className="field-button add" type="button" onClick={handleOpenGroupContent}>추가</button></td>
              </tr>
              <tr>
              <td><input type={"checkbox"} /></td>
                  <td>200005</td>
                  <td>퀴즈그룹5</td>
                  <td>100</td>
                  <td>
                    <TooltipBox title={
                      <div className="cpnt_tooltip_inner">
                        <strong>[편성 현황]</strong>
                        <p>편성 정보가 없습니다.</p>
                      </div>
                    }>
                      <button className="field-button list" type="button"> <VisibilityIcon /> 편성 리스트</button>
                    </TooltipBox>
                  </td>
                  <td><button className="field-button detail" type="button"><PageviewIcon /> 상세보기</button></td>
                  <td><button className="field-button add" type="button" onClick={handleOpenGroupContent}>추가</button></td>
              </tr>
              <tr>
                  <td><input type={"checkbox"} /></td>
                  <td>200004</td>
                  <td>퀴즈그룹4</td>
                  <td>230</td>
                  <td>
                    <TooltipBox title={
                      <div className="cpnt_tooltip_inner">
                        <strong>[편성 현황]</strong>
                        <p>편성 정보가 없습니다.</p>
                      </div>
                    }>
                      <button className="field-button list" type="button"> <VisibilityIcon /> 편성 리스트</button>
                    </TooltipBox>
                  </td>
                  <td><button className="field-button detail" type="button"><PageviewIcon /> 상세보기</button></td>
                  <td><button className="field-button add" type="button" onClick={handleOpenGroupContent}>추가</button></td>
              </tr>
          </tbody>
        </table>


        <div className="cpnt_btns">
          <button type="button" onClick={handleDeleteButton}>
            <DeleteOutlineIcon /> 삭제
          </button>
          <button type="button" onClick={handleApplyButton}>
            <SimCardDownloadIcon /> 엑셀 다운로드
          </button>
          <button type="button" className="sb af-r" onClick={handleOpenPopUp}>
            <AddIcon /> 퀴즈그룹 등록
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={isOpenDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onConfirm={handleDeleteButton}
      >
        <p>
          {`삭제하시겠습니까?`}
          <br />
          {`삭제 후 복구가 불가능합니다.`}
        </p>
      </ConfirmDialog>

      <ConfirmDialog
        open={isOpenApplyConfirm}
        setOpen={setOpenApplyConfirm}
        onConfirm={handleApplyButton}
      >
        <p>
          {`엑셀 다운로드를 시작합니다.`}
        </p>
      </ConfirmDialog>

      <PopupDialog
        open={insertConfirm}
        setOpen={setInsertConfirm}
        title={`퀴즈그룹 등록`}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>

          <div className="cpnt_dlForm">
            <h2 className="title dp-blind">퀴즈 그룹</h2>
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>퀴즈그룹 명</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>퀴즈그룹 설명</span></dt>
                <dd>
                  <div className="field-wrap">
                    <textarea rows={`6`} required />
                  </div>
                  <div className="text-help"><p>※ 최대 500자 입력 가능 (고객 노출영역 아니며 운영자 메모용도)</p></div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>퀴즈그룹 키워드</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required />
                  </div>
                  <div className="text-help"><p>※ 콤마( , )로 구분하여 입력가능</p></div>
                </dd>
              </div>        
            </dl>
          </div>
        </form>
      </PopupDialog>

      <PopupDialog
        open={isGroupContent}
        setOpen={setGroupContent}
        title={`퀴즈그룹 내 퀴즈콘텐츠 추가 :: 퀴즈그룹6 (200006)`}
        onSubmit={handleOpenGroupContent}
      >
        <form>
          <div className="cpnt_pageSearch">
            <div className="field-wrap cid-center">
              <select>
                <option value={`전체`}>전체</option>
                <option value={`퀴즈콘텐츠 번호`}>퀴즈콘텐츠 번호</option>
                <option value={`퀴즈콘텐츠 명`}>퀴즈콘텐츠 명</option>
              </select>
              <input type="search" name="search" />
              <button type="button"><SearchIcon /> 검색</button>
            </div>
          </div>

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
              <th rowSpan={2}><input name="checkAll" type={"checkbox"} /></th>
              <th rowSpan={2}>퀴즈콘텐츠 번호</th>
              <th rowSpan={2}>
                <TooltipText title="클릭 시 등록된 '퀴즈콘텐츠 상세'를 확인 하실 수 잇습니다.">퀴즈콘텐츠 명</TooltipText>
              </th>
              <th rowSpan={2}>퀴즈그룹 명</th>
              <th rowSpan={2}>난이도</th>
              <th rowSpan={2}>퀴즈유형</th>
              <th colSpan={2}>문제</th>
              <th colSpan={2}>보기</th>
              <th rowSpan={2}>사용여부</th>
              <th rowSpan={2}>등록일 (최종수정일)</th>
            </tr>
            <tr>
              <th>텍스트</th>
              <th>이미지</th>
              <th>텍스트</th>
              <th>이미지</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td><input type={"checkbox"} /></td>
                  <td>200006</td>
                  <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>낙타</button></td>
                  <td>퀴즈그룹6</td>
                  <td>1레벨</td>
                  <td>OX형</td>
                  <td>O</td>
                  <td></td>
                  <td>O</td>
                  <td></td>
                  <td>비노출</td>
                  <td>2021.02.10. 14:22:33</td>
              </tr>
              <tr>
                  <td><input type={"checkbox"} /></td>
                  <td>200005</td>
                  <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>염소</button></td>
                  <td>퀴즈그룹1 외4개</td>
                  <td>2레벨</td>
                  <td>다지선다형</td>
                  <td></td>
                  <td>O</td>
                  <td>O</td>
                  <td></td>
                  <td>검수</td>
                  <td>2021.02.09. 14:22:33</td>
              </tr>
              <tr>
                  <td><input type={"checkbox"} /></td>
                  <td>200004</td>
                  <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>당나귀</button></td>
                  <td>퀴즈그룹6</td>
                  <td>3레벨</td>
                  <td>OX형</td>
                  <td>O</td>
                  <td></td>
                  <td></td>
                  <td>O</td>
                  <td>노출</td>
                  <td>2021.02.07. 14:22:33</td>
              </tr>
          </tbody>
        </table>
      </div>

          {/* <div className="cpnt_dlForm">
            <h2 className="title dp-blind">퀴즈그룹 내 퀴즈콘텐츠 리스트</h2>
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>카테고리 분류</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="radio" name="sort" id="sort1" required /><label htmlFor="sort1">대분류</label>
                    <input type="radio" name="sort" id="sort2" required defaultChecked /><label htmlFor="sort2">중분류</label>
                    <input type="radio" name="sort" id="sort3" required /><label htmlFor="sort3">소분류</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 명</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 설명</span></dt>
                <dd>
                  <div className="field-wrap">
                    <textarea rows={`3`} required />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>상용 노출 여부</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="radio" name="expose" id="expose1" required defaultChecked /><label htmlFor="expose1">비노출</label>
                    <input type="radio" name="expose" id="expose2" required /><label htmlFor="expose2">검수</label>
                    <input type="radio" name="expose" id="expose3" required /><label htmlFor="expose3">비노출</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>대상 플랫폼</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="checkbox" name="platform1" id="platform1" required defaultChecked /><label htmlFor="platform1">공통</label>
                    <input type="checkbox" name="platform2" id="platform2" disabled /><label htmlFor="platform2">IPTV</label>
                    <input type="checkbox" name="platform3" id="platform3" disabled /><label htmlFor="platform3">모바일</label>
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>배너 이미지</span></dt>
                <dd>
                    {imgBase64.map((item) => {
                      return (
                        <div key="1" className="field-input-file-img"><span key="3">
                          <img
                            key="0"
                            src={item}
                            alt="선택한 이미지"
                          />
                          <button key="2" type="button" onClick={handleResetFile2}><CloseIcon /> 이미지삭제</button>
                        </span></div>
                        )
                      }
                    )}
                  <div className="field-wrap">
                    <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile2} required />
                    <input type="text" required />
                    <button type="button" onClick={handleClickFile}>파일선택</button>
                  </div>
                  <div className="text-help"><p>※ size 000x000/ jpg,png/ 최대 0MB 업로드 권장</p></div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 키워드</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required />
                  </div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>카테고리 타입</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="radio" name="type" id="type1" required defaultChecked /><label htmlFor="type1">일반타입</label>
                    <input type="radio" name="type" id="type2" required /><label htmlFor="type2">숨김타입</label>
                  </div>
                </dd>
              </div>
            </dl>
          </div> */}
        </form>
      </PopupDialog>

      <PopupDialog
        open={isQuzContent}
        setOpen={setQuzContent}
        title={`오늘의 퀴즈 등록`}
        onSubmit={handleOpensetQuzContent}
      >
        <form>
          <div className="cpnt_pageSearch">
            <div className="field-wrap cid-center">
              <select className="fm">
                <option value={`전체`}>전체</option>
                <option value={`카테고리 아이디`}>카테고리 아이디</option>
                <option value={`카테고리 명`}>카테고리 명</option>
              </select>
              <input type="search" name="search" />
              <button type="button"><SearchIcon /> 검색</button>
            </div>
          </div>
          <div className="cpnt_table">
            <table className="table-default">
              <caption>
                <h2 className="title">중분류 카테고리 목록 선택</h2>
              </caption>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>카테고리 아이디</th>
                  <th>카테고리 명</th>
                  <th>대분류</th>
                  <th>제공 문항수</th>
                  <th>숨김타입 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td><input className="field-input" type="radio" name="categoryId" /></td>
                    <td>100001</td>
                    <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>동물</button></td>
                    <td>과학</td>
                    <td>50</td>
                    <td className="text-pit">N</td>
                </tr>
                <tr>
                    <td><input className="field-input" type="radio" name="categoryId" /></td>
                    <td>100002</td>
                    <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>식물</button></td>
                    <td>과학</td>
                    <td>100</td>
                    <td className="text-pit">Y</td>
                </tr>
                <tr>
                    <td><input className="field-input" type="radio" name="categoryId" /></td>
                    <td>100003</td>
                    <td><button className="text-link" type="button" onClick={handleOpensetQuzContent}>첨단과학과 태양계</button></td>
                    <td>과학</td>
                    <td>230</td>
                    <td className="text-pit">N</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cpnt_dlForm mg-t30">
            <h2 className="title">오늘의 퀴즈 등록</h2>
            <div className="cpnt_btns pst-right-top">
              <button type="button" className="sb af-r">
                <AddIcon /> 등록
              </button>
            </div>
            <dl className="dlForm-default">
              <div className="tr">
                <dt className="required"><span>오늘의 퀴즈 주제</span></dt>
                <dd>
                  <div className="field-wrap">
                    <input type="text" required />
                  </div>
                  <div className="text-help"><p>※ 최대 30자 입력 가능/ 오늘의 퀴즈 용도로 수정 가능하며, 카테고리 메뉴와 별도 저장</p></div>
                </dd>
              </div>
              <div className="tr">
                <dt className="required"><span>오늘의 퀴즈 소개 문구</span></dt>
                <dd>
                  <div className="field-wrap">
                    <textarea rows={`3`} required />
                  </div>
                  <div className="text-help"><p>※ 최대 500자 입력가능/ 오늘의 퀴즈 용도로 수정 가능하며, 카테고리 메뉴와 별도 저장</p></div>
                </dd>
              </div>
              {/* <div className="tr">
                <dt className="required"><span>오늘의 퀴즈 소개</span></dt>
                <dd>
                  <div className="field-wrap cid-auto cid-range">
                    <input />
                    ~
                    <input />
                  </div>
                </dd>
              </div> */}
              <div className="tr">
                <dt className="required"><span>배너 이미지</span></dt>
                <dd>
                    {/* {imgBase64.map((item) => {
                      return (
                        <div key="1" className="field-input-file-img"><span key="3">
                          <img
                            key="0"
                            src={item}
                            alt="선택한 이미지"
                          />
                          <button key="2" type="button" onClick={handleResetFile}><CloseIcon /> 이미지삭제</button>
                        </span></div>
                        )
                      }
                    )} */}
                  <div className="field-wrap">
                    <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile} required />
                    <input type="text" required />
                    <button type="button" onClick={handleClickFile}>파일선택</button>
                  </div>
                  <div className="text-help"><p>※ size 000x000/ jpg,png/ 최대 0MB 업로드 권장</p></div>
                </dd>
              </div>
              {/* <div className="tr">
                <dt className="required"><span>배너랜딩 유형</span></dt>
                <dd>
                  <div className="field-wrap cid-auto">
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
                  </div>
                </dd>
              </div> */}
        
            </dl>
          </div>
        </form>
      </PopupDialog>
      
      
    </>
  );
};

export default QuzGroup;
