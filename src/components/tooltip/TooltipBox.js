import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';


const TooltipBox = (props) => {
    const { title, option, children } = props;
    return (
      <Tooltip className="" title={title} arrow placement={option? option:'bottom'}>
        <span className="cpnt_tooltip targetBox">{children}</span>
      </Tooltip>
    );
  };

  export default TooltipBox;

  // <div role="tooltip" class="MuiTooltip-popper MuiTooltip-popperArrow" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(912px, 179px, 0px);" x-placement="top">
  // <div class="MuiTooltip-tooltip MuiTooltip-tooltipPlacementTop MuiTooltip-tooltipArrow" style="opacity: 0; transform: scale(0.75, 0.5625); transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 133ms cubic-bezier(0.4, 0, 0.2, 1) 67ms;">클릭 시 등록된 상세내용을 확인 하실 수 잇습니다.
  // <span class="MuiTooltip-arrow" style="left: 111px;"></span>
  // </div>
  // </div>


  // <div role="tooltip" id="mui-437" class="MuiTooltip-popper MuiTooltip-popperInteractive css-rzl79t" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(881px, 1500px);" data-popper-placement="bottom">
  // <div class="MuiTooltip-tooltip MuiTooltip-tooltipPlacementBottom css-1spb1s5" style="opacity: 0; transform: scale(0.75, 0.5625); transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 133ms cubic-bezier(0.4, 0, 0.2, 1) 67ms;">
  // <p class="MuiTypography-root MuiTypography-body1 css-1ikde92">Tooltip with HTML</p><em>And here's</em> <b>some</b> <u>amazing content</u>. It's very engaging. Right?</div></div>