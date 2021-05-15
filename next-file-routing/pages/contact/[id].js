import { useRouter } from "next/router";
export default function ContactId() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <p>At ID number: {id}</p>
    </div>
  );
}
