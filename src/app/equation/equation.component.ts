import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { CustomValidators } from '../custom-validators';
import { delay, filter, scan } from 'rxjs/operators';


@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent {
  secondsPerCount = 0
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [
    CustomValidators.addition('answer', 'a', 'b')
  ])

  randomNumber() {
    return Math.floor(Math.random() * 10)
  }

  constructor() {

  }

  ngOnInit() {


    console.log(this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(200),
      scan((acc, value) => {
        return {
          problemSolved: acc.problemSolved + 1,
          startTime: acc.startTime
        }

      }, { problemSolved: 0, startTime: new Date() })
    ).subscribe(({ problemSolved, startTime }) => {

      this.secondsPerCount = (new Date().getTime() - startTime.getTime()) / problemSolved / 1000

      this.mathForm.controls.a.setValue(this.randomNumber())
      this.mathForm.controls.b.setValue(this.randomNumber())
      this.mathForm.controls.answer.setValue('')
    }))

  }


}
