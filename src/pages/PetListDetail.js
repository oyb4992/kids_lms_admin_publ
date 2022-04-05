import { useCallback, useState } from "react";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { Tab, Tabs } from "@mui/material";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

const PetListDetail = (props) => {
  const { open, setOpen } = props;

  //파일 추가 공통
  const [imgBase64, setImgBase64] = useState([]);
  const [imgFile, setImgFile] = useState(null);

  const handleClickFile = (e) => { // button 클릭으로 file파일 클릭 핸들러
    e.target.previousElementSibling.previousElementSibling.click();
  }

  //파일 추가 1
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
  
  const getDefaultEngData = () => {
    const stepDataArray = [];
    let maxOdnum = 60;
    for (let index = 0; index < maxOdnum; index++) {
      stepDataArray.push({
        odnum: index + 1,
        albumId: "",
      });
    }
    return stepDataArray;
  };
  //   const { open, setOpen } = useState(false);
  const defaultValues = {
    rcmTypNm: "",
    prgmTypCd: "",
    paperId: "",
    step1: getDefaultEngData(),
    step2: getDefaultEngData(),
    step3: getDefaultEngData(),
    step4: getDefaultEngData(),
    step5: getDefaultEngData(),
    step6: getDefaultEngData(),
  };

  const [stepTab, setSeptTab] = useState(`step1`);

  const handleSetSeptTab = useCallback(
    (e, newValue) => {
      setSeptTab(newValue);
    },
    [setSeptTab]
  );

  const getStepData = (step) => {
    return (
      <div className="cpnt_table">
        <table className="table-default">
          <caption className="dp-blind">단계별 리소스 등록  현황목록</caption>
          <colgroup>
            <col className="wt-pc20" />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th>상태{step}</th>
              <th>대표아이콘</th>
              <th>기본</th>
              <th>인터렉션</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button className="text-link" type="button">이사직전</button></td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr>
              <td><button className="text-link" type="button">배고픔</button></td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr>
              <td><button className="text-link" type="button">보통</button></td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr>
              <td><button className="text-link" type="button">행복</button></td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
            <tr>
              <td><button className="text-link" type="button">배부름</button></td>
              <td>X</td>
              <td>X</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>

        <table className="table-default mg-t10">
          <caption className="dp-blind">단계별 리소스 등록 현황목록 2</caption>
          <thead>
            <tr>
              <th>상태</th>
              <th>상호작용</th>
              <th>특수액션1</th>
              <th>특수액션2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button className="text-link" type="button">특수액션</button></td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
            </tr>
          </tbody>
        </table>

        <div className="cpnt_title type1 mg-t10">
          <strong>쿠키주기</strong>
        </div>
        <dl className="dlForm-default">
          <div className="tr">
            <dt><span>애니메이션</span></dt>
            <dd>
              {imgBase64.map((item) => {
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
              )}
              <div className="field-wrap">
                <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile} />
                <input type="text" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
              </div>
            </dd>
          </div>
          <div className="tr">
            <dt><span>음원</span></dt>
            <dd>
              <div className="audio-wrap">
                <audio className="audio-default" controls loop muted preload="">
                  <source src={ require('../assets/img/sample.mp3') } type="audio/mpeg" />
                </audio>
                <button type="button"><CloseIcon /> 이미지삭제</button>
              </div>
              <div className="field-wrap">
                <input type="file" name="bnrImgNo" id="bnrImgNo" />
                <input type="text" />
                <button type="button" onClick={handleClickFile}>파일선택</button>
              </div>
            </dd>
          </div>
        </dl>

      </div>
    );
  };

  const getStatus = (step) => {
    return (
      <>
        <div className="cpnt_dlForm">
          <h2 className="title">1단계 - 아사진적</h2>
          <dl className="dlForm-default">
            <div className="tr">
              <dt><span>대표 아이콘</span></dt>
              <dd>
                <div className="field-wrap">
                  <input type="text" required />
                </div>
              </dd>
            </div>
            <div className="tr">
              <dt><span>기본</span></dt>
              <dd>

                <div className="field-wrap isFull isBd">
                  <span className="inTd wt-pc30">애니메이션</span>
                  <div className="inTd isRow isLeft">
                    {imgBase64.map((item) => {
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
                    )}
                    <div className="field-wrap">
                      <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile} />
                      <input type="text" />
                      <button type="button" onClick={handleClickFile}>파일선택</button>
                    </div>
                  </div>
                </div>
                <div className="field-wrap isFull isBd mg-t0 bd-t0">
                  <span className="inTd wt-pc30">음원</span>
                  <div className="inTd isRow">
                    <div className="audio-wrap">
                      <audio className="audio-default" controls loop muted preload="">
                        <source src={ require('../assets/img/sample.mp3') } type="audio/mpeg" />
                      </audio>
                      <button type="button"><CloseIcon /> 이미지삭제</button>
                    </div>
                    <div className="field-wrap isCol">
                      <input type="file" name="bnrImgNo" id="bnrImgNo" />
                      <input type="text" />
                      <button type="button" onClick={handleClickFile}>파일선택</button>
                    </div>
                  </div>
                </div>
                
              </dd>
            </div>
            <div className="tr">
              <dt><span>인터렉션</span></dt>
              <dd>
                <div className="field-wrap af-r pd-t5">
                    <button className="field-button del" type="button"><DeleteOutlineIcon /> 삭제</button>
                    <button className="field-button add" type="button"><AddIcon /> 등록</button>
                </div>              
                <div className="field-wrap isFull isBd">
                  <span className="inTd wt-pc30">애니메이션</span>
                  <div className="inTd isRow isLeft">
                    {imgBase64.map((item) => {
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
                    )}
                    <div className="field-wrap">
                      <input type="file" name="bnrImgNo" id="bnrImgNo" onChange={handleChangeFile} />
                      <input type="text" />
                      <button type="button" onClick={handleClickFile}>파일선택</button>
                    </div>
                  </div>
                </div>
                <div className="field-wrap isFull isBd mg-t0 bd-t0">
                  <span className="inTd wt-pc30">음원</span>
                  <div className="inTd isRow">
                    <div className="audio-wrap">
                      <audio className="audio-default" controls loop muted preload="">
                        <source src={ require('../assets/img/sample.mp3') } type="audio/mpeg" />
                      </audio>
                      <button type="button"><CloseIcon /> 이미지삭제</button>
                    </div>
                    <div className="field-wrap isCol">
                      <input type="file" name="bnrImgNo" id="bnrImgNo" />
                      <input type="text" />
                      <button type="button" onClick={handleClickFile}>파일선택</button>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </>
    );
  };

  return (
    <>
      <PopupDialog open={open} setOpen={setOpen} title={`펫 등록`}>
        <form>
          <div className="layout_wrap">
            <div className="layout_item">

              <div className="cpnt_dlForm">
                <dl className="dlForm-default">
                  <div className="tr">
                    <dt className="required"><span>펫명</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <input type="text" required />
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt className="required"><span>펫소개</span></dt>
                    <dd>
                      <div className="field-wrap">
                        <textarea rows={3} required />
                      </div>
                    </dd>
                  </div>
                  <div className="tr">
                    <dt><span>리스트 등록</span></dt>
                    <dd>
                      <Tabs value={stepTab} onChange={handleSetSeptTab} centered className="cpnt_contsTab wp-div2">
                        <Tab value={`step1`} label="1단계" />
                        <Tab value={`step2`} label="2단계" />
                        <Tab value={`step3`} label="3단계" />
                        <Tab value={`step4`} label="4단계" />
                        <Tab value={`step5`} label="5단계" />
                      </Tabs>
                      {getStepData(stepTab)}
                      
                    </dd>
                  </div>
                </dl>
              </div>

            </div>
            <div className="layout_item isBd pd-20">
              
              {getStatus()}
              

            </div>
          </div>
          
          
          {/* <input type="submit" /> */}
        </form>
      </PopupDialog>
    </>
  );
};

export default PetListDetail;
