import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent<T extends { [key: string]: any }> {
  @Input() data: T | null = null;
  @Input() cardConfig: {
    fields: { [key: string]: string };
    titleField: string;
    subtitleField: string;
    imageField?: string;
    button?: { label: string; link: string[] };
    formatTitle?: (data: T) => string;
  } = { fields: {}, titleField: '', subtitleField: '' };

  objectKeys = Object.keys;


}