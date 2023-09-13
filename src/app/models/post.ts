export interface Post {
  id: number;
  categories: Categories[],
  promotion: PromotionLevels,
  title: string;
  lede: string;
  imageUrl: string;
  imageUrlCredit: string;
  bodyHtml: string;
  authorId: number;
  publishedDate: string;
}

export enum Categories {
  NodeJs = 'Node.js',
  Angular = 'Angular',
  JavaScript = 'JavaScript',
  TypeScript = 'TypeScript',
  IBM_Cloud = 'IBM Cloud',
  IBM_Cloudant = 'IBM Cloudant',
  IBM_Domino = 'IBM Domino',
  HTML_CSS = 'HTML/CSS',
  MongoDB = 'MongoDB'
}

export enum PromotionLevels {
  Hero = 'hero',
  Feature = 'feature',
  Main = 'main',
  Side_Bar = 'side bar',
  None = 'none'
}
