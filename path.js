export const pathList = [
  // Outer paths (border)
  ...Array.from({ length: 21 }, (_, i) => ({ row: 1, col: i + 1 })),
  ...Array.from({ length: 21 }, (_, i) => ({ row: 21, col: i + 1 })),
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 2, col: 1 })),
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 2, col: 21 })),

  // Vertical paths creating symmetrical lanes
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 2, col: 6 })),
  ...Array.from({ length: 19 }, (_, i) =>
    i + 2 === 13 && 11 === 11 ? null : { row: i + 2, col: 11 }
  ).filter(Boolean),
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 2, col: 16 })),

  // Horizontal paths creating symmetrical lanes
  ...Array.from({ length: 21 }, (_, i) => ({ row: 6, col: i + 1 })),
  ...Array.from({ length: 21 }, (_, i) => ({ row: 11, col: i + 1 })),
  ...Array.from({ length: 21 }, (_, i) => ({ row: 16, col: i + 1 })),

  // Central block for ghost house
  { row: 10, col: 10 },
  { row: 10, col: 11 },
  { row: 10, col: 12 },
  { row: 11, col: 10 },
  { row: 11, col: 12 },
  { row: 12, col: 10 },
  { row: 12, col: 11 },
  { row: 12, col: 12 },

  // Additional paths for complexity
  ...Array.from({ length: 5 }, (_, i) => ({ row: 8, col: i + 7 })),
  ...Array.from({ length: 5 }, (_, i) => ({ row: 14, col: i + 7 })),
  ...Array.from({ length: 5 }, (_, i) => ({ row: 8, col: i + 12 })),
  ...Array.from({ length: 5 }, (_, i) => ({ row: 14, col: i + 12 })),
];
