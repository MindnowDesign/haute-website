"use client"

export function VerticalLines() {
  // 8 linee verticali equidistanti: dividiamo lo spazio in 9 parti uguali
  // Le linee saranno posizionate a 1/9, 2/9, 3/9, 4/9, 5/9, 6/9, 7/9, 8/9
  const lineCount = 8
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1)

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    >
      {lines.map((position) => (
        <div
          key={position}
          className="absolute top-0 bottom-0 w-[1px]"
          style={{
            left: `${(position * 100) / 9}%`,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />
      ))}
    </div>
  )
}

