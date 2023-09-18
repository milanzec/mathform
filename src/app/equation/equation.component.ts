import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { CustomValidators } from '../custom-validators';
import { delay, filter } from 'rxjs/operators';


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
    const startTime = new Date()
    let problemSolved = 0

    console.log(this.mathForm.statusChanges.pipe(
      filter(value => value === 'VALID'),
      delay(200)
    ).subscribe(() => {
      problemSolved++;
this.secondsPerCount = (new Date().getTime() - startTime.getTime())/problemSolved/1000

      this.mathForm.controls.a.setValue(this.randomNumber())
      this.mathForm.controls.b.setValue(this.randomNumber())
      this.mathForm.controls.answer.setValue('')
    }))

  }


}
