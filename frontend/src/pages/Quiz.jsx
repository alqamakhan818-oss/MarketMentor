import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { syncQuizResult } from "@/services/api";
import { quizQuestions } from "@/data/quizQuestions";

const storageKey = "marketmentor.quizResult";

function getFeedback(percentage) {
  if (percentage >= 80) {
    return {
      title: "Great job!",
      detail: "You have a good understanding of digital marketing basics.",
      tone: "bg-[#EAF8EE] text-[#248A3D]",
    };
  }

  if (percentage >= 60) {
    return {
      title: "Good effort!",
      detail: "You understand many key ideas. Review the missed answers and try again.",
      tone: "bg-[#FFF3E3] text-[#B75E00]",
    };
  }

  return {
    title: "Keep learning!",
    detail: "Review the lessons, then try the quiz again when you feel ready.",
    tone: "bg-[#EAF3FF] text-[#0064D8]",
  };
}

export default function DigitalMarketingQuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [previousPercentage, setPreviousPercentage] = useState(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
        if (
          saved &&
          typeof saved.percentage === "number" &&
          saved.totalQuestions === quizQuestions.length
        ) {
          setPreviousPercentage(saved.percentage);
        }
      } catch {
        // Keep the empty previous-result state when browser data is invalid.
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const question = quizQuestions[currentIndex];
  const selectedAnswer = answers[question.id] ?? "";
  const answeredCount = Object.keys(answers).length;
  const questionProgress = Math.round(
    ((currentIndex + 1) / quizQuestions.length) * 100,
  );

  const finishQuiz = () => {
    const score = quizQuestions.reduce(
      (total, item) => total + (answers[item.id] === item.correctAnswer ? 1 : 0),
      0,
    );
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const nextResult = {
      score,
      totalQuestions: quizQuestions.length,
      percentage,
      correctAnswers: score,
      incorrectAnswers: quizQuestions.length - score,
      answers,
      completedAt: new Date().toISOString(),
    };

    setResult(nextResult);
    setPreviousPercentage(percentage);
    localStorage.setItem(storageKey, JSON.stringify(nextResult));
    syncQuizResult({
      score,
      totalQuestions: quizQuestions.length,
      percentage,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    const feedback = getFeedback(result.percentage);

    return (
      <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
        <SiteHeader active="quiz" />

        <section className="mx-auto max-w-[980px] px-5 py-12 sm:px-8 sm:py-16">
          <div
            aria-live="polite"
            className="overflow-hidden rounded-[32px] border border-[#E5E5EA] bg-white shadow-[0_20px_52px_rgba(29,29,31,0.09)]"
          >
            <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_260px] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#F2ECFF] px-3.5 py-2 text-sm font-semibold text-[#7B4FC6]">
                  <Trophy aria-hidden="true" className="size-4" />
                  Quiz Complete
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  Your Score
                </h1>
                <p className="mt-4 text-lg text-[#6E6E73]">
                  You answered {result.correctAnswers} of {result.totalQuestions} questions correctly.
                </p>
                <div className={`mt-6 rounded-[22px] p-5 ${feedback.tone}`}>
                  <p className="text-xl font-semibold">{feedback.title}</p>
                  <p className="mt-1 leading-6 opacity-80">{feedback.detail}</p>
                </div>
              </div>

              <div className="flex aspect-square flex-col items-center justify-center rounded-full bg-[#F5F5F7] text-center shadow-[inset_5px_5px_14px_rgba(29,29,31,0.08),inset_-5px_-5px_14px_rgba(255,255,255,0.9)]">
                <strong className="text-5xl font-semibold tracking-[-0.06em] text-[#007AFF]">
                  {result.percentage}%
                </strong>
                <span className="mt-2 text-base font-semibold text-[#3A3A3C]">
                  {result.score} / {result.totalQuestions}
                </span>
              </div>
            </div>

            <div className="grid border-t border-[#ECECEF] sm:grid-cols-2">
              <div className="flex items-center gap-3 p-5 sm:p-6">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[#EAF8EE] text-[#248A3D]">
                  <CheckCircle2 aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#6E6E73]">Correct answers</p>
                  <p className="text-xl font-semibold">{result.correctAnswers}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-[#ECECEF] p-5 sm:border-l sm:border-t-0 sm:p-6">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[#FFF0F0] text-[#D92D20]">
                  <XCircle aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-[#6E6E73]">Incorrect answers</p>
                  <p className="text-xl font-semibold">{result.incorrectAnswers}</p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-9" aria-labelledby="answer-review-title">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#007AFF]">
                  Answer Review
                </p>
                <h2
                  id="answer-review-title"
                  className="mt-2 text-3xl font-semibold tracking-[-0.04em]"
                >
                  Check every answer
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={restartQuiz}
                  className="h-11 rounded-full border-[#D1D1D6] bg-white px-5"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Try Again
                </Button>
                <Button asChild className="h-11 rounded-full bg-[#007AFF] px-5 text-white hover:bg-[#006FE6]">
                  <Link to="/progress">
                    View Progress
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {quizQuestions.map((item, index) => {
                const chosenAnswer = result.answers[item.id];
                const isCorrect = chosenAnswer === item.correctAnswer;
                const chosenLabel =
                  item.options.find((option) => option.id === chosenAnswer)
                    ?.label ?? "No answer";
                const correctLabel =
                  item.options.find(
                    (option) => option.id === item.correctAnswer,
                  )?.label ?? "";

                return (
                  <article
                    key={item.id}
                    className={`rounded-[24px] border bg-white p-5 sm:p-6 ${
                      isCorrect ? "border-[#CFEED7]" : "border-[#FFD3D0]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl ${
                          isCorrect
                            ? "bg-[#EAF8EE] text-[#248A3D]"
                            : "bg-[#FFF0F0] text-[#D92D20]"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 aria-hidden="true" className="size-4" />
                        ) : (
                          <XCircle aria-hidden="true" className="size-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#8E8E93]">
                          Question {index + 1} · {item.topic}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">
                          {item.question}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-[#6E6E73]">
                          Your answer:{" "}
                          <strong className="font-semibold text-[#3A3A3C]">
                            {chosenLabel}
                          </strong>
                        </p>
                        {!isCorrect && (
                          <div className="mt-3 rounded-2xl bg-[#F8F8FA] p-4 text-sm leading-6 text-[#6E6E73]">
                            <p>
                              Correct answer:{" "}
                              <strong className="font-semibold text-[#248A3D]">
                                {correctLabel}
                              </strong>
                            </p>
                            <p className="mt-1">{item.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>

        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <SiteHeader active="quiz" />

      <section className="mx-auto max-w-[980px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F2ECFF] px-3.5 py-2 text-sm font-semibold text-[#7B4FC6]">
              <BrainCircuit aria-hidden="true" className="size-4" />
              12 Beginner-Friendly Questions
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
              Test Your Digital Marketing Knowledge
            </h1>
          </div>
          {previousPercentage !== null && (
            <div className="rounded-2xl border border-[#E5E5EA] bg-white px-5 py-4 text-sm text-[#6E6E73] shadow-[0_8px_22px_rgba(29,29,31,0.06)]">
              Latest saved score
              <strong className="ml-2 text-lg font-semibold text-[#007AFF]">
                {previousPercentage}%
              </strong>
            </div>
          )}
        </div>

        <div className="mt-9 rounded-[30px] border border-[#E5E5EA] bg-white p-6 shadow-[0_18px_46px_rgba(29,29,31,0.08)] sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#007AFF]">
                Question {currentIndex + 1} of {quizQuestions.length}
              </p>
              <p className="mt-1 text-sm text-[#8E8E93]">{question.topic}</p>
            </div>
            <span className="rounded-full bg-[#F1F1F4] px-3 py-1.5 text-sm font-semibold text-[#6E6E73]">
              {answeredCount} answered
            </span>
          </div>

          <Progress
            value={questionProgress}
            aria-label={`Question ${currentIndex + 1} of ${quizQuestions.length}`}
            className="mt-5 h-2.5 bg-[#E5E5EA] [&_[data-slot=progress-indicator]]:bg-[#007AFF]"
          />

          <h2 className="mt-8 text-2xl font-semibold leading-9 tracking-[-0.03em] sm:text-3xl">
            {question.question}
          </h2>

          <RadioGroup
            value={selectedAnswer}
            onValueChange={(value) =>
              setAnswers((current) => ({
                ...current,
                [question.id]: value,
              }))
            }
            aria-label={question.question}
            className="mt-7 gap-3"
          >
            {question.options.map((option, index) => {
              const selected = selectedAnswer === option.id;
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-[20px] border p-4 transition-all focus-within:ring-4 focus-within:ring-[#007AFF]/15 sm:p-5 ${
                    selected
                      ? "border-[#9FCBFF] bg-[#F0F7FF] shadow-[0_6px_18px_rgba(0,122,255,0.08)]"
                      : "border-[#E5E5EA] bg-[#FAFAFC] hover:border-[#C7C7CC]"
                  }`}
                >
                  <RadioGroupItem
                    value={option.id}
                    aria-label={option.label}
                    className="size-5 border-[#AEAEB2] text-[#007AFF] data-[state=checked]:border-[#007AFF]"
                  />
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-semibold text-[#6E6E73] shadow-[0_2px_7px_rgba(29,29,31,0.06)]">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-base font-medium leading-6">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </RadioGroup>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#ECECEF] pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((index) => index - 1)}
              className="h-11 rounded-full border-[#D1D1D6] bg-white px-5"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Previous
            </Button>

            {currentIndex < quizQuestions.length - 1 ? (
              <Button
                type="button"
                disabled={!selectedAnswer}
                onClick={() => setCurrentIndex((index) => index + 1)}
                className="h-11 rounded-full bg-[#007AFF] px-5 text-white hover:bg-[#006FE6]"
              >
                Next
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!selectedAnswer}
                onClick={finishQuiz}
                className="h-11 rounded-full bg-[#34C759] px-6 text-white hover:bg-[#2FB350]"
              >
                Submit Quiz
                <CheckCircle2 aria-hidden="true" className="size-4" />
              </Button>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-sm leading-6 text-[#8E8E93]">
          Choose one answer for each question. You can go back before submitting.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
