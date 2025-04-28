import FormContainer from "@/components/ui/FormContainer";
import UpdateClientPage from "./UpdateClientPage";
import { getCourseById } from "@/lib/actions/course";
import { CoursePayload } from "@/lib/types/model";

type pageParams = { id: string };

export default async function page({ params }: { params: pageParams }) {
  console.log(params);

  const courses: CoursePayload = await getCourseById(Number(params.id));

  console.log(courses);

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-7">Update course</h1>
      <UpdateClientPage courses={courses} />
    </FormContainer>
  );
}
