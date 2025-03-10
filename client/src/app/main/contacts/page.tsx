import ContactClientComp from "@/components/contacts/ContactClientComp";
import { getCurrentUserId } from "@/lib/actions/auth.action";
import { getContactsForUser } from "@/lib/actions/contact.action";
import { viewFiles } from "@/lib/actions/fileUpload.action";
import { Contact } from "@/lib/types/contact.types";
import { redirect } from "next/navigation";

export default async function Page() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/main/courses");
  }

  const contacts: Contact[] = await getContactsForUser(parseInt(id));
  const files = await viewFiles(parseInt(id));

  return <ContactClientComp contacts={contacts} files={files} userId={id} />;
}
