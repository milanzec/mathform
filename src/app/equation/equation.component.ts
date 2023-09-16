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
      delay(200)
    ).subscribe(() => {
      this.mathForm.controls.a.setValue(this.randomNumber())
      this.mathForm.controls.b.setValue(this.randomNumber())
      this.mathForm.controls.answer.setValue('')
    }))

  }


}
