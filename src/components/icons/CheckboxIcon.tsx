export function CheckboxIcon({
  className = "w-4 h-4",
  isChecked = true,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  className?: string;
  isChecked?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {isChecked ? (
        <>
          <circle cx="16" cy="16" r="16" fill="#7C3AED" />
          <path
            d="M8 16.2857L13.8182 22L24 12"
            stroke="#FEFCE8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="#FEFCE8"
          stroke="#0F172A"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
