export class Character {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  available?: number;
  order?: number;

  constructor(
    id: string,
    name: string,
    description: string,
    thumbnail: string,
    available?: number,
    order?: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.available = available;
    this.order = order;
  }
}
