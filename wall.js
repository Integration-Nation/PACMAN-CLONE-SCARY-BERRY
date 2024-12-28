export const wallList = [
  // Outer walls (border)
  ...Array.from({ length: 21 }, (_, i) => ({ row: 0, col: i })),
  ...Array.from({ length: 21 }, (_, i) => ({ row: 20, col: i })),
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 1, col: 0 })),
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 1, col: 20 })),

  // Vertical walls creating symmetrical lanes
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 1, col: 5 })),
  ...Array.from({ length: 19 }, (_, i) =>
    i + 1 === 12 && 10 === 10 ? null : { row: i + 1, col: 10 }
  ).filter(Boolean),
  ...Array.from({ length: 19 }, (_, i) => ({ row: i + 1, col: 15 })),

  // Horizontal walls creating symmetrical lanes
  ...Array.from({ length: 21 }, (_, i) => ({ row: 5, col: i })),
  ...Array.from({ length: 21 }, (_, i) => ({ row: 10, col: i })),
  ...Array.from({ length: 21 }, (_, i) => ({ row: 15, col: i })),

  // Central block for ghost house
  { row: 9, col: 9 },
  { row: 9, col: 10 },
  { row: 9, col: 11 },
  { row: 10, col: 9 },
  { row: 10, col: 11 },
  { row: 11, col: 9 },
  { row: 11, col: 10 },
  { row: 11, col: 11 },

  // Additional walls for complexity
  ...Array.from({ length: 5 }, (_, i) => ({ row: 7, col: i + 6 })),
  ...Array.from({ length: 5 }, (_, i) => ({ row: 13, col: i + 6 })),
  ...Array.from({ length: 5 }, (_, i) => ({ row: 7, col: i + 11 })),
  ...Array.from({ length: 5 }, (_, i) => ({ row: 13, col: i + 11 })),
];
