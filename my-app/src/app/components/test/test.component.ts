import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  findMissingNumber(inputs: number[] = []): number[] {
    let maxNumber = Math.max(...inputs);
    let results = [];
    for (let i = 0; i < maxNumber; i++) {
      let positiveInt = i + 1;
      if (!inputs.includes(positiveInt)) {
        results.push(positiveInt);
      }
    }
    return results;
  }

}
