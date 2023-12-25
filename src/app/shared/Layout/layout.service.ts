import { Injectable } from '@angular/core';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public language = "en"
  public config = {
    langu: "en",
    settings: {
      layout: "Dubai",
      layout_type: "ltr",
      layout_version: "light-only",
      sidebar_type: "default-sidebar",
    },
    color: {
      primary_color: "#B78F4F",
      secondary_color: "#00263E",
    },
  };

  constructor() {
    if (typeof localStorage !== 'undefined') {
    let lan = localStorage.getItem('language');
    if (this.config.settings.layout_type == "rtl" || lan == "ar") {
      this.config.langu = lan??"ar"
      this.config.settings.layout_type = 'rtl'
      this.handleClick(true)
    } else
      this.handleClick(false)


  }
  }

  // async fun(): Promise<boolean> {
  //   return true;
  // }

  async handleClick(lan:boolean) {
    // const isPromise = await this.fun();
    if (typeof document !== "undefined")
    if (lan) {  // arabic

      if (typeof document.body.classList !== 'undefined'  ) {
        // access the classList property
        document.body.classList.remove('ltr')
        document.body.classList.add('rtl')
      } else {
        console.error('classList is not defined');
      }
    } else {
      if (typeof document.body.classList !== 'undefined'  ) {
        // access the classList property
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
      } else {
        console.error('classList is not defined');
      }
    }

    if (typeof document !== "undefined"){
    document
      .getElementsByTagName("html")[0].setAttribute("lang", this.config.langu);
    document.getElementsByTagName("html")[0]
      .setAttribute("dir", this.config.settings.layout_type);

    document.documentElement.style.setProperty(
      "--theme-deafult",
      this.config.color.primary_color
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      this.config.color.secondary_color
    );
  }}


  reloadPage() {
    window.location.reload();
  }
}
