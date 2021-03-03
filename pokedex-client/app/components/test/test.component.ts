import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  findMissingNumber(inputs: number[] = []): number[] {
    const maxNumber = Math.max(...inputs);
    const results = [];
    for (let i = 0; i < maxNumber; i++) {
      const positiveInt = i + 1;
      if (!inputs.includes(positiveInt)) {
        results.push(positiveInt);
      }
    }
    return results;
  }

}
