import { Button } from "antd";

type FeedbackButtonsProps = {
  onClick: (response: string) => void;
};

export const FeedbackButtons = ({ onClick }: FeedbackButtonsProps) => {
  const options = [
    "Obraz A",
    "Oba jakościowo dobre",
    "Oba jakościowe złe",
    "Obraz B",
  ];

  const errorOptions = [
    "A nie załadowało się",
    "B nie załadowało się",
    "Oba nie załadowały się",
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2 ml-1 flex flex-row justify-center">
          Odpowiedzi dotyczące jakości
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {options.map((label) => (
            <Button
              key={label}
              onClick={() => onClick(label)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 ml-1 text-center">
          Problemy z załadowaniem
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {errorOptions.map((label) => (
            <Button
              key={label}
              onClick={() => onClick(label)}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
