type BrandLogoProps = {
  className?: string;
  textClassName?: string;
  asBlock?: boolean;
};

export default function BrandLogo({
  className = "",
  textClassName = "text-lg font-bold tracking-tight sm:text-xl",
  asBlock = false,
}: BrandLogoProps) {
  return (
    <span
      className={`${asBlock ? "inline-flex flex-col" : "inline-flex"} ${className}`.trim()}
    >
      <span className={textClassName}>
        <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
          Philosopher
        </span>{" "}
        <span className="text-white">Ai</span>
      </span>
    </span>
  );
}
