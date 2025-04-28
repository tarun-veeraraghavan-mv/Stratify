import Container from "@/components/ui/Container";
import ContactPageClient from "./ContactPageClient";
import { getContacts } from "@/lib/actions/contact";
import { ContactPayload } from "@/lib/types/model";

export default async function page() {
  const contacts: ContactPayload = await getContacts();

  console.log(contacts);

  return (
    <Container>
      <ContactPageClient contacts={contacts} />
    </Container>
  );
}
