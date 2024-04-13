export class ItemDetail {
  id: string = '';
  name: string = '';
  company: string = '';
  productVariants: { variant: string, quantity: number, price: number, discount: number }[] = [];
  image: string = '';
  content: string = '';
  features: string[] = [];
  usage: string = '';
  crops: string = '';
  timeOfApplication: string = '';
  dosage: string = '';
  selected: boolean=false;
}

