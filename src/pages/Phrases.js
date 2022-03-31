import "moment/locale/ko";

const Phrases = () => {
  return (
    <>
      <b>추천 유형별 문구</b>
      <div>
        <div>
          <div className="cpnt_btns">
            <button type="button">프로필</button>
            <button type="button">프로필</button>
            <button type="button">아이관심사1</button>
            <button type="button">아이관심사2</button>
            <button type="button">아이관심사3</button>
            <button type="button">부모관심사1</button>
            <button type="button">부모관심사2</button>
            <button type="button">부모관심사3</button>
            <button type="button">영어레벨</button>
          </div>
          <div className="cpnt_btns">
            <button type="button">진단</button>
            <button type="button">아이기질검사</button>
            <button type="button">다면적성검사</button>
            <button type="button">인지발달검사</button>
            <button type="button">6C</button>
          </div>
          <div className="cpnt_btns">
            <button type="button">콘텐츠</button>
            <button type="button">콘텐츠명</button>
            <button type="button">장르(대)</button>
            <button type="button">장르(중)</button>
            <button type="button">장르(소)</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Phrases;
