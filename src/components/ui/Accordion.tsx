interface IProps {
    opn:boolean,
    children: React.ReactNode,
    css?:string
}
export const Accordion = ({opn, children, css="py-2"}:IProps) => {
  return (
    <div className={css}>
      <div
        className={` grid overflow-hidden transition-all duration-400 ease-in-out text-sm ${
            opn
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
            {children}
        </div>
      </div>
    </div>
  );
};