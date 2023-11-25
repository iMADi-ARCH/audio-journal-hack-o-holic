import { usePathname } from "next/navigation";

export default function useHideOnPaths(paths: string[]) {
  const path = usePathname().split("/").at(-1);
  let visible = true;

  if (path && paths.includes(path)) {
    visible = false;
  }
  return { visible };
}
