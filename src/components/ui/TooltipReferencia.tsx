import { useState } from "react";

interface IProps {
    descripcion:string,
    acronimo:string,
    open?:boolean
}

export const TooltipReferencia = ({ descripcion, acronimo, open=false }: IProps) => {
  const [showTooltip, setShowTooltip] = useState(open);

  return (
    <div className="tc">
      <button
        type="button"
        className="tooltip-btn align-middle"
        onClick={()=>{
          setShowTooltip((prev)=>!prev);
        }}
        onBlur={() => setShowTooltip(false)}
      >
        {acronimo}
      </button>

      {showTooltip && (
        <div
          className="tooltip flex justify-center"
        ><div className="tooltip-triangle"></div>
          <small>{descripcion}</small>
        </div>
      )}
    </div>
  );
};