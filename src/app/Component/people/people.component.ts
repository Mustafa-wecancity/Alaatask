import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MainServiceService } from 'src/app/shared/service/api/swapi.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLink,NgIf,NgFor ,FormsModule, ReactiveFormsModule, TranslateModule],
})
export class PeopleComponent implements OnInit {
  PeopleList!: any;
  searchQuery!: string;
  index = 1;
  errorHandle = false;
  loading = false;
  constructor(private service: MainServiceService) {}
  ngOnInit(): void {
    this.GetPeople();
  }
  GetPeople() {
    this.loading = true;
    this.service.GetPeople().subscribe((ele: any) => {
      this.loading = false;

      this.PeopleList = ele;
      console.log(ele);
    });
  }

  Next() {
    this.index = this.index + 1;
    this.loading = true;

    this.service.GetPeople(this.index).subscribe((ele: any) => {
      this.loading = false;
      this.PeopleList = ele;
      console.log(ele);
    });
  }

  Previous() {
    this.index = this.index - 1;
    this.loading = true;

    this.service.GetPeople(this.index).subscribe((ele: any) => {
      this.PeopleList = ele;
      this.loading = false;

      console.log(ele);
    });
  }

  Search() {
    this.loading = true;
    if (this.searchQuery == '' || this.searchQuery == undefined) {
      this.GetPeople();
      this.loading = false;
    } else {
      // var search = this.PeopleList.results.filter(function (item: any) {
      //   return item.name.includes(event.target.value);
      // });
      this.service.OnePeople(this.searchQuery).subscribe((ele) => {
        this.PeopleList = ele;
        console.log(ele);
      });
      if (this.PeopleList.results?.length > 0) {
        this.loading = false;
      } else {
        this.errorHandle = false;
        this.loading = false;
      }
    }
  }


}
