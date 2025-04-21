import { HighlightDirective } from './highlight.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('div'));
    const mockRenderer: Renderer2 = jasmine.createSpyObj('Renderer2', ['setStyle']);
    const directive = new HighlightDirective(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
