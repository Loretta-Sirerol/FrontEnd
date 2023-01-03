import { Component } from '@angular/core';
import { Person } from 'src/app/model/person.model';
import { PersonService } from 'src/app/service/person.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  prs: Person = new Person("","","","");

  constructor(public prs_service: PersonService){}

  ngOnInit(): void
  {
    this.prs_service.getPerson().subscribe(data => (this.prs = data));
  }
  
}
