import { useRouter } from "next/router";
export default function Redirect({ path }) {
  const router = useRouter();
  router.push(path || "/");
  return <div>redirecting</div>;
}
