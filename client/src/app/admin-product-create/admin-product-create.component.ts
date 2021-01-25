import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
} 

@Component({
  selector: 'app-admin-product-create',
  templateUrl: './admin-product-create.component.html',
  styleUrls: ['./admin-product-create.component.css']
})
export class AdminProductCreateComponent implements OnInit {

  pageTitle = 'New Menu | TosEcommerce';
  menuForm: FormGroup

  selectedImage: ImageSnippet;
  imagePreview: string;
  submitted = false
  errorMsg: string;
  successMsg: string;
  fileData: File;

  constructor(private title:Title, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.title.setTitle(this.pageTitle);

    //Instantiat form
    this.menuForm = this.fb.group({
      supplier_name:[null],
      supplier_category:[null],
      supplier_description:[null],
      supplier_image:[null]
    });
  }

  //get form controls
  get f() {
    return this.menuForm.controls;
  }


  processImage(imageID: any) {
    const file: File = imageID.files[0];
    this.fileData = file
    var fileExtension = '.' + file.name.split('.').pop();
   
    console.log("Date now", Date.now())
    console.log("this passport image extension", fileExtension)
    console.log("member" + '-' + Date.now() + '.' + fileExtension)
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedImage = new ImageSnippet(event.target.result, file);
    })
    reader.readAsDataURL(file);
    
  }

  

  submit(){}

}
