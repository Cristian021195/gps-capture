import { Button } from "konsta/react"

interface IProps {
    className?:string,
    ciudades:string[]|undefined,
    selected:number[], 
    onChange: (value: number[]) => void
}

export const SegmentedChoiceButton = ({className, ciudades, selected, onChange}:IProps) => {
    const toggle = (index: number) => {
        if (selected.includes(index)) {
        onChange(selected.filter(i => i !== index));
        return;
        }

        if (selected.length < 2) {
        onChange([...selected, index]);
        }
    };

    return <div className={"flex gap-1 overflow-y-scroll no-scrollbar "+className}>
      {
        ciudades?.map((label, i) => {
          const order = selected.indexOf(i); // -1 si no está seleccionado
          const isSelected = order !== -1;

          let style = "";

          if (order === 0) style = "bg-[#31685e]! text-white";
          if (order === 1) style = "bg-[#4a7d73]! text-white";

          return (
            <Button
              key={i}
              type="button"
              small
              onClick={() => toggle(i)}
              className={`segmented-btn k-btn-tonal whitespace-nowrap ${style}`}
            >
              {isSelected && (
                <span>({order + 1})</span>
              )}
              &nbsp;
              {label}
            </Button>
          );
        })
      }
    </div>
}