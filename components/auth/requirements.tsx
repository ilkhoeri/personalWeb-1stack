import { Progress } from "@/components/ui/progress";
import { twMerge } from "tailwind-merge";

export const requirements = [
  { re: /[0-9]/, label: "Kombinasi nomor" },
  { re: /[a-z]/, label: "Kombinasi huruf kecil" },
  { re: /[A-Z]/, label: "Kombinasi huruf kapital" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Kombinasi simbol khusus" },
];

export const getStrength = (password: string) => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+?<>{}\/]).{8,}$/;
export const passwordMessage =
  "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.";

export const RequirementMeets = ({ meets, label }: { meets: boolean; label: string }) => (
  <span
    className={`w-full flex items-center flex-row flex-nowrap mt-2 text-[14px] ${
      meets ? "text-[#0d9488]" : "text-[#dc2626]"
    }`}
  >
    {meets ? (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l5 5l10 -10" />
      </svg>
    ) : (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    )}
    <p className="ml-[10px]">{label}</p>
  </span>
);

export const strength = (value: string) => getStrength(value);

export const checks = (value: string) =>
  requirements.map((requirement, index) => (
    <RequirementMeets key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));

export const bars = (value: string) =>
  Array(5)
    .fill(0)
    .map((_, index) => (
      <Progress
        key={index}
        aria-label="requirement-password-progress"
        value={value.length > 0 && index === 0 ? 100 : strength(value) >= ((index + 1) / 5) * 100 ? 100 : 0}
        className={`w-full h-[10px] [outline:1px_solid] ${
          strength(value) > 90
            ? "text-[#0d9488] [&>div]:bg-[#0d9488]"
            : strength(value) > 50
              ? "text-[#ca8a04] [&>div]:bg-[#ca8a04]"
              : "text-[#dc2626] [&>div]:bg-[#dc2626]"
        }`}
      />
    ));

export const RequirementPsw = (value: string) => (
  <div
    className={twMerge(
      "w-full py-3 px-5 z-[100] absolute bottom-[115%] bg-background rounded-lg outline-1 outline-dashed outline-[var(--ol)]",
      strength(value) > 90 ? "[--ol:#0d9488]" : strength(value) > 50 ? "[--ol:#ca8a04]" : "[--ol:#dc2626]",
    )}
  >
    <div className="w-full grid grid-cols-5 gap-2">{bars(value)}</div>
    <RequirementMeets label="Mencakup 8 karakter" meets={value.length > 7} />
    {checks(value)}
  </div>
);
