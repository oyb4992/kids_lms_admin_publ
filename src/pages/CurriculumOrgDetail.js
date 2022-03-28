import { useCallback, useState } from "react";
import PopupDialog from "../components/popupDialog/PopupDialog";
import { Tab, Tabs } from "@mui/material";
import { useForm } from "react-hook-form";
const CurriculumOrgDetail = (props) => {
  const { open, setOpen } = props;
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

  const [engTab, setEngTab] = useState(`step1`);

  const handleSetEngTab = useCallback(
    (e, newValue) => {
      setEngTab(newValue);
    },
    [setEngTab]
  );

  const { register, handleSubmit, watch } = useForm({
    defaultValues: defaultValues,
  });
  const onSubmit = (data) =>
    console.log({
      prgmNum: 12301,
      ...watch(),
    });

  const getStepData = (step) => {
    return (
      <table>
        <tbody>
          {watch(step).map((data, index) => (
            <tr key={step + data.odnum}>
              <td>{data.odnum + `차수`}</td>
              <td>
                <input
                  name={`${step}[${index}].albumId`}
                  type={`text`}
                  defaultValue={data.albumId}
                  {...register(`${step}[${index}].albumId`)}
                  //   ref={...register(`${step}[${index}]`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <PopupDialog open={open} setOpen={setOpen} title={`커리큘럼 등록`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <tbody>
              <tr>
                <td>{`추천유형명 *`}</td>
                <td>
                  <input
                    type="text"
                    placeholder="rcmTypNm"
                    {...register("rcmTypNm", {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </td>
              </tr>

              <tr>
                <td>{`타입 *`}</td>
                <td>
                  추천
                  <input
                    {...register("prgmTypCd", { required: true })}
                    type="radio"
                    value="추천"
                  />
                  영어유치원
                  <input
                    {...register("prgmTypCd", { required: true })}
                    type="radio"
                    value="영어유치원"
                  />
                </td>
              </tr>
              {watch("prgmTypCd") === `추천` && (
                <tr>
                  <td>{`지면 데이터 *`}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="paperId"
                      {...register("paperId", { pattern: /,/i })}
                    />
                  </td>
                </tr>
              )}
              {watch("prgmTypCd") === `영어유치원` && (
                <tr>
                  <td>{`오늘의 영어 레벨 카테고리 설정`}</td>
                  <td>
                    <Tabs value={engTab} onChange={handleSetEngTab} centered>
                      <Tab value={`step1`} label="STEP 1" />
                      <Tab value={`step2`} label="STEP 2" />
                      <Tab value={`step3`} label="STEP 3" />
                      <Tab value={`step4`} label="STEP 4" />
                      <Tab value={`step5`} label="STEP 5" />
                      <Tab value={`step6`} label="STEP 6" />
                    </Tabs>
                    {getStepData(engTab)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <input type="submit" />
        </form>
      </PopupDialog>
    </>
  );
};

export default CurriculumOrgDetail;
