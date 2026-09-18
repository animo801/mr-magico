import { redirect } from "next/navigation";
import { quizQuestions } from "@/lib/quiz-config";
import QuestionScreen from "@/components/quiz/QuestionScreen";

export default async function QuizStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (!Number.isInteger(stepNumber) || stepNumber < 1) {
    redirect("/quiz/1");
  }
  if (stepNumber > quizQuestions.length) {
    redirect("/quiz/contact");
  }

  const question = quizQuestions[stepNumber - 1];
  const isLastQuestion = stepNumber === quizQuestions.length;

  return (
    <QuestionScreen
      key={question.id}
      question={question}
      stepNumber={stepNumber}
      totalSteps={quizQuestions.length}
      nextHref={isLastQuestion ? "/quiz/contact" : `/quiz/${stepNumber + 1}`}
      prevHref={stepNumber > 1 ? `/quiz/${stepNumber - 1}` : "/"}
    />
  );
}
