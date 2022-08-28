import { Test, TestingModule } from '@nestjs/testing';
import { SvgGeneratorService } from './svg-generator.service';
import { SVG } from './svg.class'

describe('SvgGeneratorService', () => {
  let service: SvgGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SvgGeneratorService],
    }).compile();

    service = module.get<SvgGeneratorService>(SvgGeneratorService);
  });

  it('SVG should have correct format', () => {
    const svg = new SVG(100, 200)
    .line(100, 200 ,50, 70, "green")
    .circle(50, 70, 75, 'red')
    .end()
    const expected = 
    `<svg version="1.1"
         width="100" height="200"
         xmlns="http://www.w3.org/2000/svg"
       />
<line x1="100" y1="200" x2="50" y2="70" fill="green" />
<circle cx="50" cy="70" r="75" fill="red" />
</svg>
`
    expect(svg.src).toEqual(expected);
  })
});
