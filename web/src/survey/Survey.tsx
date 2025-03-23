import { useState, useEffect } from "react";
import { Button, Progress, Spin } from "antd";
import { Images } from "./components/Images";
import { FeedbackButtons } from "./components/FeedbackButtons";
import { SETTING, imageComparisons, settings } from "./utils/settings";

const comparisons = imageComparisons;

type ANSWER = {
  index: number;
  feedback: string;
  test: SETTING;
};

type REQUEST = {
  answers: ANSWER[];
  width: number;
  height: number;
  userAgent: string;
};

export const Survey = () => {
  const [current, setCurrent] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [answers, setAnswers] = useState<ANSWER[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState(false);
  const [isImageALoaded, setIsImageALoaded] = useState(false);
  const [isImageBLoaded, setIsImageBLoaded] = useState(false);

  const next = () => {
    setCurrent((prev) => prev + 1);
    setIsImageALoaded(false);
    setIsImageBLoaded(false);
  };

  const onFeedback = (feedback: string) => {
    setAnswers((prev) => [
      ...prev,
      { index: current, feedback, test: settings[current] },
    ]);
    next();
  };

  useEffect(() => {
    if (current >= comparisons.length && !submitted) {
      setLoading(true);
      setSubmitted(true); // prevent double submission
      // Simulate API call
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;

      const result: REQUEST = {
        answers,
        width,
        height,
        userAgent,
      };

      fetch(
        "https://3dcbqcwzxtfy6flkrot43kbeom0akwwk.lambda-url.eu-central-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-custom-header": "xyz",
          },
          body: JSON.stringify(result),
        }
      )
        .then((res) => {
          if (!res.ok) {
            setInfo(
              "Wystąpił błąd podczas wysyłania ankiety. Spróbuj ponownie."
            );
            setError(true);
          }
          setInfo("Dziękujemy za wypełnienie ankiety.");
        })
        .catch((err) => {
          setInfo("Wystąpił błąd podczas wysyłania ankiety. Spróbuj ponownie.");
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [current, answers, submitted]);

  if (showWelcome) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Witaj w ankiecie.</h1>

        <p className="mb-4 text-lg text-gray-700">
          Zostanie ci przedstawione około 30 par obrazów. Dla każdej pary proszę
          dokładnie przyjrzeć się obu obrazom i zdecydować, który wygląda lepiej
          pod względem jakości. Pamiętaj, że jesli wybor jest trudny - zawsze
          możesz wybrać opcję "oba jakościowo dobre" lub "oba jakościowo złe".
        </p>
        <p>
          <b>Ankieta zapisuje się dopiero po jej ukończeniu</b>
        </p>
        <p className="text-lg">
          <b>
            <ul>
              <li>W ankecie pojawiają się 3 typy obrazów.</li>
              <li>
                {" "}
                Jeśli nie widzisz różnic między nimi -{" "}
                <u>to dobrze, o to chodzi.</u> i zaznacz że nie widzisz różnicy
              </li>
              <li>
                Jeśli widzisz kolejny raz tą samą parę obrazów -{" "}
                <u> to też dobrze, bo o to chodzi</u>
              </li>
            </ul>
          </b>
        </p>

        <p className="text-left">
          <b>Instrukcja:</b>
        </p>
        <div className="text-left bg-gray-50 rounded-lg p-4 border mb-4">
          <p className="mb-2 font-semibold">Jak ocenić obrazy?</p>
          <p className="mb-2">
            Oceny dokonujemy poprzez <b>kliknięcie przycisku pod obrazami</b>.
          </p>
          <p className="mb-1">Dostępne opcje to:</p>
          <ul className="list-disc list-inside mb-2 text-gray-700">
            <li>Obraz A</li>
            <li>Obraz B</li>
            <li>Oba jakościowo dobre</li>
            <li>Oba jakościowo złe</li>
          </ul>
          <p className="mb-1">
            W przypadku problemów z załadowaniem obrazów, wybierz odpowiednią
            opcję:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>A nie załadował się</li>
            <li>B nie załadował się</li>
            <li>Oba nie załadowały się</li>
          </ul>
          <b className="my-1">
            Nie mozna cofać swojej decyzji. W jakimkolwiek przypadku, zacznij od
            nowa. Dziękuję.
          </b>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={() => setShowWelcome(false)}
          className="mt-4"
        >
          Rozpocznij ankietę
        </Button>

        <p className="text-left mt-5">
          <b>Informacja na temat przetwarzania danych:</b>
        </p>
        <div className="text-left bg-gray-50 rounded-lg p-4 border mb-4">
          <p className="mb-2 font-semibold">Kto zbiera twoje dane:</p>
          <p className="mb-2">Jakub Radzik spółka nieodpowiedzialna</p>
          <p className="mb-2 font-semibold">W jakim celu zbieram twoje dane:</p>
          <p className="mb-2">Do pracy magisterskiej</p>
          <p className="mb-2 font-semibold">Jakie dane zbieram:</p>
          <ul className="list-disc list-inside mb-2 text-gray-700">
            <li>Twoje odpowiedzi na pytania</li>
            <li>
              Wysokosc oraz szerokosc urządzenia na którym wypełniasz ankietę
            </li>
            <li>
              Techniczny opis twojej przeglądarki, czyli konkretnie to: <br />
              <b>{window.navigator.userAgent}</b>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (current >= comparisons.length) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        {!loading && !error && (
          <h1 className="text-3xl font-bold mb-4">Dziękujemy!</h1>
        )}
        <div className="text-lg text-gray-700 mb-4">
          {loading && <Spin />}
          {!loading &&
            (!error ? (
              info
            ) : (
              <p className="text-red-500">
                Wystąpił błąd podczas wysyłania ankiety. Spróbuj ponownie.
              </p>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: "900px",
      }}
    >
      <div
        className="sticky top-0 bg-white z-10 p-5"
        style={{
          boxShadow: "0 0px 4px rgba(0,0,0,0.4)",
        }}
      >
        <b>
          Twoje zadanie: Oceń które z wyświetlanych zdjęć jest lepsze pod
          względem jakości.
        </b>
        <Progress
          percent={((current + 1) / comparisons.length) * 100}
          status="active"
          showInfo={false}
        />
      </div>

      <Images
        imageA={comparisons[current].imageA}
        imageB={comparisons[current].imageB}
        isImageALoaded={isImageALoaded}
        isImageBLoaded={isImageBLoaded}
        setIsImageALoaded={() => setIsImageALoaded(true)}
        setIsImageBLoaded={() => setIsImageBLoaded(true)}
        onClick={onFeedback}
      />

      <FeedbackButtons onClick={onFeedback} />
    </div>
  );
};
