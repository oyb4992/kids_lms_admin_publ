import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback } from "react";
const InteractField = (props) => {
  const { control, indexValue, watch, handleClickFile, handleChangeFile } =
    props;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: indexValue,
  });
  const handleAppendInteract = useCallback(() => {
    append({
      dspNum: fields.length + 1,
      img: { url: "", name: "", file: "" },
      sds: { url: "", name: "", file: "" },
    });
  }, [append, fields]);

  const handleRemoveInteract = useCallback(() => {
    if (fields.length > 1) {
      remove(fields.length - 1);
    } else {
      console.log("할수없음 ");
    }
  }, [remove, fields]);

  return (
    <>
      <div className="field-wrap af-r pd-t5">
        <button
          className="field-button del"
          type="button"
          onClick={handleRemoveInteract}
        >
          <DeleteOutlineIcon /> 삭제
        </button>
        <button
          type="button"
          className="field-button add"
          onClick={handleAppendInteract}
        >
          <AddIcon /> 등록
        </button>
      </div>
      {watch(`${indexValue}`).map((item, index) => {
        return (
          <div key={index}>
            <dl className="dlForm-default">
              <div className="tr">
                <dt>
                  <span>인터렉션</span>
                </dt>

                <dd>
                  {watch(`${indexValue}[${index}].img.url`) > `` && (
                    <div className="field-input-file-img">
                      <img
                        src={watch(`${indexValue}[${index}].img.url`)}
                        alt={watch(`${indexValue}[${index}].img.name`)}
                        width={`100 px`}
                        readOnly
                      />
                      <button type="button">
                        <CloseIcon /> 이미지삭제
                      </button>
                    </div>
                  )}

                  <div className="field-wrap isFull isBd">
                    <span className="inTd wt-pc30">애니메이션</span>
                    <div className="inTd isRow isLeft">
                      <div className="field-wrap">
                        <input
                          type="file"
                          // {...register(`${indexValue}[${index}].img.file`)}
                          onChange={(e) => {
                            handleChangeFile(e, `${indexValue}[${index}].img`);
                          }}
                        />
                        <input
                          type="text"
                          value={watch(`${indexValue}[${index}].img.name`)}
                          readOnly
                          // {...register(`${indexValue}[${index}].img.name`)}
                        />
                        <button type="button" onClick={handleClickFile}>
                          파일선택
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="field-wrap isFull isBd mg-t0 bd-t0">
                    <span className="inTd wt-pc30">음원</span>
                    <div className="inTd isRow">
                      {watch(`${indexValue}[${index}].sds.url`) > `` && (
                        <div className="audio-wrap">
                          <audio
                            className="audio-default"
                            controls
                            src={watch(`${indexValue}[${index}].sds.url`)}
                          ></audio>
                          <button type="button">이미지삭제</button>
                        </div>
                      )}
                      <div className="field-wrap isCol">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleChangeFile(e, `${indexValue}[${index}].sds`);
                          }}
                        />
                        <input
                          type="text"
                          value={watch(`${indexValue}[${index}].sds.name`)}
                          readOnly
                        />
                        <button type="button" onClick={handleClickFile}>
                          파일선택
                        </button>
                      </div>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        );
      })}
    </>
  );
};

export default InteractField;
