import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  id: any;

  constructor(private route:ActivatedRoute, private customerService: CustomerService) { }

  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(custId => {
      this.id = custId;

      this.customerService.accActivation(this.id)
      .subscribe(data=>{
        console.log("This message from sever")
      })
  })

}

}
