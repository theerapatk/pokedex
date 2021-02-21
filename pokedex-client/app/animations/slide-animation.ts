import { animate, group, query, style, transition, trigger } from "@angular/animations";

const left = [
  query(':enter, :leave', style({ position: 'relative' }), { optional: true }),
  group([
    query(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('.3s ease-out', style({ transform: 'translateX(0%)' }))
    ], { optional: true }),
    query(':leave', [
      style({ transform: 'translateX(0%)', display: 'none' }),
      animate('.3s ease-out', style({ transform: 'translateX(100%)' }))
    ], { optional: true }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'relative' }), { optional: true }),
  group([
    query(':enter', [
      style({ transform: 'translateX(100%)' }),
      animate('.3s ease-out', style({ transform: 'translateX(0%)' }))
    ], { optional: true }),
    query(':leave', [
      style({ transform: 'translateX(0%)', display: 'none' }),
      animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))
    ], { optional: true }),
  ]),
];

export const SlideAnimation = [
  trigger('slideInOut', [
    transition(':increment', right),
    transition(':decrement', left),
  ])
];
