import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MainServiceService } from 'src/app/shared/service/api/swapi.service';

@Component({
  selector: 'app-people-one',
  templateUrl: './people-one.component.html',
  styleUrls: ['./people-one.component.css'],
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLink,NgIf],
})
export class PeopleOneComponent implements OnInit {
  id: string = '';
  One: any;
  loading = false;
  constructor(
    private active: ActivatedRoute,
    private service: MainServiceService
  ) {}
  ngOnInit(): void {
    this.getOnePeople();
  }
  getOnePeople() {
    this.active.paramMap.subscribe((ele: any) => {
      this.id = ele.params.id;
      console.log(this.id);
    });
    this.loading = true;
    this.service.OnePeople(this.id).subscribe((ele: any) => {
      this.One = ele.results[0];
      console.log(ele);
      console.log(this.One);
      this.loading = false;
    });
  }
}
