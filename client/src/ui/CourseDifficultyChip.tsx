import React from "react";

interface CourseDifficultyChipProps {
  difficulty: string;
}

export default function CourseDifficultyChip({
  difficulty,
}: CourseDifficultyChipProps) {
  return (
    <p
      className={`p-1 rounded-lg ${difficulty === "easy" ? "bg-green-400" : difficulty === "hard" ? "bg-red-400" : "bg-orange-300"}`}
    >
      {difficulty}
    </p>
  );
}
