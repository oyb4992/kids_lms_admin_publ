import { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import API from "../components/axios/api";

const CurriculumOrg = () => {
  const [data, setData] = useState([
    {
      crcmPrgmNo: 8000006,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 1,
      prgmTypCd: "영어유치원",
      rcmTypNm: "인트로ㅇㅇ",
      paperId: null,
      useStsCd: null,
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000007,
      snrDvsCd: "온순한 기질",
      prgmNum: 2,
      prgmTypCd: "추천",
      rcmTypNm: "인트로2",
      paperId: null,
      useStsCd: null,
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000014,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 3,
      prgmTypCd: "영어유치원",
      rcmTypNm: "인트로3",
      paperId: "M012564130PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000010,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 4,
      prgmTypCd: "추천",
      rcmTypNm: "인트로",
      paperId: "M011623130PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000011,
      snrDvsCd: "고집있는 기질",
      prgmNum: 5,
      prgmTypCd: "추천",
      rcmTypNm: "컨텐츠",
      paperId: "M01160030PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000012,
      snrDvsCd: "고집있는 기질",
      prgmNum: 6,
      prgmTypCd: "추천",
      rcmTypNm: "컨텐츠2",
      paperId: "M01160030PPV11",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
    {
      crcmPrgmNo: 8000013,
      snrDvsCd: "변화무쌍한 기질",
      prgmNum: 7,
      prgmTypCd: "추천",
      rcmTypNm: "인트로3",
      paperId: "M012564130PPV00",
      useStsCd: "미사용",
      regDtt: null,
      regrId: null,
      modDtt: null,
      modfId: null,
      engLvl: 0,
      odNum: 0,
      albumId: null,
      engData: null,
    },
  ]);
  //   const getData = useCallback(async () => {
  //     await API.get("/api/v1/lms/admin/curriculum-programming/containers").then(
  //       (res) => {
  //         setData(res.data.data);
  //       }
  //     );
  //   }, [setData]);

  //   useEffect(() => {
  //     getData();
  //   }, [getData]);

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
      console.log("tempdata");
      console.log(tempData);
      let [source_data] = tempData.splice(e.source.index, 1);
      console.log("source_data");
      console.log(source_data);
      tempData.splice(e.destination.index, 0, source_data);
      const min = Math.min(e.source.index, e.destination.index);
      const max = Math.max(e.source.index, e.destination.index);
      console.log("beforeChange");
      console.log(tempData);

      for (var i = min; i <= max; i++) {
        tempData[i].prgmNum = i + 1;
      }
      console.log(tempData);

      setData(tempData);
    },
    [data, setData]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <table border="1">
        <thead>
          <tr>
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
                    <tr {...provider.draggableProps} ref={provider.innerRef}>
                      <td {...provider.dragHandleProps}>{index + 1}</td>
                      <td {...provider.dragHandleProps}>{data.rcmTypNm}</td>
                      <td {...provider.dragHandleProps}>{data.prgmTypCd}</td>
                      <td {...provider.dragHandleProps}>{data.paperId}</td>
                      <td {...provider.dragHandleProps}>{data.useStsCd}</td>
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
  );
};

export default CurriculumOrg;
