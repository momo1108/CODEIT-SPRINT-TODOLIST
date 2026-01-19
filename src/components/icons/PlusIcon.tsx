export function PlusIcon({
  width = 16,
  height = 16,
  isEmpty = true,
  ...props
}: React.SVGProps<SVGSVGElement> & { className?: string; isEmpty?: boolean }) {
  return (
    <>
      {isEmpty ? (
        <svg
          width={width}
          height={height}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="white"
          {...props}
        >
          <path d="M2 8L14 8" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 14L8 2" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg
          width={width}
          height={height}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#0F172A"
          {...props}
        >
          <path d="M3 12L21 12" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 21L12 3" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
    </>
  );
}
