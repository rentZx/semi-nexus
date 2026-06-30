import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-cyan-300/25 bg-slate-950/58 px-4 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur-xl">
      <Search className="h-4 w-4" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
      />
    </label>
  );
}
