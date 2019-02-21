import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
    { display: 'None', value: '' },
    { display: 'Light', value: 'light' },
    { display: 'Dark', value: 'dark' }
  ];

  swService: StarWarsService;
  router: Router;

  constructor(swService: StarWarsService, router: Router) {
    this.swService = swService;
    this.router = router;
   }

  ngOnInit() {
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    console.log(submittedForm);
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);
    this.router.navigate(['/characters']);
  }

}
