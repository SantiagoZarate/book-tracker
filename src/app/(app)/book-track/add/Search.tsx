"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const path = usePathname();

  const handleOnChange = useDebouncedCallback((value: string) => {
    const url = new URLSearchParams(searchParams);
    if (value) {
      url.set("search", value.trim());
    } else {
      url.delete("search");
    }
    replace(`${path}?${url.toString()}`);
  }, 1000);

  return (
    <section>
      <input
        className="bg-card border rounded-xl"
        type="text"
        onChange={(e) => handleOnChange(e.target.value)}
        defaultValue={searchParams.get("search")?.toString() ?? ""}
      />
    </section>
  );
}
