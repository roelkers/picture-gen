export class SVG {
   
  public src = ''

  constructor(width: number, height: number) {
    this.concat(
      `<svg version="1.1"
         width="${width}" height="${height}"
         xmlns="http://www.w3.org/2000/svg"
       >\n`
    )
  }

  private concat(s: string) {
    this.src = this.src.concat(s)
  }

  circle(cx: number, cy: number, radius: number, fill?: string) {
    this.concat(
      `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fill}" />\n`
    ) 
    return this
  }

  rect(width: number, height: number, fill?: string) {
    this.concat(
      `<rect width="${width}" height="${height}" fill="${fill}" />\n`
    ) 
    return this
  }

  line(x1: number, y1: number, x2: number, y2: number, fill: string, width = 1) {
    this.concat(
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${fill}" stroke-width=${width} />\n`
    ) 
    return this
  }

  polygon(points: number[], fill: string) {
    this.concat(
      `<polygon points="${points.map(p => String(p)).reduce((acc, n) => acc.concat(`${acc},${n}`))}" fill="${fill}"/>\n`
    ) 
    return this

  }

  text(x:number, y: number, characters: string) {
    this.concat(
      `<text x="${x}" y="${y}" >${characters}</text>\n`
    ) 
    return this
  }
  
  end() {
    this.concat(
      `</svg>\n`
    )
    return this
  }
}
