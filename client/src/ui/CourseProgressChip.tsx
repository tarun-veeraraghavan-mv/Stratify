interface CourseProgressChipProps {
  progress: string;
}

export default function CourseProgressChip({
  progress,
}: CourseProgressChipProps) {
  return <p className="p-1 rounded-lg bg-green-300">{progress}</p>;
}
