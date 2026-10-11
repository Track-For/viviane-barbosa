import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/cn";

export function MediaPlaceholder({
  label,
  alt,
  className,
}: {
  label: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("media-placeholder", className)} role="img" aria-label={alt}>
      <div className="media-placeholder__mark" aria-hidden="true">
        <ImageIcon size={20} strokeWidth={1.4} />
      </div>
      <span>{label}</span>
      <small>Substituir pelo arquivo aprovado</small>
    </div>
  );
}
