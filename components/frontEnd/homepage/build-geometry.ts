type Point = readonly [number, number];
type Member = {
  profile: readonly Point[];
  direction: Point;
  start: number;
  end: number;
};

// Coordinates are measured against the 1536 × 1024 concrete frame.
const members: Member[] = [
  { profile: [[486, 837], [570, 806], [613, 823], [1536, 833], [1536, 867], [486, 867]], direction: [1, 0], start: 1010, end: 1850 },
  { profile: [[560, 473], [613, 269], [613, 823], [560, 806]], direction: [0, -1], start: 1630, end: 3760 },
  { profile: [[613, 270], [665, 297], [665, 823], [613, 823]], direction: [0, -1], start: 1410, end: 3650 },
  { profile: [[1454, 297], [1504, 270], [1504, 830], [1454, 826]], direction: [0, -1], start: 1500, end: 3720 },
  { profile: [[560, 629], [661, 522], [1454, 522], [1454, 568], [661, 568], [560, 649]], direction: [1, 0], start: 2580, end: 3570 },
  { profile: [[560, 472], [613, 268], [1504, 268], [1504, 300], [611, 300], [560, 496]], direction: [1, 0], start: 3430, end: 4540 },
];

export function progress(time: number, start: number, end: number) {
  const value = Math.max(0, Math.min(1, (time - start) / (end - start)));
  return value * value * (3 - 2 * value);
}

function toPath(points: Point[], close: boolean) {
  return points.length
    ? `M${points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L")}${close ? "Z" : ""}`
    : "";
}

function growMember({ profile, direction }: Member, amount: number) {
  const project = ([x, y]: Point) => x * direction[0] + y * direction[1];
  const distances = profile.map(project);
  const start = Math.min(...distances);
  const limit = start + amount * (Math.max(...distances) - start);
  const polygon: Point[] = [];
  const edge: Point[] = [];

  profile.forEach((point, index) => {
    const next = profile[(index + 1) % profile.length];
    const from = distances[index] - limit;
    const to = project(next) - limit;
    if (from <= 0) polygon.push(point);
    if ((from <= 0) !== (to <= 0)) {
      const fraction = from / (from - to);
      const intersection: Point = [
        point[0] + (next[0] - point[0]) * fraction,
        point[1] + (next[1] - point[1]) * fraction,
      ];
      polygon.push(intersection);
      edge.push(intersection);
    }
  });

  return { surface: toPath(polygon, true), tip: toPath(edge, false) };
}

export function traceStructure(time: number) {
  let concrete = "";
  let brass = "";
  let tips = "";

  for (const member of members) {
    // The brass profile leads the concrete along the same axis and coordinates.
    const guide = progress(time, member.start, member.end);
    const fill = progress(time - 55, member.start, member.end);
    if (fill > 0) concrete += growMember(member, fill).surface;
    if (guide > 0 && time < member.end + 180) {
      const { surface, tip } = growMember(member, guide);
      brass += surface;
      tips += tip;
    }
  }

  return { concrete, brass, tips };
}
