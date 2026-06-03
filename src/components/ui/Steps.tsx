import { useIntl } from "react-intl";

interface IStep {
  label?: string
};

interface IStartingStepsProps {
  steps: IStep[],
  currentStep: number // índice basado en 0
};

export const Steps = ({ steps, currentStep = 0 }: IStartingStepsProps) => {
  const {formatMessage:tr} = useIntl();

  return (
    <div className="grid text-center text-sm pb-2" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>            
      {steps.map((_, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center ">
            
            <div
              className={`h-1 w-full transition-all duration-300 ${
                index === 0
                  ? "bg-transparent"
                  : isCompleted
                  ? "bg-hb-3"
                  : "bg-gray-200"
              }`}
            />

            <div>
              <span
                className={`rounded-full px-2 text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-hb-3 text-white"
                    : isCompleted
                    ? "bg-hb-2 text-white"
                    : "bg-gray-200 dark:text-[#32685E]"
                }`}
              >
                {index + 1}
              </span>
            </div>

            <div
              className={`h-1 w-full transition-all duration-300 ${
                index === steps.length - 1
                  ? "bg-transparent"
                  : isCompleted
                  ? "bg-hb-3"
                  : "bg-gray-200"
              }`}
            />
          </div>
        );
      })}

      {steps.map((step, index) => (
        <div key={index}>{tr({id:step.label})}</div>
      ))}
    </div>
  );
}