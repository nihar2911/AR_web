import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-publish-new',
  templateUrl: './publish-new.component.html',
  styleUrls: ['./publish-new.component.css']
})
export class PublishNewComponent implements OnInit {
  urlTarget: any;

  constructor() { }

  ngOnInit() {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      // var fileName = $(this).val().split("\\").pop();
      // console.log('filename', fileName);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        console.log("urlTarget ", event.target["result"]);
        this.urlTarget = event.target["result"];
      }
    }
  }

  deleteImg(){
    this.urlTarget = null;
  }

}
