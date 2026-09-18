export class SpatialHash {
  cellSize = 64;
  cols = 1;
  rows = 1;
  cells: number[][] = [[]];

  configure(width: number, height: number, cellSize: number) {
    this.cellSize = Math.max(16, cellSize);
    this.cols = Math.max(1, Math.ceil(width / this.cellSize));
    this.rows = Math.max(1, Math.ceil(height / this.cellSize));
    const n = this.cols * this.rows;
    if (this.cells.length !== n) {
      this.cells = Array.from({ length: n }, () => []);
    } else {
      for (let i = 0; i < n; i++) this.cells[i]!.length = 0;
    }
  }

  clear() {
    for (let i = 0; i < this.cells.length; i++) this.cells[i]!.length = 0;
  }

  insert(index: number, x: number, y: number) {
    const c = Math.min(this.cols - 1, Math.max(0, Math.floor(x / this.cellSize)));
    const r = Math.min(this.rows - 1, Math.max(0, Math.floor(y / this.cellSize)));
    this.cells[r * this.cols + c]!.push(index);
  }

  query(x: number, y: number, radius: number, dest: number[]) {
    dest.length = 0;
    const cs = this.cellSize;
    const minC = Math.floor((x - radius) / cs);
    const maxC = Math.floor((x + radius) / cs);
    const minR = Math.floor((y - radius) / cs);
    const maxR = Math.floor((y + radius) / cs);
    const { cols, rows } = this;
    for (let r = minR; r <= maxR; r++) {
      const rr = ((r % rows) + rows) % rows;
      for (let c = minC; c <= maxC; c++) {
        const cc = ((c % cols) + cols) % cols;
        const bucket = this.cells[rr * cols + cc]!;
        for (let i = 0; i < bucket.length; i++) dest.push(bucket[i]!);
      }
    }
  }
}

export function wrapDelta(d: number, size: number): number {
  if (size <= 0) return d;
  const half = size * 0.5;
  if (d > half) return d - size;
  if (d < -half) return d + size;
  return d;
}

export function wrapCoord(v: number, size: number): number {
  if (size <= 0) return 0;
  v %= size;
  if (v < 0) v += size;
  return v;
}
