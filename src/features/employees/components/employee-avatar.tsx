import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AVATAR_TONES = [
  "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300",
  "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  "bg-amber-500/15 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  "bg-rose-500/15 text-rose-700 dark:bg-rose-400/15 dark:text-rose-300",
  "bg-violet-500/15 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
  "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function getTone(name: string) {
  let hash = 0;

  for (let index = 0; index < name.length; index += 1) {
    hash =
      (hash + name.charCodeAt(index) * (index + 1)) %
      AVATAR_TONES.length;
  }

  return AVATAR_TONES[hash];
}

interface EmployeeAvatarProps {
  name: string;
  initials?: string;
  className?: string;
}

export function EmployeeAvatar({
  name,
  initials,
  className,
}: EmployeeAvatarProps) {
  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarFallback
        className={cn("text-xs font-semibold", getTone(name))}
      >
        {initials ?? getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}